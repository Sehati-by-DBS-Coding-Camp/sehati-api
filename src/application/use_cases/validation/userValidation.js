const Joi = require('joi');

const pattern = '^[a-zA-Z0-9]{6,15}$';

exports.registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(25)
    .required()
    .messages({
      'string.min': 'Nama minimal harus {#limit} karakter.',
      'string.max': 'Nama maksimal {#limit} karakter.',
      'string.empty': 'Nama tidak boleh kosong.',
      'any.required': 'Nama wajib diisi.',
    }),
  email: Joi.string()
    .email({ tlds: { allow: ['com', 'net', 'id', 'org'] } })
    .required()
    .messages({
      'string.email': 'Email harus format email yang valid.',
      'string.empty': 'Email tidak boleh kosong.',
      'any.required': 'Email wajib diisi.',
    }),
  password: Joi.string()
    .pattern(new RegExp(pattern))
    .required()
    .messages({
      'string.pattern.base': 'Password harus terdiri dari 6-15 karakter (huruf, angka, atau simbol).',
      'string.empty': 'Password tidak boleh kosong.',
      'any.required': 'Password wajib diisi.',
    }),
  gender: Joi.string()
    .valid('male', 'female')
    .required()
    .messages({
      'any.only': 'Gender harus salah satu dari: male atau female.',
      'string.empty': 'Gender tidak boleh kosong.',
      'any.required': 'Gender wajib diisi.',
    }),
  birth: Joi.date()
    .iso() // Memastikan format tanggal ISO 8601 (YYYY-MM-DD)
    .max('now') // Tanggal lahir tidak boleh di masa depan
    .required()
    .messages({
      'date.format': 'Tanggal lahir harus dalam format YYYY-MM-DD.',
      'date.max': 'Tanggal lahir tidak boleh di masa depan.',
      'any.required': 'Tanggal lahir wajib diisi.',
    }),
}).options({ abortEarly: false });

exports.loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ['com', 'net', 'id', 'org'] } })
    .required()
    .messages({
      'string.email': 'Email harus format email yang valid.',
      'string.empty': 'Email tidak boleh kosong.',
      'any.required': 'Email wajib diisi.',
    }),
  password: Joi.string()
    .pattern(new RegExp(pattern))
    .required()
    .messages({
      'string.pattern.base': 'Password harus terdiri dari 6-15 karakter (huruf, angka, atau simbol).',
      'string.empty': 'Password tidak boleh kosong.',
      'any.required': 'Password wajib diisi.',
    }),
}).options({ abortEarly: false });

exports.updateUserSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(25)
    .required()
    .messages({
      'string.min': 'Nama minimal harus {#limit} karakter.',
      'string.max': 'Nama maksimal {#limit} karakter.',
      'string.empty': 'Nama tidak boleh kosong.',
      'any.required': 'Nama wajib diisi.',
    }),
  email: Joi.string()
    .email({ tlds: { allow: ['com', 'net', 'id', 'org'] } })
    .required()
    .messages({
      'string.email': 'Email harus format email yang valid.',
      'string.empty': 'Email tidak boleh kosong.',
      'any.required': 'Email wajib diisi.',
    }),
  gender: Joi.string()
    .valid('male', 'female')
    .required()
    .messages({
      'any.only': 'Gender harus salah satu dari: male atau female.',
      'string.empty': 'Gender tidak boleh kosong.',
      'any.required': 'Gender wajib diisi.',
    }),
  birth: Joi.date()
    .iso() // Memastikan format tanggal ISO 8601 (YYYY-MM-DD)
    .max('now') // Tanggal lahir tidak boleh di masa depan
    .required()
    .messages({
      'date.format': 'Tanggal lahir harus dalam format YYYY-MM-DD.',
      'date.max': 'Tanggal lahir tidak boleh di masa depan.',
      'any.required': 'Tanggal lahir wajib diisi.',
    }),
}).options({ abortEarly: false });
