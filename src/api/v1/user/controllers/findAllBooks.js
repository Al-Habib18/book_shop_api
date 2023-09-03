/** @format */

const defaults = require("../../../../config/defaults");
const reviewService = require("../../../../lib/review");
const bookService = require("../../../../lib/book");
const { getPagination } = require("../../../../utils/pagination");
const getHATEOAS = require("../../../../utils/HATEOAS");
const { notFound } = require("../../../../utils/error");

const allBooks = async (req, res, next) => {
    const { id } = req.params;

    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sortType || defaults.sortType;
    const sortBy = req.query.sortBy || defaults.sortBy;
    const search = req.query.search || defaults.search;

    try {
        const books = await bookService.findByUserId(id, {
            page,
            limit,
            sortType,
            sortBy,
            search,
        });

        if (!books) {
            throw notFound();
        }
        const totalItems = books.length;

        const pagination = getPagination({ totalItems, limit, page });

        const links = getHATEOAS({
            url: req.url,
            path: req.path,
            query: req.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page,
        });

        const response = {
            data: books,
            pagination,
            links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = allBooks;

/** @format */
// let bookArray = [];
// for (let book of books) {
//     let totalRatting = 0;
//     const reviewArray = await reviewService.findByBookId(book.id);

//     for (const review of reviewArray) {
//         totalRatting += review.ratting;
//     }
//     const ratting = totalRatting / reviewArray.length;

//     const isRatting = reviewArray.length;
//     if (isRatting) {
//         book.ratting = ratting;
//     }
//     bookArray.push(book);
//     console.log("book ratting :", book.ratting);
// }
