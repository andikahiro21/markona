/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const Joi = require('joi');

const validateBodyMenu = (reqBody) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    category_id: Joi.number().integer().required(),
    description: Joi.string().allow(''),
    type: Joi.string().required(),
    image: Joi.any().valid('image/jpeg', 'image/png', 'image/gif'),
    price: Joi.number().integer().required(),
    qty: Joi.number().integer().min(0).required(),
    sizes: Joi.bool(),
    beans: Joi.bool(),
    milk: Joi.bool(),
    sugars: Joi.bool()
  });
  const { error } = schema.validate(reqBody, {
    abortEarly: false
  });

  if (error) {
    return error.details.map((err) => err.message).join(', ');
  }

  return null;
};

const validateBodyEditMenu = (reqBody) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    category_id: Joi.number().integer().required(),
    description: Joi.string().allow(''),
    type: Joi.string().required(),
    image: Joi.any().allow(null),
    price: Joi.number().integer().required(),
    qty: Joi.number().integer().min(0).required(),
    sizes: Joi.bool(),
    beans: Joi.bool(),
    milk: Joi.bool(),
    sugars: Joi.bool()
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
  validateBodyMenu,
  validateBodyEditMenu
};
