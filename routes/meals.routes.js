const express = require('express');

const mealsRouter = express.Router();

// Middleware
const { mealExist } = require('../middlewares/mealExist.middleware');
const {
  protectSession,
  verifyUserRol,
} = require('../middlewares/auth.middleware');
const {
  restaurantExist,
} = require('../middlewares/restaurantExist.middleware');

const {
  createMeal,
  allMeals,
  mealsById,
  updateMeal,
  deletMeal,
} = require('../controllers/meals.controller');

// Include rest info
mealsRouter.get('/', allMeals);
mealsRouter.get('/:id', mealExist, mealsById);

// Protected End Points

mealsRouter.use(protectSession);
mealsRouter.post('/:id', restaurantExist, createMeal);
mealsRouter.patch('/:id', mealExist, verifyUserRol, updateMeal);
mealsRouter.delete('/:id', mealExist, verifyUserRol, deletMeal);

module.exports = { mealsRouter };
