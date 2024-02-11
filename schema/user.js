import Joi from "joi";

export const regSchema =  Joi.object({
    username: Joi.string().alphanum().min(5).max(20).required(),
    password: Joi.string().pattern(new RegExp('^.{6,18}$')),
    repeat_password: Joi.ref('password'),
    email: Joi.string().email(),
})
