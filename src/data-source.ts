import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

const isTest = process.env.NODE_ENV === 'test';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: isTest ? ':memory:' : process.env.DB_PATH || 'database.sqlite',
  entities: [User],
  synchronize: true,
  dropSchema: isTest,
  logging: false
});
