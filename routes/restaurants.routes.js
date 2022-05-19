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
  protectAccountOwner,
} = require('../middlewares/users.middlewares');
const {
  createRestaurantValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');
const router = express.Router();
router.post('/reviews/:id', reviewRestaurant);
router
  .route('/')
  .post(
    protectToken,
    createRestaurantValidations,
    checkValidations,
    createNewRestaurant
  )
  .get(getAllRestaurants); //

router
  .route('/:id')
  .get(getRestaurantById) //
  .patch(protectToken, protectAdmin, updateRestaurant)
  .delete(protectToken, protectAdmin, deleteRestaurant);

router
  .route('/reviews/:id')
  .post(protectToken, reviewRestaurant)

  .patch(protectToken, protectAccountOwner, updateReview)
  .delete(protectToken, protectAccountOwner, deleteReview);

module.exports = { restaurantsRouter: router };
