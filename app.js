const recursive = require("recursive-readdir-sync");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const errorCatcher = require("./middleware/error.catcher");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

recursive(`${__dirname}/routes`).forEach((file) => app.use("/", require(file)));

app.use(errorCatcher);
app.listen(process.env.PORT, () => {
  console.log("Example!!!", process.env.PORT);
});
