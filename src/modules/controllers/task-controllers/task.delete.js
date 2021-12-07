const Task = require("../../../../models/task.js");

module.exports = async (req, res) => {
  try {
    const taskForDelete = await Task.findByPk(req.params.id);
    if (!taskForDelete) throw "Id not found";
    await taskForDelete.destroy();
    res.send("Succes delete", 200);
  } catch (err) {
    if (err.errors) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      const message = err || "Bad request";
      res.status(400).json({ message });
    }
  }
};
