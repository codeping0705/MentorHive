const Joi = require("joi");

const createScheduleSchema = Joi.object({
  mentee: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  topic: Joi.string().required(),
  status: Joi.string().valid("pending", "confirmed", "completed", "cancelled").optional(),
});

module.exports = {
  createScheduleSchema,
};
