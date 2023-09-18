/** @format */

const mongoose = require("mongoose");
const Cart = require("../../../../src/model/Cart");
const { createBook } = require("../book/createDemo");
const {
    create,
    findById,
    findByUserId,
    findAll,
    findAllByUserId,
    updateProperties,
    removeItem,
    count,
    getBooks,
    checkOwnership,
} = require("../../../../src/lib/cart");

const uri = "mongodb://localhost:27017/test_DB";
beforeAll(async () => {
    await mongoose.connect(uri);
    await Cart.deleteMany({});
});

afterAll(async () => {
    mongoose.connection.close();
});

const page = 1;
const limit = 10;
const sortType = "desc";
const sortBy = "updatedAt";

const userId = "65084ca04f2fe61598c8b7b9";
let bookArray = [];
const quantity = 2;
const amount = 1200;
let cart = {};

describe("create cart", () => {
    describe("if required properties is missing", () => {
        test("should throw error", async () => {
            await expect(() => create({ userId })).rejects.toThrow();
        });
    });
    describe("if required properties is right", () => {
        test("should return a book", async () => {
            const book = await createBook();
            bookArray.push(book.id);
            cart = await create({ userId, bookArray, quantity, amount });
            expect(cart).toHaveProperty("userId");
            expect(cart).toHaveProperty("quantity");
        });
    });
});

describe("find cart by id", () => {
    describe("if cart is  found", () => {
        test("should return a cart", async () => {
            const cart_2 = await findById(cart.id);
            expect(cart_2).toHaveProperty("userId");
            expect(cart_2).toHaveProperty("quantity");
        });
    });
    describe("if book is not found", () => {
        test("should throw a error", async () => {
            const id = "950811bb5213f0e426048d21";
            const cart = await findById(id);
            expect(cart).toBeNull();
        });
    });
    describe("if id is not provided", () => {
        test("should throw a error", async () => {
            const id = "";
            await expect(findById(id)).rejects.toThrow();
        });
    });
});
describe("find a  cart by user id", () => {});

describe("Find all carts", () => {
    describe("if too many carts", () => {
        test("should return array of carts", async () => {
            const books = await findAll({
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

describe("Find all carts of a user", () => {
    describe("if id is not provided", () => {
        test("should throw a error", async () => {
            const id = "";
            await expect(
                findAllByUserId(id, { page, limit })
            ).rejects.toThrow();
        });
    });
    describe("if user dosen't have any cart", () => {
        test("should return empty array", async () => {
            const id = "650811bb5213f0e426048d29";
            const carts = await findAllByUserId(id, {
                page: page,
                limit: limit,
                sortBy: sortBy,
                sortType: sortType,
            });
            expect(carts.length).toBeDefined();
            expect(carts.length).toBeLessThan(1);
        });
    });
    describe("if user  have  carts", () => {
        test("should return array of book", async () => {
            const id = cart.userId;
            const carts = await findAllByUserId(id, {
                page,
                limit,
                sortBy,
                sortType,
            });
            expect(carts.length).toBeDefined();
            expect(carts.length).toBeGreaterThan(0);
        });
    });
});

describe("Find a carts of a user", () => {
    describe("if id is not provided", () => {
        test("should throw a error", async () => {
            const id = "";
            await expect(findByUserId(id, { page, limit })).rejects.toThrow();
        });
    });
    describe("if user dosen't have any cart", () => {
        test("should return empty array", async () => {
            const id = "650811bb5213f0e426048d29";
            const carts = await findByUserId(id);
            expect(carts.length).toBeDefined();
            expect(carts.length).toBeLessThan(1);
        });
    });
    describe("if user  have  a cart", () => {
        test("should return array of book", async () => {
            const id = cart.userId;
            const carts = await findByUserId(id);
            expect(carts.length).toBeDefined();
            expect(carts.length).toBeGreaterThan(0);
        });
    });
});

describe("update a review", () => {
    describe("if required properties is missing", () => {
        test("should throw error", async () => {
            const id = "";
            await expect(() =>
                updateProperties(id, { bookArray })
            ).rejects.toThrow();
        });
    });
    describe("if cart does not exist", () => {
        test("should throw error", async () => {
            const id = "6506fe641ee2c0523481e0f0";
            await expect(
                updateProperties(id, { bookArray, quantity, amount })
            ).rejects.toThrow("Requested resource not found");
        });
    });
    describe("if cart does not exist", () => {
        test("should throw error", async () => {
            const id = cart.id;
            const updatedCart = await updateProperties(id, {
                bookArray,
                quantity,
                amount,
            });
            expect(updatedCart).toHaveProperty("quantity");
            expect(updatedCart).toHaveProperty("amount");
        });
    });
});

describe("count cart", () => {
    test("should retrun total cart", async () => {
        const totalCart = await count();
        expect(totalCart).toBeDefined();
        expect(totalCart).toBeGreaterThanOrEqual(0);
    });
});

describe("get book object of a cart", () => {
    test("should return array of book object", async () => {
        const books = await getBooks({ bookArray });
        expect(books.length).toBeGreaterThan(0);
    });
    describe("if requested book does not exist", () => {
        test("should throw erro", async () => {
            await expect(getBooks).rejects.toThrow();
        });
    });
});

describe("check ownership of a cart", () => {
    describe("if book is not provide", () => {
        test("should throw error", async () => {
            const userId = "6506fa9a15f02938d7fce870";
            await expect(checkOwnership({ userId })).rejects.toThrow();
        });
    });
    describe("if requested user is not owner of the cart", () => {
        test("should return false", async () => {
            const id = cart.id;
            const userId = "6506fa9a15f02938d7fce870";
            const result = await checkOwnership({ id, userId });
            expect(result).toBe(false);
        });
    });
    describe("if requested user is owner of the cart", () => {
        test("should return true", async () => {
            const id = cart.id;
            const userId = "65084ca04f2fe61598c8b7b9";
            const result = await checkOwnership({ id, userId });
            expect(result).toBe(true);
        });
    });
});

describe("remove cart", () => {
    describe(" if id is not passed", () => {
        test("should throw error", async () => {
            await expect(removeItem()).rejects.toThrow("id is required");
        });
    });
    describe(" if cart is not exists", () => {
        test("should throw error", async () => {
            const id = "6506fe641ee2c0523481e0f0";
            await expect(removeItem(id)).rejects.toThrow(
                "Requested resource not found"
            );
        });
    });
    describe(" if cart is exists", () => {
        test("should return deleted book", async () => {
            const deletedCart = await removeItem(cart.id);

            expect(deletedCart).toBeDefined();
            expect(deletedCart).toHaveProperty("books");
            expect(deletedCart).toHaveProperty("amount");
        });
    });
});
