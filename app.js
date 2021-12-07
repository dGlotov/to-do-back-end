const recursive = require("recursive-readdir-sync");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

recursive(`${__dirname}/routes`).forEach((file) => app.use("/", require(file)));

app.use((error, req, res) => {
  console.log(error);
});

app.listen(7000, () => {
  console.log("Example!!! listening on port 7000");
});
