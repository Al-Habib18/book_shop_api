/** @format */

const { generateToken } = require("../../../src/lib/token");

describe("generateToken", () => {
    describe("if payload  and secrect is ok", () => {
        test("should generate a token", () => {
            const payload = {
                name: "habib",
                email: "user@example.com",
            };
            const secret = "secret";
            const token = generateToken({ payload, secret });

            expect(token).toBeDefined();
        });
    });

    describe("if secrect is not ok", () => {
        test("should return a internal server errro", () => {
            const payload = {
                name: "habib",
                email: "user@example.com",
            };
            // const secret = "secret";
            expect(() => generateToken({ payload })).toThrow(
                "Internal Server Error"
            );
        });
    });
});
