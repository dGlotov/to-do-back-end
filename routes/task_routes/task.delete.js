const models = require("../../models").task;
const express = require("express");
const router = express.Router();

module.exports = router.delete("/task/:id", async (req, res) => {
  try {
    const taskForDelete = await models.findByPk(req.params.id);
    if (!taskForDelete) throw "Task not found";

    await taskForDelete.destroy();

    res.send("Success delete", 200);
  } catch (err) {
    const message = err || "Bad request";
    res.send(message, 404);
  }
});
