/** @format */
const userService = require("../../../../lib/user");
const reviewService = require("../../../../lib/review");
const { notFound } = require("../../../../utils/error");

const findUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const review = await reviewService.findReviewById(id);
        if (!review) {
            throw notFound();
        }
        // TODO: there in no userId in review
        const book = await userService.findUserById(review.userId);
        if (!book) {
            throw notFound();
        }

        const links = {
            book: `api/v1/reviews/${id}/book `,
        };

        const response = {
            data: book,
            links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findUser;
