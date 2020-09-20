const mongoose = require("mongoose");
const { validation } = require("../validaition");
const bcrypt = require("bcryptjs");
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

// static methods
UserSchema.statics.login = async function (email, password) {
  //check for valid email and password
  const { error } = validation({ email, password });
  if (error) {
    throw new Error(error.details[0].message);
  }
  try {
    //check if the user email exist or not
    const user = await this.findOne({
      email,
    }).select("-__v");
    console.log(user);
    if (!user) {
      throw new Error("Wrong Email or Password.");
    }
    //check for a correct password
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      throw new Error("Wrong Email or Password.");
    }
    return user;
  } catch (err) {
    throw Error(err);
  }
};

UserSchema.statics.register = async function (email, password) {
  //check for valid email and password
  const { error } = validation({ email, password });
  if (error) {
    throw new Error(error.details[0].message);
  }

  try {
    //check if the user email exist or not
    const testuser = await this.findOne({
      email,
    }).select("-__v");
    if (testuser) {
      throw new Error("This email used before");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new this({
      email,
      password: hashedPassword,
    });
    return user;
  } catch (err) {
    throw Error(err);
  }
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
