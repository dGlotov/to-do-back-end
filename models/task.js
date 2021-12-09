module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("Task", {
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
  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: {
        type: Sequelize.UUID,
        field: "user_id",
      },
    });
  };
  return Task;
};
