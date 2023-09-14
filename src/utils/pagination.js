/** @format */

const defaults = require("../config/defaults");

/** - get a pagination object
 * @param {number} totalItems
 * @param {number} page - current page number,
 * @param {number} limit- limit of result
 * @return {object} pagination object
 */
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
