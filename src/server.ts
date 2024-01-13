import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errorMiddleware)

const server = app.listen(process.env.PORT ? Number(process.env.PORT) : 3333, '0.0.0.0', () => {
  console.log('HTTP Server Running');
});

server.on('error', (error: any) => {
  console.error('Error starting server:', error);
});
