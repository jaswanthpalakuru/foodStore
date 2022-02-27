const User = require("../model/userModel");

async function otpCountExpiry(req, res, next) {
  try {
    const { username } = req.query;
    const currentTime = new Date().getTime();
    const otp = Math.floor(Math.random() * 1000000);
    // console.log(otp);
    // console.log(req.query);
    // console.log(username);
    const user = await User.findOne({ username: username });
    // console.log(!user);
    if (user.lemgth != 0) {
      if (
        currentTime - user.otpCreatedat <= 500000 &&
        user.otpRequestedTimes < 5
      ) {
        user.otp = otp;
        user.otpRequestedTimes += 1;
        user.otpCreatedat = new Date().getTime();
        user.save().then(() => {
          res.json({ otp, username });
        });
      } else {
        res.send("Hello");
        user.otpRequestedTimes = 0;
        user.save().then(() => {
          res.json({ otp, username });
        });
      }
    } else {
      next({ message: "No User Found" });
    }
  } catch (error) {
    next({ message: "Not successful" });
  }

  // next();
  // res.send(username);
}

module.exports = otpCountExpiry;
