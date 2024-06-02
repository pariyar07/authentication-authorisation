import connectDB from './config/db.config';
// import routes from './routes';

import express from 'express';
const app = express();

app.use(express.json());

connectDB();

// app.use();

export default app;
