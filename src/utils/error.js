/** @format */

const notFound = (msg = "Resource not found") => {
    const error = new Error(msg);
    error.status = 404;
    return error;
};

const BadRequest = (msg = "Bad Request") => {
    const error = new Error(msg);
    error.status = 400;
    return error;
};

const serverError = (msg = "Internal Server Error") => {
    const error = new Error(msg);
    error.status = 500;
    return error;
};

module.exports = { BadRequest, notFound, serverError };
