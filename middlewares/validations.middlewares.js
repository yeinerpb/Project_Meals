const { body, validationResult, param } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError');

const createUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

const createRestaurantValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('Address cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty')
    .isNumeric()
    .withMessage('Rating must be a number')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
];

module.exports = { createRestaurantValidations };


const createMealsValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price')
  .notEmpty().withMessage('Price cannot be empty')
  .isDecimal().withMessage('Price must be a valid decimal number'),
  param('restaurantId').notEmpty().withMessage('RestaurantId cannot be empty'),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    // [msg, msg, msg] -> 'msg. msg. msg'
    const errorMsg = messages.join('. ');

    return next(new AppError(errorMsg, 400));
  }

  next();
};

const createOrderValidations = [
  body('mealId').notEmpty().withMessage('MealId cannot be empty'),
  body('quantity').notEmpty().withMessage('Quantity cannot be empty'),
];


module.exports = {
  createUserValidations,
  createRestaurantValidations,
  createMealsValidations,
  checkValidations,
  createOrderValidations
};
