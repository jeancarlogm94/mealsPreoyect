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
  createMealsValidators,
} = require('../middlewares/validation.middleware');

const {
  createMeal,
  allMeals,
  mealsById,
  updateMeal,
  deletMeal,
} = require('../controllers/meals.controller');

// Endpoints
mealsRouter.get('/', allMeals);
mealsRouter.get('/:id', mealExist, mealsById);

// Protected End Points

mealsRouter.use(protectSession);
mealsRouter.post('/:id', createMealsValidators, restaurantExist, createMeal);
mealsRouter.patch('/:id', mealExist, verifyUserRol, updateMeal);
mealsRouter.delete('/:id', mealExist, verifyUserRol, deletMeal);

module.exports = { mealsRouter };
