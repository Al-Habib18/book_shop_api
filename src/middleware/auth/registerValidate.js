/** @format */
const { badRequest } = require("../../utils/error");

const registerValidator = (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw badRequest("name , email and password required");
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

module.exports = registerValidator;
