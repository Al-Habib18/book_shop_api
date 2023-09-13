/** @format */

const bcrypt = require("bcryptjs");
/**
 * @param {object} payload
 * @param {string} saltRound
 * @returns hash
 */
const generateHash = async (payload, saltRound = 10) => {
    const salt = await bcrypt.genSalt(saltRound);
    return bcrypt.hash(payload, salt);
};

const hasMatched = async (raw, hash) => {
    const result = await bcrypt.compare(raw, hash);
    return result;
};
module.exports = { generateHash, hasMatched };
