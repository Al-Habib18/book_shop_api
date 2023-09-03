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

        const links = {
            user: `/api/v1/users/${cart.userId}`,
        };
        const response = {
            data: cart,
            links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findSingle;
