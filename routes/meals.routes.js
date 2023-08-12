const express = require('express');
const router = express.Router();

const {
  createNewMeals,
  getAllMeals,
  getMealtById,
  updateMealById,
  deleteMeal,
} = require('../controllers/meals.controller');
const {
  protectToken,
  protectAdmin,
} = require('../middlewares/users.middlewares');
const {
  createMealsValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');
const { restaurantExists } = require('../middlewares/restaurants.middlewares');

router.get('/', getAllMeals);

router.post(
  '/:restaurantId',
  protectToken,
  createMealsValidations,
  checkValidations,
  restaurantExists,
  createNewMeals,
);

router
  .route('/:id')
  .get(getMealtById)
  .patch(protectToken, protectAdmin, updateMealById)
  .delete(protectToken, protectAdmin, deleteMeal);

module.exports = { mealsRouter: router };
