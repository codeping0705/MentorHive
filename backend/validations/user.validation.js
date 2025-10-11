const Joi = require("joi");

const updateUserProfileValidation = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  title: Joi.string().allow("").optional(),
  company: Joi.string().allow("").optional(),
  experience: Joi.number().integer().min(0).optional(),
  college: Joi.string().allow("").optional(),
  degree: Joi.string().allow("").optional(),
  graduationYear: Joi.number().integer().min(1900).max(new Date().getFullYear() + 10).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  bio: Joi.string().allow("").optional(),
  location: Joi.string().allow("").optional(),
  social: Joi.object({
    linkedin: Joi.string().allow("").uri().optional(),
    github: Joi.string().allow("").uri().optional(),
    instagram: Joi.string().allow("").uri().optional(),
    facebook: Joi.string().allow("").uri().optional(),
    twitter: Joi.string().allow("").uri().optional(),
  }).optional(),
}).unknown(true);


module.exports = {
  updateUserProfileValidation,
};
