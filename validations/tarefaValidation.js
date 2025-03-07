const Joi = require("joi");

const tarefaSchema = Joi.object({
    titulo: Joi.string().min(3).required().messages({
        "string.base": `"titulo" deve ser uma string`,
        "string.empty": `"titulo" não pode estar vazio`,
        "string.min": `"titulo" deve ter no mínimo 3 caracteres`,
        "any.required": `"titulo" é um campo obrigatório`
    }),
    concluida: Joi.boolean().optional()
});

module.exports = { tarefaSchema };
