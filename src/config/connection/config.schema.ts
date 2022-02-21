import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().default('localhost').required(),
  DB_PORT: Joi.number().default(33900).required(),
  DB_USER: Joi.string().default('root').required(),
  DB_PASS: Joi.string().default('root').required(),
  DB_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
