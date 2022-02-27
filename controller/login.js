const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

async function login(req, res, next) {
  try {
    // console.log(req.body);
    const users = await User.findOne({ username: req.body.username });
    // console.log(users);
    if (users.length === 0) {
      throw new Error("User doesn't exist");
    }
    const isEqual = await bcrypt.compare(req.body.password, users.password);
    // console.log(isEqual);
    if (!isEqual) {
      const error = new Error("Password did not match");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      { username: users.username, userId: users._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.status(200).json({ token: token, userId: users._id.toString() });
    // res.json(req.body);
  } catch (error) {
    next(error);
  }
}

module.exports = login;
