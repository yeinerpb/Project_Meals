const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// require('crypto').randomBytes(64).toString('hex')

// Models
const { User } = require('../models/user.model');
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model')

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');


dotenv.config({ path: './config.env' });

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    role
  });

  // Remove password from response
  newUser.password = undefined;

  res.status(201).json({ newUser });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate that user exists with given email
  const user = await User.findOne({
    where: { email, status: 'active' },
  });

  // Compare password with db
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid credentials', 400));
  }

  // Generate JWT
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({ token, user });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  await user.update({ name, email });

  res.status(200).json({ status: 'Success' });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    user,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  await user.update({ status: 'disable' });

  res.status(200).json({
    status: 'success',
  });
});

const getAllOrdersByUser = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    include: [{ model: Order }],
  });
  res.status(200).json({ users });
});
const getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: { id },
    include: [{ model: Meal }],
  });
  res.status(200).json({ order });
});

const checkToken = catchAsync(async (req, res, next) => {
  res.status(200).json({ user: req.sessionUser });
});

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllOrdersByUser,
  getOrderById,
  login,
  checkToken,
};

