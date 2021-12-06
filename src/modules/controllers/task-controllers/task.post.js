const Task = require("../../../../models/task.js");

module.exports = async (req, res) => {
  try {
    if (!req.body.name) throw "Name not found";

    const task = await Task.create(req.body);

    res.send(task);
  } catch (err) {
    // err.errors.length && res.status(400).json({ message: err.errors[0].message });
    err ? res.json({ message: err }) : res.json({ message: "Bad request" });
  }
};
