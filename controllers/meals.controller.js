// odel
const { Meal } = require('../models/meal.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.utils');

const createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;

  const newMeal = await Meal.create({
    name,
    price,
  });

  res.status(201).json({
    status: 'success',
    newMeal,
  });
});

const allMeals = catchAsync(async (req, res, next) => {
  const data = await Meal.findAll({ where: { status: 'active' } });

  res.status(200).json({
    data,
  });
});

const mealsById = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(200).json({
    status: 'success',
    meal,
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({
    name,
    price,
  });

  res.status(204).json({});
});

const deletMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({
    status: 'deleted',
  });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  createMeal,
  allMeals,
  mealsById,
  updateMeal,
  deletMeal,
};
