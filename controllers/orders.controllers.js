const { Meal } = require('../models/meal.model');
const { Order } = require('../models/order.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const createOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { mealId, quantity } = req.body;
  const meal = await Meal.findOne({ where: { id: mealId } });
  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }
  const totalPrice = meal.price * quantity;
  const newOrder = await Order.create({
    mealId,
    quantity,
    totalPrice,
    userId: sessionUser.id,
  });
  res.status(201).json({
    status: 'Your order was successfully created',
    newOrder,
  });
});
const getOrderById = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  // Get order
  const order = await Order.findOne({
    where: {
      userId: user.id,
      id,
    },
    include: [
      {
        model: Meal,
        attributes: ['id', 'name', 'price'],
        include: [{ model: Restaurant, attributes: ['id', 'name'] }],
      },
    ],
  });
});
const orderCompleted = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: { id, status: 'active' },
  });
  await order.update({ status: 'completed' });
  res.status(200).json({ status: 'success' });
});

const orderCancelled = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: { id, status: 'active' },
  });
  await order.update({ status: 'cancelled' });
  res.status(200).json({ status: 'success' });
});
module.exports = {
  createOrder,
  getOrderById,
  orderCompleted,
  orderCancelled,
};
