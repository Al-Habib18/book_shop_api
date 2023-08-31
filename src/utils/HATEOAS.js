/** @format */

const generateQueryString = require("./queryString");

const getHATEOAS = ({
    url = "/",
    path = "",
    query = {},
    hasNext = false,
    hasPrev = false,
    page = 1,
}) => {
    const links = {
        self: `/api/v1/users${url}`,
    };

    if (hasNext) {
        const queryString = generateQueryString({ ...query, page: page + 1 });
        links.next = `/api/v1/users${path}?${queryString}`;
    }

    if (hasPrev) {
        const queryString = generateQueryString({ ...query, page: page - 1 });
        links.prev = `/api/v1/users${path}?${queryString}`;
    }
    return links;
};

module.exports = getHATEOAS;
