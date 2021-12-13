const models = require("../../models");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authorization");

module.exports = router.patch("/task/:id", auth, async (req, res, next) => {
  try {
    const done = req.body.done;
    const name = req.body.name?.trim().replace(/\s+/g, " ");
    if (!req.body.name && !typeof done === "boolean") throw new Error("Bad request body");

    const checkUniqName =
      name &&
      (await models.Task.findOne({
        where: {
          name,
          user_id: res.locals.id,
        },
      }));

    if (checkUniqName) throw new Error("Name must be unique");

    const task = await models.Task.findOne({
      where: {
        uuid: req.params.id,
        user_id: res.locals.id,
      },
    });

    if (!task) throw new Error("Task not found");

    await task.update({ name, done });

    res.send("Success edit", 200);
  } catch (err) {
    next(err);
  }
});
