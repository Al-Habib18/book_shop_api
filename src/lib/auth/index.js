/** @format */
const Refresh = require("../../model/Refresh");
const {
    badRequest,
    notFound,
    authenticationError,
} = require("../../utils/error");
const { generateHash, hasMatched } = require("../../utils/hashing");
const userService = require("../user");
const tokenService = require("../token");
const { generateToken } = require("../token");
const axios = require("axios");
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

    const accessToken = await createAccessToken({ email, password });
    return accessToken;
};

const createAccessToken = async ({ email }) => {
    const user = await userService.findUserByEmail(email);

    if (!user) {
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

const createRefreshToken = async ({ email }) => {
    const user = await userService.findUserByEmail(email);
    if (!user) {
        throw badRequest("Invalid credentials");
    }
    const payload = {
        // id: user.id,
        name: user.name,
        email: user.email,
        // role: user.role,
    };
    const token = generateToken({ payload, expiresIn: "7d" });
    const refreshToken = new Refresh({ email, token });
    await refreshToken.save();

    return refreshToken;
};

const verifyRefreshToken = (refresh_token) => {
    const decoded = tokenService.verifyToken(refresh_token);
    return decoded;
};

const removeRefreshToken = async ({ token = "" }) => {
    const refresh = await Refresh.find({ token: token });
    if (refresh.length < 1) {
        throw notFound("Refresh token does not exist");
    }
    await Refresh.findOneAndDelete({ token: token });
};

const isExpiredToken = (token) => {
    return tokenService.isExpired(token);
};
// find refresh token by emainl
const findRefreshToken = async (email) => {
    const refresh = await Refresh.findOne({ email: email });

    if (refresh.length < 1) {
        throw authenticationError();
    }
    return refresh;
};

const requestRefresh = async ({ refresh_token }) => {
    return axios
        .post(`http://localhost:4000/api/v1/auth/refresh`, { refresh_token })
        .then((response) => response.data.access_token);
};
module.exports = {
    register,
    login,
    createAccessToken,
    createRefreshToken,
    requestRefresh,
    verifyRefreshToken,
    removeRefreshToken,
    isExpiredToken,
    findRefreshToken,
};
