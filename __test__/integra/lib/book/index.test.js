/** @format */
const mongoose = require("mongoose");
const Book = require("../../../../src/model/Book");
const {
    create,
    updateProperties,
    removeItem,
    findBookById,
    findAll,
    count,
    bookObj,
    findByUserId,
    checkOwnership,
} = require("../../../../src/lib/book");

const uri = "mongodb://localhost:27017/test_DB";
beforeAll(async () => {
    await mongoose.connect(uri);
    await Book.deleteMany({});
});

afterAll(async () => {
    mongoose.connection.close();
});

const title = "Clear Architecture";
const userId = "6506fa9a15f02938d7fce87a";
const author = ["Robert C.Martin"];
const publisher = "pearson";
const category = "science";
const summary = "A creaftsman's guide to software structure and design";
const price = 1200;
let book = {};

const search = "xyz";
const page = 1;
const limit = 10;
const sortType = "desc";
const sortBy = "updatedAt";

describe("create book", () => {
    describe("if required properties is missing", () => {
        test("should throw error", async () => {
            await expect(() => create({ title, userId })).rejects.toThrow();
        });
    });
    describe("if required properties is right", () => {
        test("should return a book", async () => {
            book = await create({
                title,
                userId,
                author,
                price,
                publisher,
                category,
                summary,
            });
            expect(book.title).toEqual(title);
            expect(book.userId).toEqual(userId);
            expect(book).toMatchObject({
                title: title,
                author: author,
                publisher: publisher,
            });
        });
    });
});

describe("find book by id", () => {
    describe("if book is  found", () => {
        test("should return a book", async () => {
            const book_2 = await findBookById(book.id);
            expect(book_2.title).toEqual(title);
            expect(book_2.userId).toEqual(userId);
        });
    });
    describe("if book is not found", () => {
        test("should throw a error", async () => {
            const id = "950811bb5213f0e426048d21";
            const book = await findBookById(id);
            expect(book).toBeNull();
        });
    });
    describe("if id is not provided", () => {
        test("should throw a error", async () => {
            await expect(findBookById()).rejects.toThrow("id is required");
        });
    });
});

describe("count book", () => {
    describe("if search option is not provide", () => {
        test("should return user number", async () => {
            const userNumber = await count({});
            expect(userNumber).toBeDefined();
            expect(userNumber).toBeGreaterThan(0);
        });
    });
    describe("if search option  match a book", () => {
        test("should return book number", async () => {
            const search = "ar";
            const userNumber = await count({ search });
            expect(userNumber).toBeDefined();
            expect(userNumber).toBeGreaterThan(0);
        });
    });
    describe("if search option  did not match a book", () => {
        test("should not return any book's number", async () => {
            const search = "xyz";
            const userNumber = await count({ search });
            expect(userNumber).toBeDefined();
            expect(userNumber).not.toBeGreaterThan(0);
        });
    });
});

describe("Find all book", () => {
    describe("if search option did not match a book", () => {
        test("should return empty array", async () => {
            const books = await findAll({
                page,
                limit,
                sortBy,
                sortType,
                search,
            });
            expect(books.length).toBeDefined();
            expect(books.length).toBeLessThan(1);
        });
    });
    describe("if search option  matches one or some book", () => {
        test("should return empty array", async () => {
            const search = "ar";
            const books = await findAll({
                page,
                limit,
                sortBy,
                sortType,
                search: search,
            });
            expect(books.length).toBeDefined();
            expect(books.length).toBeGreaterThan(0);
        });
    });
    describe("if search option do not pass", () => {
        test("should return empty array or array of users", async () => {
            const books = await findAll({
                page,
                limit,
                sortBy,
                sortType,
            });
            expect(books.length).toBeDefined();
            expect(books.length).toBeGreaterThanOrEqual(0);
        });
    });
});

describe("Find all book of a user", () => {
    describe("if id is not provided", () => {
        test("should throw a error", async () => {
            const id = "";
            await expect(findByUserId(id, { page, limit })).rejects.toThrow(
                "Id is required"
            );
        });
    });
    describe("if user dosen't have any book", () => {
        test("should return empty array", async () => {
            const id = "650811bb5213f0e426048d29";
            const books = await findByUserId(id, {
                page: page,
                limit: limit,
                sortBy: sortBy,
                sortType: sortType,
            });
            expect(books.length).toBeDefined();
            expect(books.length).toBeLessThan(1);
        });
    });
    describe("if user  have  book", () => {
        test("should return array of book", async () => {
            const id = book.userId;
            const books = await findByUserId(id, {
                page,
                limit,
                sortBy,
                sortType,
            });
            expect(books.length).toBeDefined();
            expect(books.length).toBeGreaterThan(0);
        });
    });
});

describe("update  properties of book", () => {
    describe("if book  exist", () => {
        test("should return a updated book", async () => {
            const price = 3000;
            const updatedBook = await updateProperties(book.id, { price });
            expect(updatedBook).toHaveProperty("title");
            expect(updatedBook).toHaveProperty("price");
        });
    });
    describe("if book does not exist", () => {
        test("should throw error", async () => {
            const id = "6506fe641ee2c0523481e0f0";
            const price = 3000;
            await expect(updateProperties(id, { price })).rejects.toThrow(
                "Requested resource not found"
            );
        });
    });
});

describe("check ownership of a book", () => {
    describe("if book is owned", () => {
        test("should return true", async () => {
            const bookId = book.id;
            const userId = book.userId;
            const result = await checkOwnership({ bookId, userId });
            expect(result).toBe(true);
        });
    });
    describe("if book is owned", () => {
        test("should return true", async () => {
            const bookId = book.id;
            const userId = "6506fa9a15f02938d7fce870";
            const result = await checkOwnership({ bookId, userId });
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

describe("get a book object by id", () => {
    describe("if book is  found", () => {
        test("should return a book", async () => {
            const book_2 = await bookObj(book.id);
            expect(book_2.title).toEqual(title);
            expect(book_2).toHaveProperty("price");
        });
    });
    describe("if book is not found", () => {
        test("should throw a error", async () => {
            const id = "950811bb5213f0e426048d21";
            const book = await bookObj(id);
            expect(book).toBeNull();
        });
    });
    describe("if id is not provided", () => {
        test("should throw a error", async () => {
            await expect(bookObj()).rejects.toThrow("Id is required");
        });
    });
});
describe("remove book", () => {
    describe(" if id is not passed", () => {
        test("should throw error", async () => {
            await expect(removeItem()).rejects.toThrow("id is required");
        });
    });
    describe(" if book is not exists", () => {
        test("should throw error", async () => {
            const id = "6506fe641ee2c0523481e0f0";
            await expect(removeItem(id)).rejects.toThrow(
                "Requested resource not found"
            );
        });
    });
    describe(" if book is exists", () => {
        test("should return deleted book", async () => {
            const deletedBook = await removeItem(book.id);

            expect(deletedBook).toBeDefined();
            expect(deletedBook).toHaveProperty("title");
            expect(deletedBook).toHaveProperty("author");
        });
    });
});
