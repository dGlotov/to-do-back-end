require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USER_NAME,
    password: process.env.USER_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    username: "USER_NAME",
    password: "USER_PASSWORD",
    database: "DB_NAME",
    host: "HOST",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
