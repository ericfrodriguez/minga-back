import Joi from 'joi-oid'

const schema = Joi.object({
    name: Joi.string().required().min(3).max(10),
    ranking:Joi.number().required().min(1).max(10),
    examples: Joi.array().required(),
    detail:Joi.string().required(),
    user_id:Joi.objectId().required(),
})

export default schema