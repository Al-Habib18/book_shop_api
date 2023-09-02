/** @format */
/** @format */
const cartService = require("../../../../lib/cart");
const bookService = require("../../../../lib/book");
const userService = require("../../../../lib/user");

const { notFound } = require("../../../../utils/error");

const findSingle = async (req, res, next) => {
    const { id } = req.params;
    try {
        const cart = await cartService.findById(id);
        if (!cart) {
            throw notFound();
        }
        // TODO: uncomment this
        // const userObj = await userService.findUserById(review.userId)

        const data = {
            ...cart._doc,
            //TODO: user: userObj.name,
        };
        const links = {
            //TODO: user: `/api/v1/users/${userObj.id}`,
        };
        const response = {
            data,
            links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findSingle;
