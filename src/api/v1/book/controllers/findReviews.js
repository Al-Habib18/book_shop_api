/** @format */

const reviewService = require("../../../../lib/review");
const { badRequest, notFound } = require("../../../../utils/error");
const { getPagination } = require("../../../../utils/pagination");
const defaults = require("../../../../config/defaults");
const getHATEOAS = require("../../../../utils/HATEOAS");

const findReviews = async (req, res, next) => {
    const { id } = req.params;
    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sortType || defaults.sortType;
    const sortBy = req.query.sortBy || defaults.sortBy;
    const search = req.query.search || defaults.search;
    try {
        if (!id) {
            throw badRequest("Id is required");
        }
        const reviews = await reviewService.findReviews(id, {
            page,
            limit,
            sortType,
            sortBy,
        });
        if (reviews.length < 1) {
            throw notFound("Review not found");
        }

        const totalItems = reviews.length;
        const pagination = await getPagination({ totalItems, limit, page });
        const links = getHATEOAS({
            url: req.url,
            path: req.path,
            query: req.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page,
        });

        const respose = {
            data: reviews,
            pagination,
            links,
        };
        res.status(200).json(respose);
    } catch (err) {
        next(err);
    }
};

module.exports = findReviews;
