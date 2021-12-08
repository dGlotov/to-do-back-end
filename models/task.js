module.exports = (sequelize, Sequelize) => {
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
      validate: {
        is: /[\wа-яА-Я]/,
        len: [2, 100],
      },
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
  return task;
};
