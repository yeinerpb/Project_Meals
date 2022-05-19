const express = require('express');

const {
  protectToken,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');

const {
  createUser,
  login,
  updateUser,
  deleteUser,
  getAllOrdersByUser,
  getOrderById,
} = require('../controllers/users.controller');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

const router = express.Router();
router.post('/signup', createUserValidations, checkValidations, createUser);

router.post('/login', login);

router.get('/orders', protectToken, getAllOrdersByUser);

router.get('/orders/:id', protectToken, getOrderById);

router
  .route('/:id')
  .patch(protectToken, protectAccountOwner, updateUser)
  .delete(protectToken, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
