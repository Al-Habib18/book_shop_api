/** @format */

const { badRequest } = require("../../utils/error");

const loginValidator = (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw badRequest("email and password required");
        }
        const isValidEmail =
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        if (!isValidEmail) {
            throw badRequest("Invalid Email");
        }

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = loginValidator;
