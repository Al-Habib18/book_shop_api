/** @format */

/** - convert query object to a string
 * @param {string} object  - query will be converted to a query string
 * @returns {string} - query string
 */
const generateQueryString = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                encodeURIComponent(key) + "=" + encodeURIComponent(query[key])
        )
        .join("&");
};

module.exports = generateQueryString;
