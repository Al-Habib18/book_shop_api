/** @format */
const Refresh = require("../../model/Refresh");
const {
    badRequest,
    notFound,
    authenticationError,
} = require("../../utils/error");
const { hasMatched } = require("../../utils/hashing");
const userService = require("../user");
const tokenService = require("../token");
const { generateToken } = require("../token");
const axios = require("axios");

/**  - register service
 * @param {string} name - name of a user
 * @param {string} email - email of a user
 * @param {string} password - password of a user
 * @param {enum} role - role of a user
 * @param {string} account - account of a user
 * @return {Promise} user
 */
const register = async ({
    name,
    email,
    password,
    role = "customer",
    account,
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

/** - login service
 * @param {string} email - email of a user
 * @param {string} password - password of a user
 * @returns {string} accessToken
 */
const login = async ({ email, password, secret }) => {
    if (!email || !password) throw badRequest();
    const user = await userService.findUserByEmail(email);
    if (!user) {
        throw badRequest("Invalid credentials");
    }
    const matched = await hasMatched(password, user.password);

    if (!matched) {
        throw badRequest("Invalid credentials");
    }

    const accessToken = await createAccessToken({ email, password, secret });
    return accessToken;
};

/** -  create a access token
 * @param {string} email - email of a user
 * @returns {string} accessToken
 */
const createAccessToken = async ({ email, secret }) => {
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

    return generateToken({ payload, secret });
};

/** - create a refresh token
 * @param {string} email - email of a user
 * @returns {string} refresh token
 */
const createRefreshToken = async ({ email, secret }) => {
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
    const token = generateToken({ payload, expiresIn: "7d", secret });
    const refreshToken = new Refresh({ email, token });
    await refreshToken.save();

    return refreshToken;
};

/** -  vafiy a refresh token
 * @param {string} refresh_token - refresh_token of a user
 * @returns {object} - decoded object of a refresh token
 */
const verifyRefreshToken = (refresh_token, secret) => {
    if (!refresh_token) throw badRequest();
    const decoded = tokenService.verifyToken(refresh_token, secret);
    return decoded;
};

/** - delete a refresh token
 * @param {string} token - refresh token of a user
 */
const removeRefreshToken = async (token) => {
    if (!token) throw badRequest();
    const refresh = await Refresh.find({ token: token });
    if (refresh.length < 1) {
        throw notFound("Refresh token does not exist");
    }
    return Refresh.findOneAndDelete({ token: token });
};

/** -  check expiration of token
 * @param {string} token - refresh token or access token of a user
 * @returns {boolean}
 */
const isExpiredToken = (token) => {
    return tokenService.isExpired(token);
};

/** - find refresh token by email
 * @param {string} email email of a user
 * @return {string} refesh token
 */
const findRefreshToken = async (email) => {
    if (!email) throw badRequest();
    const refresh = await Refresh.findOne({ email: email });

    if (refresh.length < 1) {
        throw authenticationError();
    }
    return refresh;
};

/**
 * @param {string}
 */
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
