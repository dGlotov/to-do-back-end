"use strict";

const Sequelize = require("sequelize");
const sequelize = require("./");

const task = sequelize.define("task", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  done: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    field: "done",
  },
  createdAt: {
    type: Sequelize.DATE,
    field: "created_at",
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: "updated_at",
  },
});

module.exports = task;
