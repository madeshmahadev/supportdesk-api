import { createConnection, Connection } from 'typeorm';

import * as entities from '../entities';

const createDatabaseConnection = (): Promise<Connection> =>
  createConnection({
    type: 'sqlite',
    database: '../data.sqlite',
    entities: Object.values(entities),
    synchronize: true,
    logging: false,
  });

export default createDatabaseConnection;
