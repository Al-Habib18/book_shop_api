/** @format */
const mongoose = require("mongoose");
const Review = require("../../../../src/model/Review");
const {
    create,
    removeItem,
    updateProperties,
    findReviewById,
    findAll,
    count,
    findByUserId,
    findByBookId,
    getBook,
    getBookByReview,
    checkOwnership,
} = require("../../../../src/lib/review");

const { createBook } = require("../book/createDemo");

const bookId = "6506fa9a15f02938d7fce87b";
const userId = "6506fa9a15f02938d7fce87a";
const ratting = 4;
const summary = "I think this is one of the best books in the software design";
let review = {};

const search = "xyz";
const page = 1;
const limit = 10;
const sortType = "desc";
const sortBy = "updatedAt";

const uri = "mongodb://localhost:27017/test_DB";
beforeAll(async () => {
    await mongoose.connect(uri);
    await Review.deleteMany({});
});

afterAll(async () => {
    mongoose.connection.close();
});

describe("create review", () => {
    describe("if required properties is missing", () => {
        test("should throw error", async () => {
            await expect(() => create({ bookId, userId })).rejects.toThrow();
        });
    });
    describe("if book does not exist", () => {
        test("should throw error", async () => {
            await expect(() =>
                create({ bookId, userId, ratting, summary })
            ).rejects.toThrow();
        });
    });
    describe("if required properties is right", () => {
        test("should return a review", async () => {
            const book = await createBook();
            review = await create({
                bookId: book.id,
                userId,
                ratting,
                summary,
            });
            expect(review).toHaveProperty("bookId");
            expect(review).toHaveProperty("userId");
            expect(review).toHaveProperty("ratting");
        });
    });
});

describe("find review by id", () => {
    describe("if book is  found", () => {
        test("should return a review", async () => {
            const foundReview = await findReviewById(review.id);
            expect(foundReview).toHaveProperty("bookId");
            expect(foundReview).toHaveProperty("userId");
            expect(foundReview).toHaveProperty("ratting");
        });
    });
    describe("if review is not found", () => {
        test("should throw a error", async () => {
            const id = "950811bb5213f0e426048d21";
            const review = await findReviewById(id);
            expect(review).toBeNull();
        });
    });
    describe("if id is not provided", () => {
        test("should throw a error", async () => {
            await expect(findReviewById()).rejects.toThrow("id is required");
        });
    });
});

describe("update a review", () => {
    describe("if review  exist", () => {
        test("should return a updated review", async () => {
            const ratting = 3;
            const updatedReview = await updateProperties(review.id, {
                ratting,
            });
            expect(updatedReview).toHaveProperty("bookId");
            expect(updatedReview).toHaveProperty("ratting");
        });
    });
    describe("if review does not exist", () => {
        test("should throw error", async () => {
            const id = "6506fe641ee2c0523481e0f0";
            const ratting = 3;
            await expect(updateProperties(id, { ratting })).rejects.toThrow(
                "review not found"
            );
        });
    });
});
describe("Find all Reviews", () => {
    describe("if search option did not match a review", () => {
        test("should return empty array", async () => {
            const reviews = await findAll({
                page,
                limit,
                sortBy,
                sortType,
                search,
            });
            expect(reviews.length).toBeDefined();
            expect(reviews.length).toBeLessThan(1);
        });
    });
    describe("if search option  matches one or some reviews", () => {
        test("should return empty array", async () => {
            const search = "is";
            const reviews = await findAll({
                page,
                limit,
                sortBy,
                sortType,
                search: search,
            });
            expect(reviews.length).toBeDefined();
            expect(reviews.length).toBeGreaterThan(0);
        });
    });
    describe("if search option do not pass", () => {
        test("should return empty array or array of reviews", async () => {
            const reviews = await findAll({
                page,
                limit,
                sortBy,
                sortType,
            });
            expect(reviews.length).toBeDefined();
            expect(reviews.length).toBeGreaterThanOrEqual(0);
        });
    });
});

describe("count review", () => {
    describe("if search option is not provide", () => {
        test("should return review number", async () => {
            const reviewNumber = await count({});
            expect(reviewNumber).toBeDefined();
            expect(reviewNumber).toBeGreaterThan(0);
        });
    });
    describe("if search option  match a review", () => {
        test("should return review number", async () => {
            const search = "ar";
            const reviewNumber = await count({ search });
            expect(reviewNumber).toBeDefined();
            expect(reviewNumber).toBeGreaterThan(0);
        });
    });
    describe("if search option  did not match a review", () => {
        test("should not return any review's number", async () => {
            const search = "xyz";
            const reviewNumber = await count({ search });
            expect(reviewNumber).toBeDefined();
            expect(reviewNumber).not.toBeGreaterThan(0);
        });
    });
});

