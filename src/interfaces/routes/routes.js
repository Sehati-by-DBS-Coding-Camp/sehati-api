const HelloController = require('../controllers/HelloController');
const { registerSchema, loginSchema, updateUserSchema } = require('../../application/use_cases/validation/userValidation');
const userAuthorization = require('../../application/use_cases/validation/userAuthorization');
const validationErrorHandler = require('../utils/validationErrorHandler');
// const RegisterController = require('../controllers/RegisterController');
const NewsController = require('../controllers/NewsController');

const routes = (controller) => [
  {
    method: 'GET',
    path: '/',
    handler: HelloController.sayHelloWorld,
    options: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/register',
    handler: controller.register.bind(controller),
    options: {
      auth: false,
      validate: {
        // Skema validasi untuk payload (request body)
        payload: registerSchema,
        failAction: validationErrorHandler,
      },
    },
  },
  {
    method: 'POST',
    path: '/login',
    handler: controller.login.bind(controller),
    options: {
      auth: false,
      validate: {
        payload: loginSchema,
        failAction: validationErrorHandler,
      },
    },
  },
  {
    method: 'GET',
    path: '/users/{userId}',
    options: {
      pre: [
        {
          method: userAuthorization, // Middleware untuk otorisasi
        },
      ],
    },
    handler: controller.profile.bind(controller),
  },
  {
    method: 'PUT',
    path: '/users/{userId}',
    options: {
      validate: {
        payload: updateUserSchema,
        failAction: validationErrorHandler,
      },
      pre: [
        {
          method: userAuthorization, // Middleware untuk otorisasi
        },
      ],
    },
    handler: controller.updateUserProfile.bind(controller),
  },
  {
    method: 'GET',
    path: '/news',
    options: {
      auth: false, // Tidak memerlukan otentikasi untuk endpoint ini
    },
    handler: NewsController.news,
  },
];

module.exports = routes;
