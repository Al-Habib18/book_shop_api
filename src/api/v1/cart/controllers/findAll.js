/** @format */

const defaults = require("../../../../config/defaults");
const cartService = require("../../../../lib/cart");
const { getPagination } = require("../../../../utils/pagination");
const getHATEOAS = require("../../../../utils/HATEOAS");
const { notFound } = require("../../../../utils/error");
const findAll = async (req, res, next) => {
    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sortType || defaults.sortType;
    const sortBy = req.query.sortBy || defaults.sortBy;

    try {
        const carts = await cartService.findAll({
            page,
            limit,
            sortType,
            sortBy,
        });
        if (!carts) {
            throw notFound();
        }

        const totalItems = await cartService.count();

        const pagination = getPagination({ totalItems, limit, page });

        const links = getHATEOAS({
            url: req.url,
            path: req.path,
            query: req.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page,
        });

        const response = { data: carts, pagination, links };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findAll;

const findAllItem = async (req, res, next) => {};
