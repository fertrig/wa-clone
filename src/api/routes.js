import {redisClient, redisKeys} from './redis-client';
import {UserValidator} from '../core/user-validator';
import {jwt} from './jwt-wrapper';
import {sockets} from './sockets';

function setup(app) {
	app.get('/', (req, res) => {
		res.send('Hello React Class, from Express.js.');
	});

	app.get('/redis-test', (req, res) => {
		redisClient.incr('inc-test', (err, result) => {
			if (err) {
				console.error(err);
				res.send('Error connecting to redis');
			}
			else {
				res.send(`New incremented value: ${result}`);
			}
		});
	});

	app.get('/json-test', (req, res, next) => {
		redisClient.incr('inc-json-test', (err, result) => {
			if (err) {
				next(err);
			}
			else {
				res.json({ incResult: result });
			}
		})
	});

	app.post('/user', (req, res, next) => {
        console.log('POST /user', req.body);

		const {handle, name} = req.body;

		const user = {
			handle,
			name
		};

		redisClient.lrange(redisKeys.users, 0, -1, (err, result) => {
			if (err) {
				next(err);
			}
			else {
				const validator = new UserValidator(user);
				const existingUsers = result.map(JSON.parse);

				const errors = validator.validate(existingUsers);

				if (errors.length > 0) {
					res.status(400).send(errors.join(','));
				}
				else {
					redisClient.lpush(redisKeys.users, JSON.stringify(user), (err, result) => {
						if (err) {
							next(err);
						}
						else {

							sockets.setupUserNamespace(user.handle);

							const token = jwt.sign({ handle });

							res.json({
								token: jwt.bearerToken(token)
							});

							//res.send(`User saved to redis. Number of users: ${result}.`);
						}
					});
				}
			}
		});
	});

	app.get('/users/:max', (req, res, next) => {

		redisClient.lrange(redisKeys.users, 0, req.params.max, (err, result) => {
			if (err) {
				next(err);
			}
			else {
				console.log('users', result);
				res.json(result.map(JSON.parse));
			}
		});
	});

	app.get('/user/verify', verifyAuthorizationToken, (req, res, next) => {
		res.send(req.user.handle);
	});

    app.post('/contact', verifyAuthorizationToken, (req, res, next) => {
        console.log('POST /contact', req.body);

        const sender = req.user.handle;
        const receiver = req.body.handle;

		// @TODO: validate:
		// 1. receiver handle exists
		// 2. handle is not the same as user's handle
		// 3. handle is not already part of the user's contacts

		redisClient.lpush(redisKeys.contactsByUser(sender), receiver, (err, result) => {
			if (err) {
				next(err);
			}
			else {
                const fact = {
                    type: 'added-as-contact',
                    data: {
                        sender,
                        receiver
                    }
                };

                sockets.emitUserFact(receiver, fact);

                res.json(fact);
			}
		});
    });

    app.get('/contact', verifyAuthorizationToken, (req, res, next) => {
        const sender = req.user.handle;

        redisClient.lrange(redisKeys.contactsByUser(sender), 0, -1, (err, result) => {
            if (err) {
                next(err);
            }
            else {
                res.json(result);
            }
        });
	});

    app.post('/message', verifyAuthorizationToken, (req, res, next) => {

        const sender = req.user.handle;
        const {receiver, content} = req.body;

        const fact = {
            type: 'message-sent',
            data: {
                sender,
                receiver,
				content
            }
        };

        sockets.emitUserFact(receiver, fact);

        res.json(fact);
    });
}

function verifyAuthorizationToken(req, res, next) {

    const bearerToken = req.header('Authorization');
    const token = jwt.extractToken(bearerToken);

    let decoded;

    try {
    	decoded = jwt.verify(token);
	}
	catch(err) {
    	res.status(401).send('invalid-auth-token');
    	return;
	}

	req.user = req.user || {};
    req.user.handle = decoded.handle;
    next();
}

export {setup as setupRoutes}