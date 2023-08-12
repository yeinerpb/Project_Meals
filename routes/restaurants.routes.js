const express = require('express');

const {
  createNewRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  reviewRestaurant,
  updateReview,
  deleteReview,
} = require('../controllers/restaurants.controller');
const {
  protectToken,
  protectAdmin,
} = require('../middlewares/users.middlewares');
const {
  createRestaurantValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');
const { restaurantExists } = require('../middlewares/restaurants.middlewares');
const router = express.Router();

router
  .route('/')
  .post(
    protectToken,
    createRestaurantValidations,
    checkValidations,
    createNewRestaurant
  )
  .get(getAllRestaurants);

router
  .route('/:id')
  .get(getRestaurantById)
  .patch(protectToken, protectAdmin, updateRestaurant)
  .delete(protectToken, protectAdmin, deleteRestaurant);

router
  .route('/reviews/:id')
  .post(protectToken,  reviewRestaurant)
  .patch(protectToken,  updateReview)
  .delete(protectToken,  deleteReview);

module.exports = { restaurantsRouter: router };
