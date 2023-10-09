const { celebrate, Joi } = require('celebrate');
const { IS_URL } = require('../util/constants');

// Common Validation Schemas
const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(8).required();
const nameSchema = Joi.string().min(2).max(30);
const aboutSchema = Joi.string().min(2).max(30);
const avatarSchema = Joi.string().pattern(IS_URL);
const idSchema = Joi.string().hex().length(24).required();

// User Validations
module.exports = {

  // User Creation
  validationCreateUser: celebrate({
    body: Joi.object().keys({
      email: emailSchema,
      password: passwordSchema,
      name: nameSchema,
      about: aboutSchema,
      avatar: avatarSchema,
    }),
  }),

  // User Login
  validationLogin: celebrate({
    body: Joi.object().keys({
      email: emailSchema,
      password: passwordSchema,
    }),
  }),

  // Get User by ID
  validationUserId: celebrate({
    params: Joi.object().keys({
      userId: idSchema,
    }),
  }),

  // Update User Info
  validationUpdateUser: celebrate({
    body: Joi.object().keys({
      name: nameSchema.required(),
      about: aboutSchema.required(),
    }),
  }),

  // Update User Avatar
  validationUpdateAvatar: celebrate({
    body: Joi.object().keys({
      avatar: avatarSchema.required(),
    }),
  }),

  // Cards Validations

  // Create Card
  validationCreateCard: celebrate({
    body: Joi.object().keys({
      name: nameSchema.required(),
      link: avatarSchema.required(),
    }),
  }),

  // Get Card by ID
  validationCardById: celebrate({
    params: Joi.object().keys({
      cardId: idSchema,
    }),
  }),
};
