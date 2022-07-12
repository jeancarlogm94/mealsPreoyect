const { Restaurant } = require('../models/restaurant.model');
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

const restaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ where: { id } });

  if (!restaurant) {
    return next(new AppError('Restaurant not found', 403));
  }

  req.restaurant = restaurant;

  next();
});

module.exports = { restaurantExist };
