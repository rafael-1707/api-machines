import express from 'express';
import { routes } from './routes';

const app = express();
app.use(express.json(), routes);

export default app;
