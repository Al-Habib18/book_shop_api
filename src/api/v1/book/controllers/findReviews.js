/** @format */

const reviewService = require("../../../../lib/review");
const bookService = require("../../../../lib/book");
const { badRequest, notFound } = require("../../../../utils/error");
const { getPagination } = require("../../../../utils/pagination");
const defaults = require("../../../../config/defaults");
const getHATEOAS = require("../../../../utils/HATEOAS");

const findByBookId = async (req, res, next) => {
    const { id } = req.params;
    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sortType || defaults.sortType;
    const sortBy = req.query.sortBy || defaults.sortBy;
    //TODO: const search = req.query.search || defaults.search;
    try {
        if (!id) {
            throw badRequest("Id is required");
        }
        const book = await bookService.findBookById(id);
        if (!book) {
            throw badRequest("Book does not exist");
        }
        const reviews = await reviewService.findByBookId(id, {
            page,
            limit,
            sortType,
            sortBy,
        });
        if (reviews.length < 1) {
            throw notFound("There are no reviews");
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

module.exports = findByBookId;
