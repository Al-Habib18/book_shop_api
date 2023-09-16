/** @format */

const {
    notFound,
    badRequest,
    serverError,
    authenticationError,
    authorizationError,
} = require("../../../src/utils/error");

describe("Not Found Handler", () => {
    describe("if msg is not pass", () => {
        test("should return error", () => {
            const error = notFound();
            expect(error.message).toBe("Requested resource not found");
            expect(error.status).toBe(404);
        });
    });
    describe("if msg is pass", () => {
        test("should return error", () => {
            const msg = "User not found";
            const error = notFound(msg);

            expect(error.message).toBe(msg);
            expect(error.status).toBe(404);
        });
    });
    describe("if msg is not pass", () => {
        test("should not return unexpected error", () => {
            const error = notFound();
            expect(error.message).not.toBe("Bad Request");
            expect(error.status).not.toBe(500);
        });
    });
});

describe("bad Request Handler", () => {
    describe("if msg is not pass", () => {
        test("should return error", () => {
            const error = badRequest();
            expect(error.message).toBe("Bad Request");
            expect(error.status).toBe(400);
        });
    });
    describe("if msg is pass", () => {
        test("should return error", () => {
            const msg = "unexpected token";
            const error = badRequest(msg);

            expect(error.message).toBe(msg);
            expect(error.status).toBe(400);
        });
    });
    describe("if msg is not pass", () => {
        test("should not return unexpected error", () => {
            const error = badRequest();
            expect(error.message).not.toBe("Requested resource not found");
            expect(error.status).not.toBe(404);
        });
    });
});

describe("Server Error Handler", () => {
    describe("if msg is not pass", () => {
        test("should return error", () => {
            const error = serverError();
            expect(error.message).toBe("Internal Server Error");
            expect(error.status).toBe(500);
        });
    });
    describe("if msg is pass", () => {
        test("should return error", () => {
            const msg = "cool! server error";
            const error = serverError(msg);

            expect(error.message).toBe(msg);
            expect(error.status).toBe(500);
        });
    });
    describe("if msg is not pass", () => {
        test("should not return unexpected error", () => {
            const error = serverError();
            expect(error.message).not.toBe("Requested resource not found");
            expect(error.status).not.toBe(404);
        });
    });
});

describe("Authentication Error Handler", () => {
    describe("if msg is not pass", () => {
        test("should return error", () => {
            const error = authenticationError();
            expect(error.message).toBe("Authentication Failed");
            expect(error.status).toBe(401);
        });
    });
    describe("if msg is pass", () => {
        test("should return error", () => {
            const msg = "You are not registered user";
            const error = authenticationError(msg);

            expect(error.message).toBe(msg);
            expect(error.status).toBe(401);
        });
    });
    describe("if msg is not pass", () => {
        test("should not return unexpected error", () => {
            const error = authenticationError();
            expect(error.message).not.toBe("Requested resource not found");
            expect(error.status).not.toBe(404);
        });
    });
});

describe("Authentication Error Handler", () => {
    describe("if msg is not pass", () => {
        test("should return error", () => {
            const error = authorizationError();
            expect(error.message).toBe(
                "You do not have permission to access this route"
            );
            expect(error.status).toBe(401);
        });
    });
    describe("if msg is pass", () => {
        test("should return error", () => {
            const msg = "You are not a seller";
            const error = authorizationError(msg);

            expect(error.message).toBe(msg);
            expect(error.status).toBe(401);
        });
    });
    describe("if msg is not pass", () => {
        test("should not return unexpected error", () => {
            const error = authorizationError();
            expect(error.message).not.toBe("Requested resource not found");
            expect(error.status).not.toBe(404);
        });
    });
});
