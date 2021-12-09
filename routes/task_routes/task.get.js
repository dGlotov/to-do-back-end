const models = require("../../models/index").Task;
const express = require("express");
const router = express.Router();

module.exports = router.get("/tasks", async (req, res) => {
  try {
    const filterBy = req.query.filterBy
      ? req.query.filterBy === "done"
        ? true
        : req.query.filterBy === "undone"
        ? false
        : "all"
      : "all";

    const sortBy = req.query.sortBy || "asc";
    const page = parseInt(req.query.page) - 1 || 0;
    const pageSize = parseInt(req.query.pageSize) || 5;

    // const user = await models.findByPk(req.params.userId);
    // const tasks = await user.getTasks();

    // console.log(tasks);

    let itemsOnPage = [];

    if (filterBy === "all") {
      itemsOnPage = await models.findAndCountAll({
        where: {
          user_id: req.params.userId,
        },
        limit: pageSize,
        offset: page * pageSize,
        order: [["createdAt", sortBy]],
      });
    }

    if (filterBy !== "all") {
      itemsOnPage = await models.findAndCountAll({
        where: {
          user_id: req.params.userId,
        },
        limit: pageSize,
        offset: page * pageSize,
        where: {
          done: filterBy,
        },
        order: [["createdAt", sortBy]],
      });
    }

    console.log(itemsOnPage);
    // console.log(Object.getOwnPropertyNames(models).filter((item) => item));
    console.log(typeof models, "typeof");
    res.send({ arrTasks: itemsOnPage.rows, countTasks: itemsOnPage.count }, 200);
  } catch (err) {
    console.log(err);
    const message = err || "Bad request";
    res.status(400).json({ message });
  }
});
