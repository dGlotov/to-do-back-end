const models = require("../../models").user;
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();

module.exports = router.post("/registration", async (req, res) => {
  try {
    if (!req.body.login || !req.body.password) throw "Login or password not found";

    const login = req.body.login.trim().replace(/\s+/g, " ");
    const passwordFront = req.body.password;

    if (!login) throw "Login is not correct";

    const checkUser = await models.findOne({ where: { login } });

    if (checkUser) throw "Login is already occupied";

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(passwordFront, salt);

    const user = await models.create({ login, password });

    const payload = { id: user.uuid, login: user.login };

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: "30m" });

    res.send({ accessToken });
  } catch (err) {
    if (err.errors) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      const message = err || "Bad request";
      res.status(422).json({ message });
    }
  }
});
