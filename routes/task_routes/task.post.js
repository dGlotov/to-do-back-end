const models = require("../../models");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authorization");

module.exports = router.post("/task", auth, async (req, res, next) => {
  try {
    const user_id = res.locals.id;
    const name = req.body.name?.trim().replace(/\s+/g, " ");
    if (!name) throw new Error("Name not correct");

    const checkUniqName = await models.Task.findOne({
      where: {
        name,
        user_id,
      },
    });

    if (checkUniqName) throw new Error("Name must be unique");

    const user = await models.User.findByPk(user_id);

    const task = await user.createTask({ name });

    res.send(task, 200);
  } catch (err) {
    next(err);
  }
});
