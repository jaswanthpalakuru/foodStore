const User = require("../model/userModel");

const currDate = new Date().getTime();
// console.log("currDate = " + currDate);
// console.log(typeof currDate);

async function verify(req, res, next) {
  //   console.log(req.query);
  try {
    const { username, otp } = req.query;
    const user = await User.findOne({ username: username });
    // console.log(user);
    if (user) {
      const diff = currDate - user.otpCreatedat;
      // console.log(diff);
      if (user.otp === otp) {
        if (diff <= 300000) {
          user.verified = true;
          user.otp = undefined;
          user.otpRequestedTimes = 0;
          // user.otpCreatedat = new Date().getTime();

          //   user.set("verified", true);
          //   user.set("opt", undefined);
          user.save().then(() => {
            res.json({ username: username, otp: otp });
            // console.log("user verified");
          });
        } else {
          next({ message: "Otp expired" });
        }
      } else {
        next({ message: "Enter correct otp" });
      }
    } else {
      next({ message: "No user found" });
    }
    // console.log(username, otp);
  } catch (error) {
    next(error);
  }
}

module.exports = verify;
