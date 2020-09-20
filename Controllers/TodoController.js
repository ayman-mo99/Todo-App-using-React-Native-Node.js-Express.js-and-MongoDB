const User = require("../models/User");

const login = async (req, res) => {
  try {
    const user = await User.login(req.body.email, req.body.password);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

const register = async (req, res) => {
  try {
    const user = await User.register(req.body.email, req.body.password);
    // create a new user
    const save = await user.save();
    res.json(save);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

const todo = async (req, res) => {
  try {
    await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send("update done");
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const delet = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove({ _id: req.params.id });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  login,
  register,
  todo,
  delet,
};
