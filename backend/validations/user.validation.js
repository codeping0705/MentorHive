const Joi = require("joi");

const updateUserProfileValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    title: Joi.string().allow("").optional(),
    tags: Joi.array().items(Joi.string()),
    bio: Joi.string().allow(""),
    college: Joi.string().allow(""),
    social: Joi.object({
      linkedin: Joi.string().allow("").uri(),
      github: Joi.string().allow("").uri(),
      instagram: Joi.string().allow("").uri(),
      facebook: Joi.string().allow("").uri(),
      twitter: Joi.string().allow("").uri(),
    }),
  }),
};

module.exports = {
  updateUserProfileValidation,
};
