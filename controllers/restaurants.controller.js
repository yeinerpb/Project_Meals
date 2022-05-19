const dotenv = require('dotenv');

//Models
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');

dotenv.config({ path: './config.env' });

const createNewRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });
  res.status(201).json({ newRestaurant });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findAll({ where: { status: 'active' } });
  res.status(200).json({ restaurant });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ where: { id } });

  res.status(200).json({ restaurant });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, address } = req.body;

  const restaurant = await Restaurant.findOne({ where: { id } });

  await restaurant.update({ name, address });

  res.status(200).json({ status: 'Success' });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ where: { id } });

  await restaurant.update({ status: 'disable' });

  res.status(200).json({
    status: 'success',
  });
});

const reviewRestaurant = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const restaurantId = req.params.id;
  const userId = req.sessionUser.id;
  const review = new Review({ userId, comment, rating, restaurantId });
  await review.save();
  res.status(201).json({ status: 'success' });
});

//Update revieew

//Delete review

module.exports = {
  createNewRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  reviewRestaurant,
};
