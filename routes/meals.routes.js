const express = require('express');

const mealsRouter = express.Router();

// Cotrollers
const {
  createMeal,
  allMeals,
  mealsById,
  updateMeal,
  deletMeal,
} = require('../controllers/meals.controllers');

// Middlewares
const { mealExist } = require('../middlewares/mealExist.middleware');

// Endpoints
mealsRouter.get('/', allMeals);
mealsRouter.get('/:id', mealsById);

//protected End Points
mealsRouter.post('/:id', createMeal);
mealsRouter.patch('/:id', updateMeal);
mealsRouter.delete('/:id', deletMeal);

module.exports = { mealsRouter };
