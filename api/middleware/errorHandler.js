exports.errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const success = false;
    const message = err.message || 'Server error';
    console.error(err);
    // Send the error response to the client
    res.status(statusCode).json({ success, statusCode, message });
  };