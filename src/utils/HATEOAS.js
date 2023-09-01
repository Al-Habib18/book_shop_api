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
        self: `${url}`,
    };

    if (hasNext) {
        const queryString = generateQueryString({ ...query, page: page + 1 });
        links.next = `${path}?${queryString}`;
    }

    if (hasPrev) {
        const queryString = generateQueryString({ ...query, page: page - 1 });
        links.prev = `${path}?${queryString}`;
    }
    return links;
};

module.exports = getHATEOAS;
