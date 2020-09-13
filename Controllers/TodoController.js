const User = require("../models/User");
const { registervalidation } = require("../validaition");
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  //check for valid email and password
  const { error } = registervalidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    //check if the user email exist or not
    const user = await User.findOne({
      email: req.body.email,
    }).select({
      _id: 1,
      email: 1,
      password: 1,
      Todos: 1,
    });
    if (!user) {
      return res.status(400).json({ message: "Wrong Email or Password." });
    }
    //check for a correct password
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      return res.status(400).json({ message: "Wrong Email or Password." });
    }
    //send the user info
    res.json(user);
  } catch (err) {
    console.log(err._message);
    res.json({ message: err._message });
  }
};

const register = async (req, res, next) => {
  //check for valid email and password
  const { error } = registervalidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    //check if the user email exist or not
    const testuser = await User.findOne({
      email: req.body.email,
    });
    if (testuser) {
      return res.status(400).json({ message: "This email used before" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    // create a new user
    const save = await user.save();
    res.send(save);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

const todo = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send("update done");
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

const delet = async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove({ _id: req.params.id });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

module.exports = {
  login,
  register,
  todo,
  delet,
};
