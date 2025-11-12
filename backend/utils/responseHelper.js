// backend/utils/responseHelper.js
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const errorResponse = (res, message = 'Error', statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message
  });
};

const validationError = (res, errors) => {
  res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors
  });
};

module.exports = {
  successResponse,
  errorResponse,
  validationError
};