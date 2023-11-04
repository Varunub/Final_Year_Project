"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
require("dotenv/config");
exports.client = new pg_1.Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
