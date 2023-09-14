/** @format */

const User = require("../../model/User");

const bookService = require("../book");
const cartService = require("../cart");
const orderService = require("../order");
const reviewService = require("../review");

const { badRequest, notFound } = require("../../utils/error");
const { generateHash, hasMatched } = require("../../utils/hashing");

/** - find a user by email
 * @param {string} email - email of a  user
 * @returns {object or boolean} - user object
 */
const findUserByEmail = async (email) => {
    const user = await User.findOne({ email: email });
    return user ? user : false;
};

/** - find a user by user id
 * @param {string} id - id of a  user
 * @returns {object} - user object
 */
const findUserById = async (id) => {
    if (!id) {
        throw badRequest("Id is required");
    }
    return await User.findById(id).select("-password");
};

/** - update a user
 * @param {string} id - id of the user
 * @param {string} name - new name of the  user
 * @param {Enumerator} role - new role of the  user
 * @param {string} account - new account number of the  user
 * @returns {object} -  user object
 */
const updateProperties = async (id, { name, role, account }) => {
    const user = await findUserById(id);
    if (!user) {
        throw notFound();
    }

    const payload = { name, role, account };

    Object.keys(payload).forEach(
        (key) => (user[key] = payload[key] ?? user[key])
    );

    await user.save();
    return user;
};

/** -delete a user
 * @param {string} id - id of a new user
 * @returns {Promise} - promise of a deleted user
 */
const removeItem = async (id) => {
    if (!id) {
        throw badRequest("Id is required");
    }

    const user = await findUserById(id);
    if (!user) {
        throw notFound();
    }

    // delete all reviews and books of a user
    const books = await bookService.findByUserId(id, { page: 1, limit: 0 });
    for (const book of books) {
        await bookService.removeItem(book.id);
    }

    // delete all orders and carts of a user
    const carts = await cartService.findByUserId(id);
    for (const cart of carts) {
        await cartService.removeItem(cart.id);
    }

    return User.findByIdAndDelete(id);
};

/** - check existence of a user
 * @param {string} email - email of a new user
 * @returns {boolean}
 */
const isUserExist = async (email) => {
    const user = await findUserByEmail(email);
    return user ? true : false;
};

/** - Create a new user
 * @param {string} name - name of the new user
 * @param {string} email - email of the new user
 * @param {string} password - password of the new user
 * @param {Enumerator} role - role of the new user
 * @param {string} account - account number of the new user
 * @returns {Promise} - promise of a user object
 */
const create = async ({
    name,
    email,
    password,
    role = "customer",
    account = "",
}) => {
    if (!name || !email || !password) {
        throw badRequest();
    }

    let hasUser = await isUserExist(email);
    if (hasUser) {
        throw badRequest("User already exists");
    }

    password = await generateHash(password);

    const user = new User({ name, email, password, role, account });

    return user.save();
};

/** - find all user
 * @param {number} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @return {Array} user  - array of user
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
        name: { $regex: search, $options: "i" },
    };

    const users = await User.find(filter)
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit)
        .select("-password");
    return users;
};

/** -  count users with search option
 * @param {string} search - search term
 * @return {number} number of users counted by search
 */
const count = ({ search = "" }) => {
    const filter = {
        name: { $regex: search, $options: "i" },
    };
    return User.count(filter);
};

/** - get all books of user
 * @param {string} id - id of a user
 * @param {number} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @return {Array} books  - array of books
 */
const getAllBooks = async (id, { page, limit, sortType, sortBy, search }) => {
    const books = await bookService.findByUserId(id, {
        page,
        limit,
        sortType,
        sortBy,
        search,
    });
    return books;
};

/** - get all reviews of user
 * @param {string} id - id of a user
 * @param {number} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @return {Array} reviews  - array of reviews
 */
const getAllReviews = async (id, { page, limit, sortType, sortBy }) => {
    const reviews = await reviewService.findByUserId(id, {
        page,
        limit,
        sortType,
        sortBy,
    });
    return reviews;
};

/** - get all carts of user
 * @param {string} id - id of a user
 * @param {number} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @return {Array} cart  - array of cart
 */
const getAllCarts = async (id, { page, limit, sortType, sortBy }) => {
    const carts = await cartService.findAllByUserId(id, {
        page,
        limit,
        sortType,
        sortBy,
    });
    return carts;
};

/** - get all orders of user
 * @param {string} id - id of a user
 * @param {number} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @return {Array} order  - array of orders
 */
const getAllOrders = async (id, { page, limit, sortType, sortBy }) => {
    const orders = await orderService.findByUserId(id, {
        page,
        limit,
        sortType,
        sortBy,
    });
    return orders;
};

/** - change password of user
 * @param {string} id - id of a user
 * @param {string} oldPassword - old password of user,
 * @param {string} newPassword - new password of user,
 * @return {promis} promise of updated user
 */
const changePassword = async (id, { oldPassword, newPassword }) => {
    let user = await User.findById(id);
    if (!user) {
        throw notFound();
    }
    let currentPassword = user.password;

    const isMatched = await hasMatched(oldPassword, currentPassword);

    if (!isMatched) {
        throw badRequest("invalid password");
    }
    const password = await generateHash(newPassword);

    user.password = password;

    return user.save();
};

/** check ,,,this is he or not ?
 * @param {string} id - user id in params
 * @param {string} userId - requested user id
 * @return {boolean} -
 */
const checkOwnership = async ({ id, userId }) => {
    const user = await findUserById(id);
    if (!user) {
        throw notFound("User not found");
    }
    if (user.id === userId) {
        return true;
    }
    return false;
};
module.exports = {
    create,
    count,
    findAll,
    findUserById,
    findUserByEmail,
    updateProperties,
    removeItem,
    isUserExist,
    getAllBooks,
    getAllReviews,
    getAllCarts,
    getAllOrders,
    changePassword,
    checkOwnership,
};
