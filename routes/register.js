const express = require("express");
const router = express.Router();
const inputValidation = require("../middleware/reqValidation");
const registerUser = require("../controller/registerUser");
const getUsers = require("../controller/getAllUsers");
const verifyUser = require("../controller/verifyUser");
const otpCountExpiry = require("../middleware/otpCountExpiry");

router.get("/register", getUsers);

router.post("/register", inputValidation, registerUser);
// router.post("/resendOtp", resendtOtp, )
router.post("/requestOtp", otpCountExpiry);
router.post("/verify", verifyUser);

module.exports = router;
