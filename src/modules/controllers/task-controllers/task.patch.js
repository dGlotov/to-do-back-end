const Task = require("../../../../models/task.js");

module.exports = async (req, res) => {
  try {
    const name = req.body.name;
    const done = req.body.done;

    const task = await Task.findByPk(req.params.id);
    if (!task) throw "Id not found";

    if (name) {
      await task.update({ name });
    }

    if (typeof done === "boolean") {
      await task.update({ done });
    } else throw "Bad request body";

    res.send({ task }, 200);
  } catch (err) {
    // err.errors && res.status(400).json({ message: err.errors[0].message });
    err ? res.json({ message: err }) : res.json({ message: "Bad request" });
  }
};
