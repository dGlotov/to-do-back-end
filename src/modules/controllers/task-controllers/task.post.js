import fs from "fs";
import tasks from "../../../../tasks.json";
import { randomUUID } from "crypto";

export default (req, res) => {
  try {
    if (!req.body.name) throw { message: "Name not passed" };

    const name = req.body.name;

    if (name.lenght < 2) throw { message: "Need more symbols" };

    if (tasks.find((item) => item.name === name))
      throw { message: "This name already exists" };

    const task = {
      uuid: randomUUID(),
      name,
      done: false,
      created_at: new Date(),
    };

    tasks.push(task);

    fs.writeFileSync("tasks.json", JSON.stringify(tasks));
    res.json(task);
  } catch (err) {
    err.message ? res.json({ message: "Bad request" }) : res.json(err);
  }
};
