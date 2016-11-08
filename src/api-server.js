const express = require('express');
const {setupRedis, getClient} = require('./redis-client');

const app = express();

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
	res.send('Hello from Express.js!');
});

app.get('/redis-test', (req, res) => {
	getClient().incr('inc-test-v2', (err, result) => {
		if (err) {
			console.error(err);
			res.send('Error connecting to redis');
		}
		else {
			res.send(`New incremented value: ${result}`);
		}
	});
});

setupRedis();

app.listen(port, () => {
	console.log('Express app listening on port 4000');
});