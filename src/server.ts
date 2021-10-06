import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import './shared/container';
import './database';

import { router } from './routes';
import saggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(saggerFile));

app.use(router);

app.listen(3333, () => {
  console.log('server is running!');
});
