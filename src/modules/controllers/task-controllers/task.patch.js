import fs from "fs";
import tasks from "../../../../tasks.json";

export default (req, res) => {
  try {
    if (!req.body || !req.params.id) throw { message: "Bad request" };

    const { name, done } = req.body;
    const taskIndex = tasks.findIndex((item) => item.uuid === req.params.id);

    if (name && name.lenght < 2) throw { message: "Need more symbols" };

    if (tasks.find((item) => item.name === name))
      throw { message: "This name already exists" };

    if (taskIndex) {
      tasks[taskIndex].name = name || tasks[taskIndex].name;
      tasks[taskIndex].done = done || tasks[taskIndex].done;
      fs.writeFileSync("tasks.json", JSON.stringify(tasks));
      res.json(tasks[taskIndex]);
    } else throw { message: "Id not found" };
  } catch (err) {
    err.message ? res.json({ message: "Bad request" }) : res.json(err);
  }
};
