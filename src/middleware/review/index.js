/** @format */

const { badRequest } = require("../../utils/error");

const reviewValidator = (req, res, next) => {
    const { ratting, summary } = req.body;
    try {
        if (ratting) {
            if (ratting < 0) throw badRequest("ratings must be in range [0,5]");
            if (ratting > 5) throw badRequest("ratings must be in range [0,5]");
        }
        if (summary) {
            if (summary.length < 3)
                throw badRequest("summary must be at least 3 characters");
            if (summary.length > 200) throw badRequest("summary is too long");
        }
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = reviewValidator;
