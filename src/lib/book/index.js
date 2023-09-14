/** @format */
const Book = require("../../model/Book");
const defaults = require("../../config/defaults");
const { badRequest, notFound } = require("../../utils/error");

/** - create a new book
 * @param {string} title  - title of a user
 * @param {string} userId - user id of the user
 * @param {array} author - authors of the book
 * @param {string} publisher - publisher of the book
 * @param {enum} category - category of the book
 * @param {string} summary - summary of the book
 * @param {number} price - price of the book
 * @return {Promise} - book promise
 */
const create = async ({
    title,
    userId,
    author,
    publisher = "",
    category = "",
    summary = "",
    price,
}) => {
    if (!title || !userId || !author || !price) {
        throw badRequest();
    }
    const book = new Book({
        title,
        userId,
        author,
        publisher,
        category,
        summary,
        price,
    });
    return book.save();
};

/** - update a book
 * @param {string} id  - id of the book
 * @param {string} title  - title of a user
 * @param {string} userId - user id of the user
 * @param {array} author - authors of the book
 * @param {string} publisher - publisher of the book
 * @param {enum} category - category of the book
 * @param {string} summary - summary of the book
 * @param {number} price - price of the book
 * @return {object} - book object
 */
const updateProperties = async (
    id,
    { title, author, publisher, category, summary, price }
) => {
    const book = await Book.findById(id);
    if (!book) {
        throw notFound();
    }

    const payload = { title, author, publisher, category, summary, price };

    Object.keys(payload).forEach(
        (key) => (book[key] = payload[key] ?? book[key])
    );

    await book.save();
    return book;
};

/** delete a book
 * @param {string} id - id of the book
 * @return {Promise}
 */
const removeItem = async (id) => {
    if (!id) throw badRequest("id is required");

    const book = await Book.findById(id);
    if (!book) {
        throw notFound();
    }
    return Book.findByIdAndDelete(id);
};

/** find a book by id
 * @param {string} id  - id of a user
 * @return {Promise} - promise of a book
 */
const findBookById = (id) => {
    if (!id) {
        badRequest("id is required");
    }
    return Book.findById(id);
};

/**find all books
 * @param {string} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @param {string} search - search with search
 * @return {Array} book  - array of book
 */
const findAll = async ({
    page = 1,
    limit = 10,
    sortType = "desc",
    sortBy = "updatedAt",
    search = "",
}) => {
    const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;

    const filter = {
        title: { $regex: search, $options: "i" },
    };

    const books = await Book.find(filter)
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit)
        .select("-summary");

    return books;
};

/** - count the number of books of the search term
 * @param {string} search - search with search
 * @return {number} number of book counted
 */
const count = ({ search = "" }) => {
    const filter = {
        title: { $regex: search, $options: "i" },
    };
    return Book.count(filter);
};

/** - get a book object for given a book id
 * @param {string} id - id of a book
 * @return {object} - a book object with id , title and price
 */
const bookObj = async (id) => {
    if (!id) {
        throw badRequest("Id is required");
    }
    const book = await Book.findById(id).select("id title price");
    return book;
};

/** - find all books of a given user id
 * @param {string} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @return {Array} book  - array of book
 */
const findByUserId = async (
    id,
    {
        page = defaults.page || 1,
        limit = defaults.limit || 5,
        sortType = "desc",
        sortBy = "updatedAt",
    }
) => {
    if (!id) {
        throw badRequest("Id is required");
    }
    const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;

    //TODO: add title regex for find book
    const books = await Book.find({ userId: id })
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit);

    return books;
};

/** - check ownership of a book
 * @param {string} bookId- id of the book
 * @param {string} userId- id of the requested user
 * @return {boolean}
 */
const checkOwnership = async ({ bookId, userId }) => {
    const book = await findBookById(bookId);
    if (!book) {
        throw notFound("Book not found");
    }

    if (book.userId === userId) {
        return true;
    }
    return false;
};

module.exports = {
    create,
    updateProperties,
    removeItem,
    findBookById,
    findAll,
    count,
    bookObj,
    findByUserId,
    checkOwnership,
};
