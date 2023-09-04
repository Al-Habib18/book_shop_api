/** @format */

const orderService = require("../../../../lib/order");
const userService = require("../../../../lib/user");
const { badRequest } = require("../../../../utils/error");

const findUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const order = await orderService.findById(id);
        if (!order) {
            throw badRequest("Invalid id");
        }

        const user = await userService.findUserById(order.userId);
        const links = {
            cart: `/api/v1/carts/${order.cartId}`,
        };
        const respose = {
            data: user,
            links,
        };
        res.status(200).json(respose);
    } catch (err) {
        next(err);
    }
};

module.exports = findUser;
