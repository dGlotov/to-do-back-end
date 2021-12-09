const models = require("../../models");
const express = require("express");
const router = express.Router();

module.exports = router.post("/:userId/task", async (req, res) => {
  try {
    if (!req.body.name) throw "Name not found";

    const name = req.body.name.trim().replace(/\s+/g, " ");
    const userId = req.params.userId;

    if (!name) throw "Name is not correct";

    const user = await models.User.findByPk(userId);
    const task = await user.createTask({ name });

    res.send(task, 200);
  } catch (err) {
    if (err.errors) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      const message = err || "Bad request";
      res.status(422).json({ message });
    }
  }
});
