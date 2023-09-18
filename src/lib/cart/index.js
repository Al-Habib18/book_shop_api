/** @format */

const Cart = require("../../model/Cart");
const bookService = require("../book");
const { badRequest, notFound } = require("../../utils/error");

/** - create a new Cart
 * @param {string} userId - request user id
 * @param {Array} bookArray - list of books
 * @param {number} quantity - quantity of books
 * @param {number} amount - total amount of all books
 * @returns {object} Cart object
 */
const create = async ({ userId, bookArray = [], quantity = 0, amount = 0 }) => {
    if (!userId) {
        throw badRequest();
    }
    if (quantity === 0) {
        throw badRequest("bookId is required");
    }
    const books = bookArray;
    const cart = new Cart({ userId, books, quantity, amount });
    await cart.save();
    return cart;
};

/** find cart by cart id
 * @param {string} id - cart id
 * @return {object}  cart object
 */
const findById = (id) => {
    if (!id) {
        badRequest("Id is required");
    }
    console.log("id is " + id);
    return Cart.findById(id);
};

/** find cart by user id
 * @param {string} id - user id of a cart
 * @return {object}  cart object
 */
const findByUserId = (id) => {
    if (!id) {
        badRequest();
    }
    return Cart.find({ userId: id });
};

// count all cart
const count = () => {
    return Cart.count();
};

/** - find all carts
 * @param {string} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @return {Array} carts  - array of carts
 */
const findAll = async ({
    page = 1,
    limit = 5,
    sortBy = "updatedAt",
    sortType = "desc",
}) => {
    console.log("limit", limit);
    const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;
    const carts = await Cart.find({})
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit);

    return carts;
};

/** - find all carts for given user
 * @param {string} id - id of a user
 * @param {string} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @return {Array} carts  - array of carts
 */
const findAllByUserId = async (
    id,
    { page = 1, limit = 5, sortBy = "updatedAt", sortType = "desc" }
) => {
    if (!id) {
        throw badRequest("User id required");
    }
    const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;
    const carts = await Cart.find({ userId: id })
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit);

    return carts;
};

/** - update a cart
 * @param {string} id  - cart id
 * @param {Array} bookArray - list of books
 * @param {number} quantity - quantity of books
 * @param {number} amount - total amount of all books
 * @returns {object} Cart object
 */
const updateProperties = async (
    id,
    { bookArray = [], quantity = 0, amount = 0 }
) => {
    const cart = await findById(id);
    if (!cart) {
        throw notFound();
    }
    const payload = { bookArray, quantity, amount };

    Object.keys(payload).forEach(
        (key) => (cart[key] = payload[key] ?? cart[key])
    );

    await cart.save();
    return cart;
};

/** delete a cart
 * @param {string} id - cart id
 * @return {promise} - promise of a deleted cart
 */
const removeItem = async (id) => {
    if (!id) throw badRequest("id is required");

    const cart = await Cart.findById(id);
    if (!cart) {
        throw notFound();
    }

    return Cart.findByIdAndDelete(id);
};

/** -  get books of a requested cart
 * @param {Array} bookArray - book array of a cart
 * @return {Array} book object - array of book objects with id ,title and price
 */
const getBooks = async ({ bookArray = [] }) => {
    let booksObj = [];

    for (let bookId of bookArray) {
        const book = await bookService.bookObj(bookId);
        if (!book) {
            throw badRequest("Requested book or books does not exist");
        }
        booksObj.push(book);
    }
    return booksObj;
};

/** check owner ship of a cart
 * @param {string} id - cart id
 * @param {string} userId - requested user id
 * @return {boolean} -
 */
const checkOwnership = async ({ id, userId }) => {
    const cart = await findById(id);
    if (!cart) {
        throw badRequest("Cart not found");
    }
    const cartUserId = cart.userId.toString();

    if (cartUserId === userId) {
        return true;
    }
    return false;
};

module.exports = {
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
};
