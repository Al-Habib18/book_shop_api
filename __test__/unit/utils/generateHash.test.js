/** @format */

const { generateHash } = require("../../../src/utils/hashing");

describe("generateHash", () => {
    describe("if payload and saltRoud is Ok", () => {
        test("should generate a hash", async () => {
            const payload = "habib123";
            const saltRound = 10;
            const hash = await generateHash(payload, saltRound);

            expect(hash).toBeDefined();
        });
    });
});
