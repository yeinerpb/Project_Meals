const express = require('express');
const {
  createOrder,
  getOrderById,
  orderCompleted,
  orderCancelled,
} = require('../controllers/orders.controllers');

const { orderExists } = require('../middlewares/orders.middlewares');
const {
  protectToken,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');
const {
  createMealsValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');
const router = express.Router();

router.post(
  '/',
  protectToken,
  createMealsValidations,
  checkValidations,
  createOrder
);

router.get('/me', protectToken, orderExists, getOrderById);

router
  .route('/:id')
  .patch(protectToken, orderCompleted)
  .delete(protectToken, orderCancelled);

module.exports = { ordersRouter: router };
