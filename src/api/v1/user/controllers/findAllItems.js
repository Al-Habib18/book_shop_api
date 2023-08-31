/** @format */

const defaults = require("../../../../config/defaults");
const userService = require("../../../../lib/user");
const { getPagination } = require("../../../../utils/pagination");
const getHATEOAS = require("../../../../utils/HATEOAS");
const { notFound } = require("../../../../utils/error");

const findAllItems = async (req, res, next) => {
    const page = req.query.page || defaults.page;

    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sortType || defaults.sortType;
    const sortBy = req.query.sortBy || defaults.sortBy;
    const search = req.query.search || defaults.search;

    try {
        const users = await userService.findAll({
            page,
            limit,
            sortType,
            sortBy,
            search,
        });
        if (!users) {
            throw notFound();
        }
        const totalItems = await userService.count({ search });

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
            data: users,
            pagination,
            links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findAllItems;
