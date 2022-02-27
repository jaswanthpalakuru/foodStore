const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
function email(username, otp) {
  try {
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
    // next();
  } catch (error) {
    next(error);
  }
}

module.exports = email;
