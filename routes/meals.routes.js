const express = require('express');

const router = express.Router();

const {
  createNewMeals,
  getAllMeals,
  getMealtById,
  updateMealById,
  deleteMeal,
} = require('../controllers/meals.controlleres');
const {
  protectToken,
  protectAdmin,
} = require('../middlewares/users.middlewares');
const {
  createMealsValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

router.get('/', getAllMeals);
router.post(
  '/:restaurantId',
  protectToken,
  createMealsValidations,
  checkValidations,
  createNewMeals
);

router
  .route('/:id')
  .get(getMealtById)
  .patch(protectToken, protectAdmin, updateMealById)
  .delete(protectToken, protectAdmin, deleteMeal);

module.exports = { mealsRouter: router };
