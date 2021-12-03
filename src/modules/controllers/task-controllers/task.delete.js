import fs from "fs";
import tasks from "../../../../tasks.json";

export default (req, res) => {
  try {
    if (!req.params.id) throw { message: "Id not passed" };
    console.log(req.params.id);
    const taskIndex = tasks.findIndex((item) => item.uuid === req.params.id);
    console.log(taskIndex);
    if (taskIndex + 1) {
      fs.writeFileSync(
        "tasks.json",
        JSON.stringify(tasks.filter((task) => task.uuid !== req.params.id))
      );
      res.json();
    } else {
      throw { message: "Id not found" };
    }
  } catch (err) {
    err.message ? res.json(err) : res.json({ message: "Bad request" });
  }
};
