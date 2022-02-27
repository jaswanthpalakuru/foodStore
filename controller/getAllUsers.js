const User = require("../model/userModel");

const users = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next("No user found");
  }
};

module.exports = users;
