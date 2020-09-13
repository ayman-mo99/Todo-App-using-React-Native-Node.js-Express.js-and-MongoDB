const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  task: {
    type: String,
  },
  key: {
    type: String,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Todos: {
    type: [TaskSchema],
    default: [],
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
