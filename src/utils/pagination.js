/** @format */

const defaults = require("../config/defaults");

const getPagination = ({
    totalItems = defaults.totalItems,
    limit = defaults.limit,
    page = defaults.page,
}) => {
    const totalPage = Math.ceil(totalItems / limit);
    const pagination = {
        page,
        limit,
        totalItems,
        totalPage,
    };

    if (page < totalPage) {
        pagination.next = page + 1;
    }

    if (page > 1) {
        pagination.prev = page - 1;
    }

    return pagination;
};

module.exports = { getPagination };
