import {redisClient} from './redis-client';
import UserValidator from '../core/user-validator';

function setup(app) {
	app.get('/', (req, res) => {
		res.send('Hello World!');
	});

	app.get('/redis-test', (req, res) => {
		redisClient.incr('inc-test', (err, result) => {
			if (err) {
				res.send('Error incrementing redis test');
			}
			else {
				res.send(`Redis increment test result: ${result}`);
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

		const validator = new UserValidator(req.body);
		
		const errors = validator.validate([]);

		res.json(errors);
	});
}

export {setup as setupRoutes}