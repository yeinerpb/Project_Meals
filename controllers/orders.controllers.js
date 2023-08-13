const { Meal } = require('../models/meal.model');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');


const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const createOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { mealId, quantity } = req.body;
  const meal = await Meal.findOne({ where: { id: mealId } });
  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }
  const totalPrice = (meal.price * quantity); 
  const roundedTotalPrice = Math.round(totalPrice * 100) / 100; 
  const newOrder = await Order.create({
    mealId,
    quantity,
    totalPrice: roundedTotalPrice, 
    userId: sessionUser.id,
  });
  res.status(201).json({
    status: 'Your order was successfully created',
    newOrder,
  });
});

const getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({
      where: { id: orderId },
      include: [
        {
          model: Meal,
          attributes: ['id', 'name', 'price'],
          include: [{ model: Restaurant, attributes: ['id', 'name'] }],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ status: 'fail', message: 'Order not found' });
    }

    res.status(200).json({ status: 'success', order });
  } catch (error) {
    next(error);
  }
};

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
