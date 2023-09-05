/** @format */

const defaults = require("../../../../config/defaults");
const userService = require("../../../../lib/user");
const { getPagination } = require("../../../../utils/pagination");
const getHATEOAS = require("../../../../utils/HATEOAS");
const { notFound } = require("../../../../utils/error");

const allOrders = async (req, res, next) => {
    const { id } = req.params;

    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sortType || defaults.sortType;
    const sortBy = req.query.sortBy || defaults.sortBy;

    try {
        const orders = await userService.getAllOrders(id, {
            page,
            limit,
            sortType,
            sortBy,
        });

        if (orders.length < 1) {
            throw notFound();
        }
        const totalItems = orders.length;

        const pagination = getPagination({ totalItems, limit, page });

        const links = getHATEOAS({
            url: req.url,
            path: req.path,
            query: req.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page,
        });

        const response = {
            data: orders,
            pagination,
            links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = allOrders;
