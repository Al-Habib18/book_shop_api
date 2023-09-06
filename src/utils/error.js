/** @format */

const notFound = (msg = "Requested resource not found") => {
    const error = new Error(msg);
    error.status = 404;
    return error;
};

const badRequest = (msg = "Bad Request") => {
    const error = new Error(msg);
    error.status = 400;
    return error;
};

const serverError = (msg = "Internal Server Error") => {
    const error = new Error(msg);
    error.status = 500;
    return error;
};
const authenticationError = (msg = "Authentication Failed") => {
    const error = new Error(msg);
    error.status = 401;
    return error;
};
const authorizationError = (
    msg = "You do not have permission to access this route"
) => {
    const error = new Error(msg);
    error.status = 401;
    return error;
};

module.exports = {
    badRequest,
    notFound,
    serverError,
    authenticationError,
    authorizationError,
};
