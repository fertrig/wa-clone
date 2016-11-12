import express from 'express';
import {setupRedis, redisClient} from './redis-client';
import cors from 'cors';

const app = express();
app.use(cors());
console.log('cors allowed for all routes');

const port = process.env.PORT || 4000;

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

setupRedis();

app.listen(port, () => {
	console.log('Express app listening on port 4000');
});