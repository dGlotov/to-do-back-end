const Task = require("../../../../models/task.js");

module.exports = async (req, res) => {
  try {
    if (!req.body.name) throw "Name not found";
    const name = req.body.name.trim().replace(/\s+/g, " ");
    const task = await Task.create({ name });

    res.send(task);
  } catch (err) {
    if (err.errors) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      const message = err || "Bad request";
      res.status(400).json({ message });
    }
  }
};
