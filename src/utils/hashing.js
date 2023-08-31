/** @format */

const bcrypt = require("bcryptjs");

const generateHash = async (payload, saltRound) => {
    const salt = await bcrypt.genSalt(saltRound);
    return bcrypt.hash(payload, salt);
};
module.exports = { generateHash };
