const RegisterUser = require("../model/userModel");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcryptjs");

const registerUsers = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  console.log(username, password, phoneNumber);

  //   Find if user already exists
  const users = await RegisterUser.find({ username });
  console.log(users);
  if (users.length === 0) {
    let sentMail;
    const otp = Math.floor(Math.random() * 1000000);
    bcrypt
      .hash(password, 12)
      .then((hashedPw) => {
        console.log(hashedPw);
        const user = new RegisterUser({
          username: username,
          password: hashedPw,
          phoneNumber: phoneNumber,
          otp: otp,
        });
        return user.save();
      })
      .then((result) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          // to: `${username}`, // Change to your recipient
          to: "palakurujaswanth@gmail.com",
          from: "palakurujaswanth@gmail.com", // Change to your verified sender
          subject: "Verify Your email",
          text: "otp",
          html: `${otp}`,
        };
        sgMail
          .send(msg)
          .then(() => {
            // console.log("Email sent");
            sentMail = true;
          })
          .catch((error) => {
            console.error(error);
          });
        res.status(201).json({
          message: "User Verify!",
          emailSent: true,
          userId: result._id,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
    // const registeruser = new RegisterUser({
    //   username: username,
    //   password: password,
    //   phoneNumber: phoneNumber,
    // });

    // await registeruser.save().then((req, res) => {
    //   console.log("new user saved successfully");
    //   res.status(200).json({ message: "New user saved successfully" });
    // });
  }
  //  else if (users.verified === false) {} to resend otp Logic
  else {
    res.json({ msg: "User already exist" });
  }
};

module.exports = registerUsers;
