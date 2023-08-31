/** @format */

const User = require("../../model/User");
const defaults = require("../../config/defaults");
const { BadRequest } = require("../../utils/error");
const { generateHash } = require("../../utils/hashing");

const findUserByEmail = async (email) => {
    const user = await User.findOne({ email: email });
    return user ? user : false;
};

const isUserExist = async (email) => {
    const user = await findUserByEmail(email);
    return user ? true : false;
};

// Create a new user
const create = async ({
    name,
    email,
    password,
    role = "customer",
    account = "",
}) => {
    if (!name || !email || !password) {
        throw BadRequest();
    }

    let hasUser = await isUserExist(email);
    if (hasUser) {
        throw BadRequest("User already exists");
    }

    password = await generateHash(password);

    const user = new User({ name, email, password, role, account });

    return user.save();
};

// find all users
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

const count = async ({ search = "" }) => {
    const filter = {
        name: { $regex: search, $options: "i" },
    };
    const totalUsers = await User.count(filter);
    return totalUsers;
};

module.exports = {
    create,
    count,
    findAll,
};
