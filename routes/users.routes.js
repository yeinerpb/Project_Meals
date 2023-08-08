const express = require('express');

const {
  protectToken,
  protectAccountOwner,
  userExists,
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
  .patch(protectToken, userExists, protectAccountOwner, updateUser)
  .delete(protectToken, userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
