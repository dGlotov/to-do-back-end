module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /[\wа-яА-Я]/,
        len: [4, 100],
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [6, 100],
      },
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
  User.associate = (models) => {
    User.hasMany(models.Task);
  };
  return User;
};
