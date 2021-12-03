import tasks from "../../../../tasks.json";

export default (req, res) => {
  try {
    let arrTasks = [...tasks];
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

    filterBy !== "all" &&
      (arrTasks = arrTasks.filter((task) => task.done === filterBy));
    sortBy === "asc"
      ? arrTasks.sort((a, b) => a.created_at > b.created_at)
      : arrTasks.sort((a, b) => a.created_at < b.created_at);
    const countTasks = arrTasks.length;

    arrTasks = arrTasks.filter(
      (item, index) => index >= page * pageSize && index < (page + 1) * pageSize
    );

    res.json({ data: { arrTasks, countTasks } });
  } catch (err) {
    err.message ? res.json({ message: "Bad request" }) : res.json(err);
  }
};
