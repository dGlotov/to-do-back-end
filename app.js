const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

fs.readdirSync("./src/modules/routes/").forEach((file) => {
  app.use("/", require(`./src/modules/routes/${file}`));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example!!! listening on port ${PORT}`);
});
