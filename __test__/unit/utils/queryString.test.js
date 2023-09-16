/** @format */

const generateQueryString = require("../../../src/utils/queryString");

describe("generate query string", () => {
    describe("if query is provid", () => {
        test("should retrun a query string", () => {
            const query = {
                page: 1,
                limit: 10,
                sortBy: "updated_at",
            };
            const queryString = generateQueryString(query);
            expect(queryString).toBeDefined();
        });
    });
});
