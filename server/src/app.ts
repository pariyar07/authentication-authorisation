import connectDB from './config/db.config';
import router from './routes/routes';

require('dotenv').config();

import express from 'express';
const app = express();

app.use(express.json());

app.use(router);

connectDB();

export default app;
