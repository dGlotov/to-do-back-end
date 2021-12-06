const Task = require("../../../../models/task.js");

module.exports = async (req, res) => {
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
      itemsOnPage = await Task.findAndCountAll({
        limit: pageSize,
        offset: page * pageSize,
        order: [["createdAt", sortBy]],
      });
    }
    if (filterBy !== "all") {
      itemsOnPage = await Task.findAndCountAll({
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
    // err.errors.length && res.status(400).json({ message: err.errors[0].message });
    err ? res.json({ message: err }) : res.json({ message: "Bad request" });
  }
};
