/** @format */

/**
 * @param {string} msg Message
 * @returns {error}
 */
const notFound = (msg = "Requested resource not found") => {
    const error = new Error(msg);
    error.status = 404;
    return error;
};

/**
 * @param {string} msg Message
 * @returns {error}
 */
const badRequest = (msg = "Bad Request") => {
    const error = new Error(msg);
    error.status = 400;
    return error;
};

/**
 * @param {string} msg Message
 * @returns {error}
 */
const serverError = (msg = "Internal Server Error") => {
    const error = new Error(msg);
    error.status = 500;
    return error;
};

/**
 * @param {string} msg Message
 * @returns {error}
 */
const authenticationError = (msg = "Authentication Failed") => {
    const error = new Error(msg);
    error.status = 401;
    return error;
};

/**
 * @param {string} msg Message
 * @returns {error}
 */
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
