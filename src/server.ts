import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import errorHandling from '@middlewares/errorHandling';

import createConnection from './database';
import routes from './routes';

createConnection();

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandling);

app.listen(3000, '0.0.0.0', () =>
  // eslint-disable-next-line no-console
  console.log(`Server Started!`),
);
