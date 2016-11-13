import {redisClient} from './redis-client';
import {UserValidator} from '../core/user-validator';

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

		const validator = new UserValidator(req.body);

		const errors = validator.validate([]);

		if (errors.length > 0) {
			res.status(400).send(errors.join(','));
		}
		else {
			redisClient.lpush('users', JSON.stringify(user), (err, result) => {
				if (err) {
					next(err);
				}
				else {
					res.send(`User saved to redis. Number of users: ${result}.`);
				}
			});
		}
	});
}

export {setup as setupRoutes}