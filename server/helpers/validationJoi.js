/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const Joi = require('joi');

const validateBodyScript = (reqBody) => {
  const schema = Joi.object({
    script_name: Joi.string().required(),
    description: Joi.string().allow(''),
    file_name: Joi.string().required(),
    file: Joi.any().valid('application/pdf')
  });
  const { error } = schema.validate(reqBody, {
    abortEarly: false
  });

  if (error) {
    return error.details.map((err) => err.message).join(', ');
  }

  return null;
};

const validateBodyEditScript = (reqBody) => {
  const schema = Joi.object({
    script_name: Joi.string().required(),
    description: Joi.string().allow(''),
    file_name: Joi.string().required(),
    file: Joi.any().valid('application/pdf')
  });
  const { error } = schema.validate(reqBody, {
    abortEarly: false
  });

  if (error) {
    return error.details.map((err) => err.message).join(', ');
  }

  return null;
};

module.exports = {
  validateBodyScript,
  validateBodyEditScript
};
