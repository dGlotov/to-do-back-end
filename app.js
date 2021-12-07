const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

fs.readdirSync("./src/modules/routes/").forEach((file) => {
  app.use("/", require(`./src/modules/routes/${file}`));
});

app.listen(7000, () => {
  console.log("Example!!! listening on port 7000");
});
