const models = require("../../models/index").task;
const express = require("express");
const router = express.Router();

module.exports = router.get("/tasks", async (req, res) => {
  console.log(models, "routs");
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

    let itemsOnPage = [];

    if (filterBy === "all") {
      itemsOnPage = await models.findAndCountAll({
        limit: pageSize,
        offset: page * pageSize,
        order: [["createdAt", sortBy]],
      });
    }

    if (filterBy !== "all") {
      itemsOnPage = await models.findAndCountAll({
        limit: pageSize,
        offset: page * pageSize,
        where: {
          done: filterBy,
        },
        order: [["createdAt", sortBy]],
      });
    }

    res.send({ arrTasks: itemsOnPage.rows, countTasks: itemsOnPage.count }, 200);
  } catch (err) {
    console.log(err);
    const message = err || "Bad request";
    res.status(400).json({ message });
  }
});
