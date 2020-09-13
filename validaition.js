const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

const registervalidation = (data) => {
  return schema.validate(data);
};

module.exports.registervalidation = registervalidation;
