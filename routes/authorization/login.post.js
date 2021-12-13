const models = require("../../models").User;
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

module.exports = router.post("/login", async (req, res, next) => {
  try {
    const { login, password } = req.body;
    if (!req.body.login || !req.body.password) throw new Error("Login or password not found");


    if (!login.match(/^(?=.*[A-Za-z])(?=.*\d)[\w]{8,}$/)) throw new Error("Login is not correct");
    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[\w]{8,}$/)) throw new Error("Password is not correct");


    const user = await models.findOne({ where: { login } });

    if (!user) throw "Login not found";

    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass) throw new Error("Password not found");

    const payload = { id: user.uuid, login: user.login };
    const accessToken = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "300m" });

    res.send({ accessToken }, 200);
  } catch (err) {
    next(err);
  }
});
