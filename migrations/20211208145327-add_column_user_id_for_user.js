"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn("Tasks", "user_id", {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    });
  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn("Tasks", "user_id");
  },
};
