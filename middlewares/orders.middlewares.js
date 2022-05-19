// Models
const { Order } = require('../models/order.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');



const orderExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: { id, status: 'active' },
    
  });

  if (!user) {
    return next(new AppError('Order does not exist with given Id', 404));
  }

  // Add user data to the req object
  req.order = order;
  next();
});

module.exports = {
  orderExists,
};
