import fs from "fs";
import db from "../../../../db.json";

export default (req, res) => {
  try {
    if (!req.body || !req.params.id) throw { message: "Bad request" };

    const { name, done } = req.body;
    const taskIndex = db.tasks.findIndex((item) => item.uuid === req.params.id);

    if (name && name.length < 2) throw { message: "Need more symbols" };

    if (db.tasks.find((item) => item.name === name)) throw { message: "This name already exists" };

    if (taskIndex + 1) {
      const task = db.tasks[taskIndex];
      task.name = name || task.name;
      task.done = done || task.done;
      fs.writeFileSync("db.json", JSON.stringify(db));
      res.json(task);
    } else throw { message: "Id not found" };
  } catch (err) {
    err.message ? res.json(err) : res.json({ message: "Bad request" });
  }
};
