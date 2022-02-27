const express = require("express");
const mongoose = require("mongoose");
const registerRouter = require("./routes/register");
const loginValidation = require("./middleware/loginValidation");
const res = require("express/lib/response");
const login = require("./controller/login");
require("dotenv").config();

const app = express();

// connect to database
// mongoose
//   .connect(
//     `mongodb+srv://ranjith:${process.env.MONGODB_PASSWORD}@cluster0.9lkda.mongodb.net/ranjith?retryWrites=true&w=majority`
//   )
//   .then((data) => {
//     console.log("Connected to database");
//     // console.log(data);
//   })
//   .catch((err) => {
//     // console.log(err);
//     res.status(500).send({ message: "Could not connect to database" });
//   });

// Default middlewares
app.use(express.json());

// routes
// Register User
app.use("/register", registerRouter);
// login
app.use("/login", loginValidation, login);

// Handling Errors
app.use((err, req, res, next) => {
  res.json({ message: err.message });
});

const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// optional
async function start() {
  mongoose
    .connect(
      `mongodb+srv://ranjith:${process.env.MONGODB_PASSWORD}@cluster0.9lkda.mongodb.net/ranjith?retryWrites=true&w=majority`
    )
    .then((data) => {
      console.log("Connected to database");
      // console.log(data);
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).send({ message: "Could not connect to database" });
    });
}
start();
