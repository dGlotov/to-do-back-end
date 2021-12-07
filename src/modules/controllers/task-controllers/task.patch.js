const Task = require("../../../../models/task.js");

module.exports = async (req, res) => {
  try {
    const done = req.body.done;

    if (!req.body.name && !typeof done === "boolean") throw "Bad request body";

    const task = await Task.findByPk(req.params.id);

    if (!task) throw "Id not found";

    if (req.body.name) {
      const name = req.body.name.trim().replace(/\s+/g, " ");
      await task.update({ name });
    }

    if (typeof done === "boolean") await task.update({ done });

    res.send("Success edit", 200);
  } catch (err) {
    if (err.errors) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      const message = err || "Bad request";
      res.status(422).json({ message });
    }
  }
};
