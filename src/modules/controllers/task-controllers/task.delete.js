const Task = require("../../../../models/task.js");

module.exports = async (req, res) => {
  try {
    const taskForDelete = await Task.findByPk(req.params.id);
    if (!taskForDelete) throw "Task not found";

    await taskForDelete.destroy();

    res.send("Success delete", 200);
  } catch (err) {
    const message = err || "Bad request";
    res.send(message, 404);
  }
};
