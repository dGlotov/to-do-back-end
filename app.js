const express = require("express");
const cors = require("cors");
const apiRoutes = require("./src/modules/routes/task.js");
const dotenv = require("dotenv");
// const Sequelize = require("sequelize");
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", apiRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example!!! listening on port ${PORT}`);
});
