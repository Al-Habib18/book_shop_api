/** @format */

const mongoose = require("mongoose");
const User = require("../../../../src/model/User");
const Refresh = require("../../../../src/model/Refresh");
const {
    register,
    login,
    createAccessToken,
    createRefreshToken,
    verifyRefreshToken,
    removeRefreshToken,
    isExpiredToken,
    findRefreshToken,
} = require("../../../../src/lib/auth");

const uri = "mongodb://localhost:27017/test_DB";
beforeAll(async () => {
    await mongoose.connect(uri);
    await User.deleteMany({});
    // await Refresh.deleteMany({});
});

afterAll(async () => {
    mongoose.connection.close();
});

const name = "Al-habib";
const email = "habib18@gmail.com";
const password = "pass123";
const secret = "secret";
let refresh_token = "";

describe("register a user", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("if proper value is inputed", () => {
        test("should be return a user", async () => {
            const user = await register({ name, email, password });
            expect(user).toHaveProperty("name");
            expect(user).toHaveProperty("email", "habib18@gmail.com");
        });
    });

    describe("if input value is missing", () => {
        test("should throw badRequest error", async () => {
            await expect(register({})).rejects.toThrow("Bad Request");
        });
    });
    describe("if user already exists", () => {
        test("should throw badRequest error ", async () => {
            const userData = {
                name: "habib",
                email: "habib18@gmail.com",
                password: "pass123",
                account: "01313306145",
            };
            await expect(register(userData)).rejects.toThrow(
                "User already exists"
            );
        });
    });
});

describe("login ", () => {
    describe("if email or password is missing", () => {
        test("should throw badRequest error", async () => {
            await expect(login({})).rejects.toThrow("Bad Request");
        });
    });

    describe("if user does not exist", () => {
        test("should throw badRequest error", async () => {
            const email = "demo@gmail.com";
            await expect(login({ email, password })).rejects.toThrow();
        });
    });
    describe("if password does not match", () => {
        test("should throw badRequest error", async () => {
            const password = "pass321";
            await expect(login({ email, password })).rejects.toThrow();
        });
    });
    describe("if email and password is valid", () => {
        test("should return a access Token", async () => {
            const secret = "my-secret";
            const accessToken = await login({ email, password, secret });
            expect(accessToken).toBeDefined();
            expect(accessToken).not.toBeNull();
        });
    });
});

describe("create a new Access Token", () => {
    describe("if user does not exist", () => {
        test("should throw badRequest error", async () => {
            const email = "demo@gmail.com";
            await expect(login({ email, password })).rejects.toThrow();
        });
    });

    describe("if user exist", () => {
        test("should return a Access Token", async () => {
            const accessToken = await createAccessToken({ email, secret });
            expect(accessToken).toBeDefined();
            expect(accessToken).not.toBeNull();
        });
    });
});

describe("create a new refesh Token", () => {
    describe("if user does not exist", () => {
        test("should throw badRequest error", async () => {
            const email = "demo@gmail.com";
            await expect(
                createRefreshToken({ email, password })
            ).rejects.toThrow();
        });
    });

    describe("if user is valid", () => {
        test("should return a refresh Token", async () => {
            refresh_token = await createRefreshToken({ email, secret });
            expect(refresh_token).toBeDefined();
            expect(refresh_token).not.toBeNull();
        });
    });
});

describe("verify a refresh Token", () => {
    //TODO: test
    /*     describe("if refresh is not provide", () => {
        test("should throw badRequest error", async () => {
            await expect(verifyRefreshToken()).rejects.toThrow();
        });
    }); */
    /*     describe("if perfectly varified", () => {
        test("should return a user object", async () => {
            const decoded = await verifyRefreshToken(refresh_token, secret);
        });
    }); */
});

describe("check expiration of a token", () => {
    describe("if token is not expired", () => {
        test("should return true", () => {
            const token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFiaWIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTQ4NTY4MzUsImV4cCI6MTY5NDg1ODYzNX0.cCI8vtclopQAn_F_QQEKW4WCdn0nAgoTQ8Ujx3-M4fE";
            const isTokenExpired = isExpiredToken(token);
            expect(isTokenExpired).toBe(true);
        });
    });
    describe("if token is  expired", () => {
        test("should return false", () => {
            const token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFiaWIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTQ4NjAzNjIsImV4cCI6MTY5NzQ1MjM2Mn0.HCq42NxVZew11MGhukn5iAU4nhV-374Y0wEi8FueIok";
            const isTokenExpired = isExpiredToken(token);
            expect(isTokenExpired).toBe(false);
        });
    });
});

describe("find a refeshd token", () => {
    describe(" if email is not passed", () => {
        test("should throw error", async () => {
            await expect(findRefreshToken()).rejects.toThrow();
        });
    });
    describe("found a refresh token", () => {
        test("should retrun a refresh token", async () => {
            const refresh_token = await findRefreshToken(email);
            expect(refresh_token).toBeDefined();
            expect(refresh_token).not.toBeNull();
        });
    });
});

describe("remove refresh", () => {
    describe(" if token is not passed", () => {
        test("should throw error", async () => {
            await expect(removeRefreshToken()).rejects.toThrow();
        });
    });
    describe(" if token is not exists", () => {
        test("should throw error", async () => {
            const token = "sdfkladjfkl;jk23;;12312";
            await expect(removeRefreshToken(token)).rejects.toThrow();
        });
    });
    describe(" if token is exists", () => {
        test("should return deleted user", async () => {
            const token = refresh_token.token;
            const removedRefresh = await removeRefreshToken(token);
            expect(removedRefresh).toBeDefined();
        });
    });
});
