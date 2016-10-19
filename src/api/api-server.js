import express from 'express';
import {setupRedis, redisClient} from './redis-client';

if (!process.env.PORT) {
	require('dotenv').load();
	console.log('.env loaded manually, port', process.env.PORT);
}

const app = express();

const port = process.env.PORT;

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
	})
});

setupRedis();

app.listen(port, () => {
	console.log('express app listening on port 3000');
});

