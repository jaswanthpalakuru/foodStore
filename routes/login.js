const express = require("express");
const login = require("../controller/login");
const loginValidation = require("../middleware/loginValidation");
const router = express.Router();

// router
//   .route("/login")
//   //   .get((req, res) => {
//   //     res.send("Login get");
//   //   })
//   .post((req, res) => {
//     console.log(req.body);
//     res.send("Login Post");
//   });

// or
router.post("/login", loginValidation, login);

module.exports = router;
