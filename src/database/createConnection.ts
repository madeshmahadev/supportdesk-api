import { createConnection, Connection } from 'typeorm';

import * as entities from 'entities';

const createDatabaseConnection = (): Promise<Connection> =>
  createConnection({
    type: 'sqlite',
    database: '../data.db',
    entities: Object.values(entities),
    synchronize: true,
    logging: true,
    migrations: [
        "migration/**/*.ts"
    ],
    subscribers: [
        "subscriber/**/*.ts"
    ],
    cli: {
        "entitiesDir": "entities",
        "migrationsDir": "migration",
        "subscribersDir": "subscriber"
    }
    });

export default createDatabaseConnection;