describe("Find all review of a user", () => {
    describe("if id is not provided", () => {
        test("should throw a error", async () => {
            const id = "";
            await expect(findByUserId(id, { page, limit })).rejects.toThrow(
                "Bad Request"
            );
        });
    });
    describe("if user dosen't have any review", () => {
        test("should return empty array", async () => {
            const id = "650811bb5213f0e426048d29";
            const reviews = await findByUserId(id, {
                page: page,
                limit: limit,
                sortBy: sortBy,
                sortType: sortType,
            });
            expect(reviews.length).toBeDefined();
            expect(reviews.length).toBeLessThan(1);
        });
    });
    describe("if user  have  book", () => {
        test("should return array of review", async () => {
            const id = review.userId;
            const reviews = await findByUserId(id, {
                page,
                limit,
                sortBy,
                sortType,
            });
            expect(reviews.length).toBeDefined();
            expect(reviews.length).toBeGreaterThan(0);
        });
    });
});

describe("Find all review of a book", () => {
    describe("if id is not provided", () => {
        test("should throw a error", async () => {
            const id = "";
            await expect(findByBookId(id, { page, limit })).rejects.toThrow(
                "Bad Request"
            );
        });
    });
    describe("if book dosen't have any review", () => {
        test("should return empty array", async () => {
            const id = "650811bb5213f0e426048d29";
            const reviews = await findByBookId(id, {
                page: page,
                limit: limit,
                sortBy: sortBy,
                sortType: sortType,
            });
            expect(reviews.length).toBeDefined();
            expect(reviews.length).toBeLessThan(1);
        });
    });
    describe("if book  have review", () => {
        test("should return array of review", async () => {
            const id = review.bookId;
            const reviews = await findByBookId(id, {
                page,
                limit,
                sortBy,
                sortType,
            });
            expect(reviews.length).toBeDefined();
            expect(reviews.length).toBeGreaterThan(0);
        });
    });
});
describe("check ownership of a review", () => {
    describe("if requested user is owner of the review", () => {
        test("should return true", async () => {
            const id = review.id;
            const userId = "6506fa9a15f02938d7fce87a";
            const result = await checkOwnership({ id, userId });
            expect(result).toBe(true);
        });
    });
    describe("if requested user is not owner of the review", () => {
        test("should return false", async () => {
            const id = review.id;
            const userId = "6506fa9a15f02938d7fce870";
            const result = await checkOwnership({ id, userId });
            expect(result).toBe(false);
        });
    });
    describe("if book is not provide", () => {
        test("should throw error", async () => {
            // const bookId = book.id;
            const userId = "6506fa9a15f02938d7fce870";
            await expect(checkOwnership({ userId })).rejects.toThrow();
        });
    });
});

describe("get book", () => {
    describe("if book exist", () => {
        test("should return a book", async () => {
            const book = await getBook(review.bookId);
            expect(book).toBeDefined();
            expect(book).toHaveProperty("title");
        });
    });
    describe("if id not provide", () => {
        test("should throw a error", async () => {
            await expect(getBook()).rejects.toThrow("id is required");
        });
    });
});

describe("get book by review id", () => {
    /*     describe("if book exist", () => {
        test("should return a book", async () => {
            const book = await getBookByReview(review.id);
            expect(book).toBeDefined();
            expect(book).toHaveProperty("title");
        });
    }); */
    describe("if id not provide", () => {
        test("should throw a error", async () => {
            await expect(getBook()).rejects.toThrow("id is required");
        });
    });
});

describe("remove review", () => {
    describe(" if id is not passed", () => {
        test("should throw error", async () => {
            await expect(removeItem()).rejects.toThrow("id is required");
        });
    });
    describe(" if review is not exists", () => {
        test("should throw error", async () => {
            const id = "6506fe641ee2c0523481e0f0";
            await expect(removeItem(id)).rejects.toThrow(
                "Requested resource not found"
            );
        });
    });
    describe(" if review is exists", () => {
        test("should return deleted book", async () => {
            const deletedReview = await removeItem(review.id);

            expect(deletedReview).toBeDefined();
            expect(deletedReview).toHaveProperty("bookId");
            expect(deletedReview).toHaveProperty("userId");
        });
    });
});
