import fs from "fs";
import tasks from "../../../../tasks.json";

export default (req, res) => {
  try {
    if (!req.params.id) throw { message: "Id not passed" };

    const taskIndex = tasks.findIndex((item) => item.uuid === req.params.id);
    if (taskIndex) {
      fs.writeFileSync("tasks.json", JSON.stringify(newArr));
    } else {
      throw { message: "Id not found" };
    }
  } catch (err) {
    err.message ? res.json({ message: "Bad request" }) : res.json(err);
  }
};
