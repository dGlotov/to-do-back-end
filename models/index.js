"use strict";
const Sequelize = require("sequelize");

const sequelize = new Sequelize("tasks", "postgres", "user", {
  dialect: "postgres",
  host: "localhost",
});

module.exports = sequelize;
