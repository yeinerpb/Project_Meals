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
  checkValidations,
  createOrderValidations,
} = require('../middlewares/validations.middlewares');
const router = express.Router();

router.post(
  '/',
  protectToken,
  createOrderValidations,
  checkValidations,
  createOrder
);

router.get('/me/:id', protectToken, orderExists, getOrderById);

router
  .route('/:id')
  .patch(protectToken, orderCompleted)
  .delete(protectToken, orderCancelled);

module.exports = { ordersRouter: router };
