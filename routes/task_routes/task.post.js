const models = require("../../models").task;
const express = require("express");
const router = express.Router();

module.exports = router.post("/task", async (req, res) => {
  try {
    if (!req.body.name) throw "Name not found";
    const name = req.body.name.trim().replace(/\s+/g, " ");
    const task = await models.create({ name });

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
