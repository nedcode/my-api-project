"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const isTest = process.env.NODE_ENV === 'test';
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'better-sqlite3',
    database: isTest ? ':memory:' : process.env.DB_PATH || 'database.sqlite',
    entities: [User_1.User],
    synchronize: true,
    dropSchema: isTest,
    logging: false
});
