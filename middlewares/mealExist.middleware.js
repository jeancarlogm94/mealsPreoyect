const { Meal } = require('../models/meal.model');
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

const mealExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({ where: { id } });

  if (!review) {
    return next(new AppError('Meal not found', 403));
  }

  req.meal = meal;

  next();
});

module.exports = { mealExist };
