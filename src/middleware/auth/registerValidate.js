/** @format */
const { badRequest } = require("../../utils/error");

const registerValidator = (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw badRequest("name , email and password required");
        }
        if (name.length < 3)
            throw badRequest("Your name must be at least 3 characters");

        if (name.length > 50)
            throw badRequest("Your name must be under 50 characters");

        const isValidEmail =
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        if (!isValidEmail) {
            throw badRequest("Invalid Email");
        }

        if (password.length < 4)
            throw badRequest("Your password must be at least 4 characters");
        if (password.length > 10)
            throw badRequest("Your password must be less than 11 characters");
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = registerValidator;
