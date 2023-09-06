/** @format */

const { badRequest } = require("../../utils/error");

const userValidator = (req, _res, next) => {
    const { name, email, password, account } = req.body;
    try {
        if (name) {
            if (name.length < 3)
                next(badRequest("Name must be at least 3 characters"));
            if (name.length > 50)
                next(badRequest("Name must be at less than 50 characters"));
        }

        if (email) {
            const isValidEmail =
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (!isValidEmail) {
                next(badRequest("Invalid Email"));
            }
        }
        if (password) {
            if (password.length < 4)
                next(badRequest("Your password must be at least 4 characters"));
            if (password.length > 10)
                next(
                    badRequest("Your password must be less than 11 characters")
                );
        }

        if (account) {
            if (account.length < 11)
                next(badRequest("Your account must be  11 characters"));
            if (account.length > 11)
                next(badRequest("Your account must be  11 characters"));
        }

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = userValidator;