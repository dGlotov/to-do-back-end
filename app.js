const recursive = require("recursive-readdir-sync");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

recursive(`${__dirname}/routes`).forEach((file) => app.use("/", require(file)));

app.listen(process.env.PORT, () => {
  console.log("Example!!!", process.env.PORT);
});
