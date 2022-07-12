const express = require('express');

const restaurantRouter = express.Router();

// Cotrollers
const {
  newRestaurant,
  allRestaurant,
  restaurantById,
  updateRestaurant,
  deletRestaurant,
  newReviewRestaurant,
  updateReview,
  deleteReview,
} = require('../controllers/restaurants.controllers');

// Middlewares
const {
  restaurantExist,
} = require('../middlewares/restaurantExist.middleware');
const { reviewExist } = require('../middlewares/reviewExist.middleware');

// Endpoints
// Restaurants
restaurantRouter.get('/', allRestaurant);
restaurantRouter.get('/:id', restaurantExist, restaurantById);

restaurantRouter.post('reviews/:restaurantId', newReviewRestaurant);

// Protected endpoints
restaurantRouter.post('/', newRestaurant);
restaurantRouter.patch('/:id', restaurantExist, updateRestaurant);
restaurantRouter.delete('/:id', restaurantExist, deletRestaurant);

// Restaurants reviews
restaurantRouter.patch('reviews/:id', reviewExist, updateReview);
restaurantRouter.delete('/reviews/:id', reviewExist, deleteReview);

module.exports = { restaurantRouter };
