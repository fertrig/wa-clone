import express from 'express';
import {setupRedis} from './redis-client';
import {setupRoutes} from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
console.log('cors allowed for all routes');
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

setupRedis();
setupRoutes(app);

app.listen(port, () => {
	console.log(`Express app listening on port ${port}`);
});