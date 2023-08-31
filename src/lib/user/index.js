/** @format */

const User = require("../../model/User");
const defaults = require("../../config/defaults");
const { BadRequest, notFound } = require("../../utils/error");
const { generateHash } = require("../../utils/hashing");

const findUserByEmail = async (email) => {
    const user = await User.findOne({ email: email });
    return user ? user : false;
};

const findUserById = async (id) => {
    if (!id) {
        throw BadRequest("Id is required");
    }
    return await User.findById(id).select("-password");
};

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

const removeItem = async (id) => {
    const user = await findUserById(id);
    if (!user) {
        throw notFound();
    }

    return User.findByIdAndDelete(id);
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
    findUserById,
    updateProperties,
    removeItem,
};
