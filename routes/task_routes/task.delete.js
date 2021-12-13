const models = require("../../models");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authorization");

module.exports = router.delete("/task/:id", auth, async (req, res, next) => {
  try {
    const user = await models.User.findByPk(res.locals.id);

    const taskForDelete = await models.Task.findByPk(req.params.id);
    if (!taskForDelete) throw new Error("Task not found");

    await taskForDelete.destroy();

    res.send("Success delete", 200);
  } catch (err) {
    next(err);
  }
});
