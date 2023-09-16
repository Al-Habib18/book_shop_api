/** @format */

const { generateHash, hasMatched } = require("../../../src/utils/hashing");

describe("generateHash", () => {
    describe("if payload and saltRoud is Ok", () => {
        test("should generate a hash", async () => {
            const payload = "pass123";
            const saltRound = 10;
            const hash = await generateHash(payload, saltRound);
            expect(hash).toBeDefined();
        });
    });

    describe("if saltRoud doesnot pass", () => {
        test("should generate a hash", async () => {
            const payload = "pass123";
            const hash = await generateHash(payload);
            expect(hash).toBeDefined();
        });
    });
});

describe("compare passwords", () => {
    describe("if raw pass and hashed is right", () => {
        test("should return true", async () => {
            const raw = "pass123";
            const hash =
                "$2a$10$BBQW2fIU7yp8bq5LmzilsOioULZQ79zH7RhTG.xObGHOTPhpOClcy";
            const isMatch = await hasMatched(raw, hash);
            expect(isMatch).toBe(true);
        });
    });

    describe("if raw pass and hashed is wrong", () => {
        test("should return false", async () => {
            const raw = "habib_18";
            const hash =
                "$2a$10$BBQW2fIU7yp8bq5LmzilsOioULZQ79zH7RhTG.xObGHOTPhpOClcy";
            const isMatch = await hasMatched(raw, hash);
            expect(isMatch).toBe(false);
        });
    });
});
