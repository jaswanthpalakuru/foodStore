const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .label("please enter a valid username/email"),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .label("password must be atleast 8 characters"),
});

async function loginValidation(req, res, next) {
  // console.log(req.body);
  try {
    const value = await schema.validate({
      username: req.body.username,
      password: req.body.password,
    });
    if (value.error) {
      // console.log(value.error.details[0].message);
      throw new Error(value.error.details[0].message);
    }
    // console.log(value);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = loginValidation;
