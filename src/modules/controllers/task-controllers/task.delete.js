import fs from "fs";
import tasks from "../../../../tasks.json";

export default (req, res) => {
  try {
    if (!req.params.id) throw { message: "Id not passed" };

    const taskIndex = tasks.findIndex((item) => item.uuid === req.params.id);

    if (taskIndex + 1) {
      fs.writeFileSync(
        "tasks.json",
        JSON.stringify(tasks.filter((task) => task.uuid !== req.params.id))
      );
      res.json({ data: "Sucsses delete" });
    } else {
      throw { message: "Id not found" };
    }
  } catch (err) {
    err.message ? res.json(err) : res.json({ message: "Bad request" });
  }
};
 