const { randomUUID } = require("crypto");

const taskSchema = {
  id: randomUUID,
  name: String,
  created_at: Date,
  done: Boolean 
}

module.exports = TaskSchema;