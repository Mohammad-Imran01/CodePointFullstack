/**
 * Universal error handler middleware for Express.js
 * Sends JSON error responses with status code and message.
 */
function errorHandler(err, req, res, next) {
    // Default to 500 Internal Server Error if status not set
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Optionally log the error stack in development
    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
    }

    res.status(status).json({
        error: {
            message,
            // Optionally include stack trace in non-production
            ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
        },
    });
}

module.exports = errorHandler;