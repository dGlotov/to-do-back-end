import db from "../../../../db.json";

export default (req, res) => {
  try {
    let arrTasks = [...db.tasks];
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

    filterBy !== "all" && (arrTasks = arrTasks.filter((task) => task.done === filterBy));

    sortBy === "asc"
      ? (arrTasks = arrTasks.sort((a, b) => {
          if (a.created_at > b.created_at) return 1;
          else return -1;
        }))
      : (arrTasks = arrTasks.sort((a, b) => {
          if (a.created_at > b.created_at) return -1;
          else return 1;
        }));

    const countTasks = arrTasks.length;

    arrTasks = arrTasks.filter(
      (item, index) => index >= page * pageSize && index < (page + 1) * pageSize
    );

    res.json({ arrTasks, countTasks });
  } catch (err) {
    err.message ? res.json(err) : res.json({ message: "Bad request" });
  }
};
