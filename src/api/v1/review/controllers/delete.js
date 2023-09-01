/** @format */
const reviewService = require("../../../../lib/review");

const remove = async (req, res, next) => {
    const { id } = req.params;
    try {
        await reviewService.removeItem(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

module.exports = remove;
