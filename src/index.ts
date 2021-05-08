import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';


import createDatabaseConnection from './database/createConnection';

const establishDatabaseConnection = async (): Promise<void> => {
  try {
    await createDatabaseConnection();
  } catch (error) {
    console.log(error);
  }
   console.log("Server CONNECTED")
};

const initializeExpress = (): void => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  app.listen(process.env.PORT || 3000);
  console.log("Express CONNECTED")
};


const initializeApp = async (): Promise<void> => {
  await establishDatabaseConnection();
  initializeExpress();
};


initializeApp();