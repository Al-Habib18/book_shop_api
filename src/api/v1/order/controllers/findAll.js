/** @format */
/** @format */

const defaults = require("../../../../config/defaults");
const orderService = require("../../../../lib/order");
const { getPagination } = require("../../../../utils/pagination");
const getHATEOAS = require("../../../../utils/HATEOAS");
const { notFound } = require("../../../../utils/error");
const findAll = async (req, res, next) => {
    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sortType || defaults.sortType;
    const sortBy = req.query.sortBy || defaults.sortBy;

    try {
        const orders = await orderService.findAll({
            page,
            limit,
            sortType,
            sortBy,
        });
        if (!orders) {
            throw notFound();
        }

        const totalItems = await orderService.count();

        const pagination = getPagination({ totalItems, limit, page });

        const links = getHATEOAS({
            url: req.url,
            path: req.path,
            query: req.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page,
        });

        const response = { data: orders, pagination, links };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findAll;
