/** @format */

const { getPagination } = require("../../../src/utils/pagination");

describe("getPagination function test", () => {
    describe("if all things are ok", () => {
        test("should return a paginton object with prev and next", () => {
            const totalItems = 30;
            const limit = 10;
            const page = 2;

            const pagination = getPagination({ totalItems, limit, page });
            expect(pagination).toHaveProperty("next");
            expect(pagination).toHaveProperty("prev");
            expect(pagination).toMatchObject({
                page,
                limit,
                totalItems,
                totalPage: 3,
                next: 3,
                prev: 1,
            });
        });
    });

    describe("if all things are not ok", () => {
        test("should return a paginton object with prev and without next", () => {
            const totalItems = 20;
            const limit = 10;
            const page = 2;

            const pagination = getPagination({ totalItems, limit, page });
            expect(pagination).not.toHaveProperty("next");
            expect(pagination).toHaveProperty("prev");
            expect(pagination).toMatchObject({
                page,
                limit,
                totalItems,
                totalPage: 2,
                prev: 1,
            });
        });
    });

    describe("if all things are not ok", () => {
        test("should return a paginton object with next and without prev", () => {
            const totalItems = 20;
            const limit = 10;
            const page = 1;

            const pagination = getPagination({ totalItems, limit, page });
            expect(pagination).not.toHaveProperty("prev");
            expect(pagination).toHaveProperty("next");
            expect(pagination).toMatchObject({
                page,
                limit,
                totalItems,
                totalPage: 2,
                next: 2,
            });
        });
    });
});
