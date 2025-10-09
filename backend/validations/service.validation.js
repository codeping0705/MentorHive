const Joi = require("joi");

const createServiceSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.number().required(),
  price: Joi.number().required(),
  active: Joi.string().optional(),
});

module.exports = {
  createServiceSchema,
};
