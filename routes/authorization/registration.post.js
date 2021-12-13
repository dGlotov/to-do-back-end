const models = require("../../models").User;
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

module.exports = router.post("/registration", async (req, res, next) => {
  try {
    const { login, passworFront } = req.body;
    if (!login || !passworFront) throw "Login or password not found";


    if (!login.match(/^(?=.*[A-Za-z])(?=.*\d)[\w]{8,}$/)) throw new Error("Login is not correct");

    if (!passworFront.match(/^(?=.*[A-Za-z])(?=.*\d)[\w]{8,}$/)) throw new Error("Password is not correct");


    const checkUser = await models.findOne({ where: { login } });

    if (checkUser) throw "Login is already occupied";

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(passwordFront, salt);

    const user = await models.create({ login, password });

    const payload = { id: user.uuid, login: user.login };
    const accessToken = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "300m" });

    res.send({ accessToken }, 200);
  } catch (err) {
    next(err);
  }
});
