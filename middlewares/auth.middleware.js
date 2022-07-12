const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//models
const { User } = require('../models/user.model');

//utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

dotenv.config({ path: './config.env' });

const protectSession = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Invalid session', 403));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await Users.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return next(new AppError('The owner of this token its not active', 403));
  }

  req.sessionUser = user;
  next();
});

const verifyUserAccount = (req, res, next) => {
  const { sessionUser, user } = req;

  if (sessionUser.id !== user.id) {
    return next(new AppError('You do not own this account', 403));
  }

  next();
};

module.exports = { protectSession, verifyUserAccount };
