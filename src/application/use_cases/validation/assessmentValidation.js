const Joi = require('joi');

const newAssessmentSchema = Joi.object({
  D: Joi.array()
    .items(Joi.number().integer().min(0).max(3))
    .length(7)
    .required()
    .messages({
      'array.base': 'D harus berupa array.',
      'array.length': 'D harus berisi tepat 7 elemen.',
      'any.required': 'D wajib diisi.',
      'number.base': 'Setiap nilai D harus berupa angka.',
      'number.min': 'Nilai D minimal 0.',
      'number.max': 'Nilai D maksimal 3.',
    }),
  A: Joi.array()
    .items(Joi.number().integer().min(0).max(3))
    .length(7)
    .required()
    .messages({
      'array.base': 'A harus berupa array.',
      'array.length': 'A harus berisi tepat 7 elemen.',
      'any.required': 'A wajib diisi.',
      'number.base': 'Setiap nilai A harus berupa angka.',
      'number.min': 'Nilai A minimal 0.',
      'number.max': 'Nilai A maksimal 3.',
    }),
  S: Joi.array()
    .items(Joi.number().integer().min(0).max(3))
    .length(7)
    .required()
    .messages({
      'array.base': 'S harus berupa array.',
      'array.length': 'S harus berisi tepat 7 elemen.',
      'any.required': 'S wajib diisi.',
      'number.base': 'Setiap nilai S harus berupa angka.',
      'number.min': 'Nilai S minimal 0.',
      'number.max': 'Nilai S maksimal 3.',
    }),
  keluhanTambahan: Joi.string()
    .required()
    .messages({
      'string.base': 'Keluhan tambahan harus berupa string.',
      'any.required': 'Keluhan tambahan wajib diisi.',
    }),
}).options({ abortEarly: false });

module.exports = newAssessmentSchema;
