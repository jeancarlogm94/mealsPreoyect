const initModels = () => {
  const { Meal } = require('./meal.model');
  const { Order } = require('./order.model');
  const { Restaurant } = require('./restaurant.model');
  const { Review } = require('./review.model');
  const { User } = require('./user.model');

  //1Res---M Review
  Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
  Review.belongsTo(Restaurant);

  //1Res--M Meal
  Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
  Meal.belongsTo(Restaurant);

  //1 User --M Review
  User.hasMany(Review, { foreignKey: 'userId' });
  Review.belongsTo(User);

  //1 user -- M orders
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User);

  //1 meal -- 1 orders
  Meal.hasOne(Order, { foreignKey: 'mealId' });
  Order.belongsTo(Meal);
};

module.exports = { initModels };
