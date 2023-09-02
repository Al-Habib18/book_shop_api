/** @format */
const Book = require("../../model/Book");
const { badRequest, notFound } = require("../../utils/error");

// create a new book
const create = async ({
    title,
    author,
    publisher = "",
    category = "",
    summary = "",
    price,
}) => {
    if (!title || !author || !price) {
        throw badRequest("title ,author, price of book is required");
    }
    const book = new Book({
        title,
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

module.exports = {
    create,
    updateProperties,
    removeItem,
    findBookById,
    findAll,
    count,
    bookObj,
};
