/** @format */

const {
    generateToken,
    verifyToken,
    decodeToken,
    isExpired,
} = require("../../../src/lib/token");

describe("generateToken", () => {
    describe("if payload  and secrect is ok", () => {
        test("should generate a token", () => {
            const payload = {
                name: "habib",
                email: "user@example.com",
            };
            const secret = "secret";
            const token = generateToken({ payload, secret, expiresIn: "30d" });
            expect(token).toBeDefined();
        });
    });

    describe("if secrect is not ok", () => {
        test("should return a internal server errro", () => {
            const payload = {
                name: "habib",
                email: "user@example.com",
            };
            expect(() => generateToken({ payload })).toThrow(
                "Internal Server Error"
            );
        });
    });
});

describe("verify token", () => {
    describe("if token  and secrect is ok", () => {
        test("should decoded a object", () => {
            const token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFiaWIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTQ4NTkyNDEsImV4cCI6MTY5NzQ1MTI0MX0.uQTwWX8StM6ufbKbZ_Y112i0jG_nKjrcPBc8KvKhkPc";
            const secret = "secret";
            const decoded = verifyToken(token, secret);
            expect(decoded).toBeDefined();
            expect(decoded).toHaveProperty("email");
            expect(decoded).toHaveProperty("name");
        });
    });

    describe("if given wrong secret", () => {
        test("should return a internal server errro", () => {
            const token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFiaWIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTQ4NTY4MzUsImV4cCI6MTY5NDg1ODYzNX0.cCI8vtclopQAn_F_QQEKW4WCdn0nAgoTQ8Ujx3-M4fE";
            const secret = "wrogn_secret";
            expect(() => verifyToken(token, secret)).toThrow(
                "invalid signature"
            );
        });
    });

    describe("if token is expirde", () => {
        test("should return a  error", () => {
            const token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFiaWIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTQ4NTk0ODUsImV4cCI6MTY5NDg1OTQ4OH0.5Sdtca2SAO9AGzpCEyssBy6mIIZs-Ag7wghws8oCIY0";
            const secret = "secret";

            expect(() => {
                verifyToken(token, secret);
            }).toThrow();
        });
    });
});

describe("decode token", () => {
    describe("if token  and secrect is ok", () => {
        test("should decoded a object", () => {
            const token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFiaWIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTQ4NTY2NzMsImV4cCI6MTY5NDg1ODQ3M30.I02CcwhTR16l4JhuQ6Xqc3YspR1zqhfe9FJFfdfpLe0";
            const secret = "secret";
            const decoded = decodeToken(token, secret);
            expect(decoded).toBeDefined();
            expect(decoded).toHaveProperty("email");
            expect(decoded).toHaveProperty("name");
        });
    });

    describe("if given wrong secret", () => {
        test("should not return a error", () => {
            const token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFiaWIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTQ4NTY4MzUsImV4cCI6MTY5NDg1ODYzNX0.cCI8vtclopQAn_F_QQEKW4WCdn0nAgoTQ8Ujx3-M4fE";

            const secret = "wrong_secret";
            const decode = decodeToken(token, secret);
            expect(decode).toHaveProperty("name");
            expect(decode).toHaveProperty("email");
        });
    });
});

describe("check expiration of a token", () => {
    describe("if token is not expired", () => {
        test("should return true", () => {
            const token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFiaWIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTQ4NTY4MzUsImV4cCI6MTY5NDg1ODYzNX0.cCI8vtclopQAn_F_QQEKW4WCdn0nAgoTQ8Ujx3-M4fE";
            const isTokenExpired = isExpired(token);
            expect(isTokenExpired).toBe(true);
        });
    });
    describe("if token is  expired", () => {
        test("should return false", () => {
            const token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFiaWIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTQ4NjAzNjIsImV4cCI6MTY5NzQ1MjM2Mn0.HCq42NxVZew11MGhukn5iAU4nhV-374Y0wEi8FueIok";
            const isTokenExpired = isExpired(token);
            expect(isTokenExpired).toBe(false);
        });
    });
});
