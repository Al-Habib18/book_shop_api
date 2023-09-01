/** @format */
const cartSercice = require("../../../../lib/cart");

const remove = async (req, res, next) => {
    const { id } = req.params;
    try {
        await cartSercice.removeItem(id);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
};

module.exports = remove;
