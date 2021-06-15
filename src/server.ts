/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';

import './database';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World!' });
});

const port = process.env.SERVER_PORT;

app.listen(3000, '0.0.0.0', () =>
  console.log(`Server Started! on port ${port}`),
);
