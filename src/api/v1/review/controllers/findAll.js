/** @format */

const defaults = require("../../../../config/defaults");
const reviewService = require("../../../../lib/review");
const { getPagination } = require("../../../../utils/pagination");
const getHATEOAS = require("../../../../utils/HATEOAS");
const { notFound } = require("../../../../utils/error");

const findAllItem = async (req, res, next) => {
    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sortType || defaults.sortType;
    const sortBy = req.query.sortBy || defaults.sortBy;
    const search = req.query.search || defaults.search;
    try {
        const reviews = await reviewService.findAll({
            page,
            limit,
            sortType,
            sortBy,
            search,
        });
        if (reviews.length < 1) {
            throw notFound();
        }

        const totalItems = await reviewService.count({ search });

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
            data: reviews,
            pagination,
            links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findAllItem;
