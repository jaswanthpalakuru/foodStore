const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string()
    .length(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

async function inputValidation(req, res, next) {
  try {
    //   validating input request
    const value = await schema.validate({
      username: req.body.username,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
    });
    if (value.error) {
      // console.log(value.error.details[0].message);
      throw new Error(value.error.details[0].message);
    }
    console.log(value);
    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

module.exports = inputValidation;
