const express = require('express');

const app = express();

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
	res.send('Hello from Express.js!');
});

app.listen(port, () => {
	console.log('Express app listening on port 4000');
});