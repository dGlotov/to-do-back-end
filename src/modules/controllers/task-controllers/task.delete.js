import fs from "fs";
import db from "../../../../db.json";

export default (req, res) => {
  try {
    if (!req.params.id) throw { message: "Id not passed" };

    const taskIndex = db.tasks.findIndex((item) => item.uuid === req.params.id);

    if (taskIndex + 1) {
      db.tasks = db.tasks.filter((task) => task.uuid !== req.params.id);

      fs.writeFileSync("db.json", JSON.stringify(db));

      res.json({ data: "Sucsses delete" });
    } else {
      throw { message: "Id not found" };
    }
  } catch (err) {
    err.message ? res.json(err) : res.json({ message: "Bad request" });
  }
};
