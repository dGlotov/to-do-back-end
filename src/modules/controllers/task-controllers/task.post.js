import fs from "fs";
import db from "../../../../db.json";
import { randomUUID } from "crypto";

export default (req, res) => {
  try {
    if (!req.body.name) throw { message: "Name not passed" };

    const name = req.body.name;

    if (name.lenght < 2) throw { message: "Need more symbols" };

    if (db.tasks.find((item) => item.name === name)) throw { message: "This name already exists" };

    const task = {
      uuid: randomUUID(),
      name,
      done: false,
      created_at: new Date(),
    };

    db.tasks.push(task);

    fs.writeFileSync("db.json", JSON.stringify(db));
    res.json(task);
  } catch (err) {
    err.message ? res.json(err) : res.json({ message: "Bad request" });
  }
};
