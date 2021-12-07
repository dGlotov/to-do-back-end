"use strict";
const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.USER_PASSWORD,
  {
    dialect: "postgres",
    host: "localhost",
  }
);

module.exports = sequelize;
