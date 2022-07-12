const express = require('express');

// Routers
const { restaurantRouter } = require('./routes/restaurants.routes');
const { usersRouter } = require('./routes/users.routes');

// Global error controller
const { globalErrorHandler } = require('./controllers/error.controller');

// Utils
const { AppError } = require('./utils/appError.utils');

// Init express app
const app = express();

// Enable incoming JSON
app.use(express.json());

// Limit the number of requests that can be accepted to our server
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000, // 1 hr
  message: 'Number of requests have been exceeded',
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

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantRouter);

// Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = { app };