/** @format */

const mongoose = require("mongoose");
const Order = require("../../../../src/model/Order");
const {
    create,
    findById,
    findAll,
    count,
    removeItem,
    updateProperties,
    findByUserId,
    findByCartId,
    getCart,
    cancleOrder,
    checkOwnership,
} = require("../../../../src/lib/order");
const { createCart } = require("../cart/createDemo");

const uri = "mongodb://localhost:27017/test_DB";
beforeAll(async () => {
    await mongoose.connect(uri);
    await Order.deleteMany({});
});

afterAll(async () => {
    mongoose.connection.close();
});

const userId = "65084ca04f2fe61598c8b7b9";
const cartId = "65084ca04f2fe61598c8b7b0";
const shippingMethod = "standard";
const orderStatus = "cancelled";
const amount = "6000";
let order = {};

const page = 1;
const limit = 10;
const sortType = "desc";
const sortBy = "updatedAt";

describe("create order", () => {
    describe("if required properties is missing", () => {
        test("should throw error", async () => {
            await expect(() => create({ cartId, userId })).rejects.toThrow();
        });
    });

    describe("if required properties is right", () => {
        test("should return a order", async () => {
            const cart = await createCart();
            order = await create({
                cartId: cart.id,
                userId,
                amount,
                shippingMethod,
            });

            expect(order).toHaveProperty("userId");
            expect(order).toHaveProperty("amount");
        });
    });
    describe("if order is created with the cart", () => {
        test("should throw error", async () => {
            const cart = await createCart();
            const cartId = cart.id;
            await expect(() =>
                create({ cartId, userId, amount })
            ).rejects.toThrow();
        });
    });
});

describe("find order by id", () => {
    describe("if order is  found", () => {
        test("should return a cart", async () => {
            const order_2 = await findById(order.id);
            expect(order_2).toHaveProperty("userId");
            expect(order_2).toHaveProperty("amount");
        });
    });
    describe("if order is not found", () => {
        test("should return null", async () => {
            const id = "950811bb5213f0e426048d21";
            const order = await findById(id);

            expect(order).toBeNull();
        });
    });
    describe("if id is not provided", () => {
        test("should throw a error", async () => {
            const id = "";
            await expect(findById(id)).rejects.toThrow();
        });
    });
});

describe("Find all carts", () => {
    describe("if too many carts", () => {
        test("should return array of carts", async () => {
            const orders = await findAll({
                page,
                limit,
                sortBy,
                sortType,
            });
            expect(orders.length).toBeDefined();
            expect(orders.length).toBeGreaterThan(0);
        });
    });
});

describe("count order", () => {
    test("should retrun total order", async () => {
        const totalOder = await count();
        expect(totalOder).toBeDefined();
        expect(totalOder).toBeGreaterThanOrEqual(0);
    });
});

describe("Find all orders of a user", () => {
    describe("if id is not provided", () => {
        test("should throw a error", async () => {
            const id = "";
            await expect(findByUserId(id, { page, limit })).rejects.toThrow();
        });
    });
    describe("if user dosen't have any order", () => {
        test("should return empty array", async () => {
            const id = "650811bb5213f0e426048d29";
            const orders = await findByUserId(id, {
                page: page,
                limit: limit,
                sortBy: sortBy,
                sortType: sortType,
            });
            expect(orders.length).toBeDefined();
            expect(orders.length).toBeLessThan(1);
        });
    });
    describe("if user  have  orders", () => {
        test("should return array of book", async () => {
            const id = order.userId;
            const orders = await findByUserId(id, {
                page,
                limit,
                sortBy,
                sortType,
            });
            expect(orders.length).toBeDefined();
            expect(orders.length).toBeGreaterThan(0);
        });
    });
});

describe("Find the order of a cart", () => {
    describe("if id is not provided", () => {
        test("should throw a error", async () => {
            const id = "";
            await expect(findByCartId(id, { page, limit })).rejects.toThrow();
        });
    });
    describe("if user dosen't have any order", () => {
        test("should return empty array", async () => {
            const id = "650811bb5213f0e426048d29";
            const orders = await findByCartId(id, {
                page: page,
                limit: limit,
                sortBy: sortBy,
                sortType: sortType,
            });
            expect(orders.length).toBeDefined();
            expect(orders.length).toBeLessThan(1);
        });
    });
    describe("if cart  have a orders", () => {
        test("should return array of books", async () => {
            const id = order.cartId;
            const orders = await findByCartId(id, {
                page,
                limit,
                sortBy,
                sortType,
            });
            expect(orders.length).toBeDefined();
            expect(orders.length).toBe(1);
        });
    });
});

