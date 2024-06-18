/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { LeaguesController } from './infrastructure/controllers/leagues.controller';
import { LeaguesUseCases } from './application/usecases/leagues.usecases';
import { LeaguesRepository } from './infrastructure/repositories/leagues.repository';
import { TeamsController } from './infrastructure/controllers/teams.controller';
import { TeamsUseCases } from './application/usecases/teams.usecases';
import { TeamsRepository } from './infrastructure/repositories/teams.repository';
import { PlayersController } from './infrastructure/controllers/players.controller';
import { PlayersUseCases } from './application/usecases/players.usecases';
import { PlayersRepository } from './infrastructure/repositories/players.repository';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);

// Settings routes and controllers
const leaguesController = new LeaguesController(
  new LeaguesUseCases(new LeaguesRepository())
);
const teamsController = new TeamsController(
  new TeamsUseCases(new TeamsRepository(), new PlayersRepository())
);
const playersController = new PlayersController(
  new PlayersUseCases(new PlayersRepository())
);

[leaguesController, teamsController, playersController].forEach(
  (controller) => {
    app.use('/api', controller.router);
  }
);

// Swagger init
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'FDJ API',
      version: '1.0.0',
      description:
        'FDJ API made with Express and TypeScript. Documentation generated with Swagger.',
    },
    servers: [
      {
        url: 'http://localhost:3333/api',
      },
    ],
  },
  apis: [
    './apps/fdj-api/src/infrastructure/controllers/**/*.ts',
    './apps/fdj-api/src/infrastructure/repositories/**/*.ts',
  ],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
    const port = process.env.PORT || 3333;
    const server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', console.error);
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB: ', error);
  });
