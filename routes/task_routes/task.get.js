const models = require("../../models/index");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authorization");

module.exports = router.get("/tasks", auth, async (req, res, next) => {
  try {
    const filterBy = req.query.filterBy;
    const sortBy = req.query.sortBy || "asc";
    const page = parseInt(req.query.page) - 1 || 0;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const taskWhere = { user_id: res.locals.id };

    filterBy === "done" && (taskWhere.done = "true");
    filterBy === "undone" && (taskWhere.done = "false");

    const itemsOnPage = await models.Task.findAndCountAll({
      limit: pageSize,
      where: taskWhere,
      offset: page * pageSize,
      order: [["createdAt", sortBy]],
    });
    res.send({ tasks: itemsOnPage.rows, countTasks: itemsOnPage.count }, 200);
  } catch (err) {
    next(err);
  }
});
