/** @format */

const { badRequest } = require("../../utils/error");
const { generateHash, hasMatched } = require("../../utils/hashing");
const userService = require("../user");
const { generateToken } = require("../token");

// register service
const register = async ({
    name,
    email,
    password,
    role = "customer",
    account = "",
}) => {
    const hasUser = await userService.isUserExist(email);
    if (hasUser) {
        throw badRequest("User already exists");
    }

    const user = await userService.create({
        name,
        email,
        password,
        role,
        account,
    });

    return user;
};

// login service
const login = async ({ email, password }) => {
    const user = await userService.findUserByEmail(email);
    if (!user) {
        throw badRequest("Invalid credentials");
    }

    const matched = await hasMatched(password, user.password);

    if (!matched) {
        throw badRequest("Invalid credentials");
    }

    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    return generateToken({ payload });
};

module.exports = { register, login };
