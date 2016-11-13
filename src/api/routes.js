import {redisClient, redisKeys} from './redis-client';
import {UserValidator} from '../core/user-validator';
import jwt from 'jsonwebtoken';

const handleSecret = 'some-secret-shhh';

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
		console.log('user', req.body);

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

							const token = jwt.sign({ handle }, handleSecret);

							res.json({
								token
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

	app.get('/user/verify', (req, res, next) => {
		const bearerToken = req.header('Authorization');
		const token = bearerToken.substring('Bearer '.length);

		const decoded = jwt.verify(token, handleSecret);

		res.send(decoded.handle);
	});
}

export {setup as setupRoutes}