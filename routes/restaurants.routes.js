const express = require('express');

const restaurantRouter = express.Router();

// Middleware
const {
  restaurantExist,
} = require('../middlewares/restaurantExist.middleware');
const { reviewExist } = require('../middlewares/reviewExist.middleware');
const {
  protectSession,
  verifyUserRol,
  verifyUserAccount,
  verifySameSession,
} = require('../middlewares/auth.middleware');

// Constrollers
const {
  newRestaurant,
  allRestaurant,
  restaurantById,
  updateRestaurant,
  deletRestaurant,
  newReviewRestaurant,
  updateReview,
  deleteReview,
} = require('../controllers/restaurants.controller');
const { userExist } = require('../middlewares/userExist.middleware');

// Endpoints
// Restaurants
restaurantRouter.get('/', allRestaurant);
restaurantRouter.get('/:id', restaurantExist, restaurantById);

// Protected End points

restaurantRouter.use(protectSession);

restaurantRouter.post('/', newRestaurant);

// Restaurants reviews
restaurantRouter.post('/reviews/:restaurantId', newReviewRestaurant);
restaurantRouter.patch(
  '/reviews/:id',
  reviewExist,
  verifySameSession,
  updateReview
);
restaurantRouter.delete(
  '/reviews/:id',
  reviewExist,
  verifySameSession,
  deleteReview
);

// Restaurant functions
restaurantRouter
  .use('/:id', restaurantExist)
  .route('/:id')
  .patch(verifyUserRol, updateRestaurant)
  .delete(verifyUserRol, deletRestaurant);

module.exports = { restaurantRouter };
