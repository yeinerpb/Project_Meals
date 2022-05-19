const dotenv = require('dotenv');

// Models
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');
// Utils
const { catchAsync } = require('../utils/catchAsync');

dotenv.config({ path: './config.env' });

const createNewMeals = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { restaurantId } = req.params;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId,
  });
  res.status(201).json({ newMeal });
});

const getAllMeals = catchAsync(async (req, res, next) => {
  const meal = await Meal.findAll({
    where: { status: 'active' },
    include: [{ model: Restaurant }],
  });
  res.status(200).json({ meal });
});

const getMealtById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: { id, status: 'active' },
    include: [{ model: Restaurant }],
  });

  res.status(200).json({ meal });
});

const updateMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const meal = await Meal.findOne({ where: { id } });

  await meal.update({ name, price });

  res.status(200).json({ status: 'success' });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({ where: { id } });

  await meal.update({ status: 'disable' });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  createNewMeals,
  getAllMeals,
  getMealtById,
  updateMealById,
  deleteMeal,
};
