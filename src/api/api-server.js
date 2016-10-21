import express from 'express';
import {setupRedis} from './redis-client';
import {setupRoutes} from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';

if (!process.env.PORT) {
	require('dotenv').load();
	console.log('.env loaded manually, port', process.env.PORT);
}

const app = express();
app.use(cors());
console.log('cors allowed for all routes');
app.use(bodyParser.json());

const port = process.env.PORT;

setupRedis();
setupRoutes(app);

app.listen(port, () => {
	console.log('express app listening on port 3000');
});

