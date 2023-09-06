/** @format */
const Book = require("../../model/Book");
const defaults = require("../../config/defaults");
const { badRequest, notFound } = require("../../utils/error");

// create a new book
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

// update a book
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

// delete a book
const removeItem = async (id) => {
    if (!id) throw badRequest("id is required");

    const book = await Book.findById(id);
    if (!book) {
        throw notFound();
    }
    let reviews = await reviewService.findByBookId(id, { page: 1, limit: 0 });

    // asyncronously delete all reviews of a book
    for (const review of reviews) {
        await reviewService.removeItem(review.id);
    }
    return Book.findByIdAndDelete(id);
};

// find a book by id
const findBookById = (id) => {
    if (!id) {
        badRequest("id is required");
    }
    return Book.findById(id);
};

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

const count = ({ search = "" }) => {
    const filter = {
        title: { $regex: search, $options: "i" },
    };
    return Book.count(filter);
};

const bookObj = async (id) => {
    if (!id) {
        throw badRequest("Id is required");
    }
    const book = await Book.findById(id).select("id title price");
    return book;
};

// find all books of a given user
const findByUserId = async (
    id,
    {
        page = defaults.page || 1,
        limit = defaults.limit || 5,
        sortType = "desc",
        sortBy = "updatedAt",
        search = "",
    }
) => {
    if (!id) {
        throw badRequest("Id is required");
    }
    const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;

    // const filter = {
    //     title: { $regex: search, $options: "i" },
    // };

    //TODO: add title regex for find book
    const books = await Book.find({ userId: id })
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit);

    return books;
};

// ratting of a book
/**
 * @param {BooK id}
 * returns {ratting}
 */

// check ownership of a book
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
