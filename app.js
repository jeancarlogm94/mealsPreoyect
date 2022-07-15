const express = require('express');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

// Routers
const { restaurantRouter } = require('./routes/restaurants.routes');
const { usersRouter } = require('./routes/users.routes');
const { mealsRouter } = require('./routes/meals.routes');
const { ordersRouter } = require('./routes/orders.routes');

// Global error controller
const { globalErrorHandler } = require('./controllers/error.controllers');

//Utils
const { AppError } = require('./utils/appError.utils.js');

// Init app
const app = express();

app.use(express.json());

// Limiter
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Number of request have been exceded',
});

app.use(limiter);

// Add security headers
app.use(helmet());

// Compress responses
app.use(compression());

// Log incoming request
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

// Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

// GobalErrorHandler
app.use(globalErrorHandler);

module.exports = { app };