describe("get cart by cart id", () => {
    describe("if cart is  found", () => {
        test("should return a cart", async () => {
            const cart = await getCart(order.cartId);
            expect(cart).toHaveProperty("userId");
            expect(cart).toHaveProperty("quantity");
        });
    });
    describe("if cart is not found", () => {
        test("should should retrun null", async () => {
            const id = "950811bb5213f0e426048d21";
            const cart = await getCart(id);
            expect(cart).toBeNull();
        });
    });
    describe("if id is not provided", () => {
        test("should throw a error", async () => {
            const id = "";
            await expect(getCart(id)).rejects.toThrow();
        });
    });
});

describe("check ownership of a order", () => {
    describe("if order id is not provide", () => {
        test("should throw error", async () => {
            const userId = "6506fa9a15f02938d7fce870";
            await expect(checkOwnership({ userId })).rejects.toThrow();
        });
    });
    describe("if order does not exist", () => {
        test("should throw error", async () => {
            const id = "6506fa9a15f02938d7fce870";
            await expect(checkOwnership({ id, userId })).rejects.toThrow();
        });
    });
    describe("if requested user is not owner of the order", () => {
        test("should return false", async () => {
            const id = order.id;
            const userId = "6506fa9a15f02938d7fce870";
            const result = await checkOwnership({ id, userId });
            expect(result).toBe(false);
        });
    });
    describe("if requested user is owner of the cart", () => {
        test("should return true", async () => {
            const id = order.id;
            const userId = order.userId.toString();
            const result = await checkOwnership({ id, userId });
            expect(result).toBe(true);
        });
    });
});

describe("update a order", () => {
    describe("if required properties is missing", () => {
        test("should throw error", async () => {
            const id = "";
            await expect(() => updateProperties({ cartId })).rejects.toThrow();
        });
    });
    describe("if order does not exist", () => {
        test("should throw error", async () => {
            const id = "6506fe641ee2c0523481e0f0";
            await expect(updateProperties(id, { cartId })).rejects.toThrow(
                "Order not found"
            );
        });
    });
    describe("if order does not exist", () => {
        test("should throw error", async () => {
            const id = order.id;
            const upadatedOrder = await updateProperties(id, {
                cartId,
                shippingMethod,
            });
            expect(upadatedOrder).toHaveProperty("shippingMethod");
            expect(upadatedOrder).toHaveProperty("cartId");
        });
    });
});

describe("cancel a order", () => {
    describe("if required properties is missing", () => {
        test("should throw error", async () => {
            const id = "";
            await expect(() => cancleOrder({ orderStatus })).rejects.toThrow();
        });
    });
    describe("if order does not exist", () => {
        test("should throw error", async () => {
            const id = "6506fe641ee2c0523481e0f0";
            await expect(cancleOrder(id, { orderStatus })).rejects.toThrow();
        });
    });
    describe("if order  exist", () => {
        test("should throw error", async () => {
            const id = order.id;
            const cancelledOrder = await cancleOrder(id, {
                orderStatus,
            });
            expect(cancelledOrder).toHaveProperty("shippingMethod");
            expect(cancelledOrder).toHaveProperty("cartId");
        });
    });
    describe("if orderexist", () => {
        describe("inputed orderStatus is cancelled", () => {
            test("should throw error", async () => {
                const id = order.id;
                const orderStatus = "cancelled";
                await expect(
                    cancleOrder(id, { orderStatus })
                ).rejects.toThrow();
            });
        });
    });
});

describe("remove order", () => {
    describe(" if id is not passed", () => {
        test("should throw error", async () => {
            await expect(removeItem()).rejects.toThrow("id is required");
        });
    });
    describe(" if order  is not exists", () => {
        test("should throw error", async () => {
            const id = "6506fe641ee2c0523481e0f0";
            await expect(removeItem(id)).rejects.toThrow(
                "Requested resource not found"
            );
        });
    });
    describe(" if order is exists", () => {
        test("should return deleted order", async () => {
            const deletedOrder = await removeItem(order.id);

            expect(deletedOrder).toBeDefined();
            expect(deletedOrder).toHaveProperty("shippingMethod");
            expect(deletedOrder).toHaveProperty("amount");
        });
    });
});
