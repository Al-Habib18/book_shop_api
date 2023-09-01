/** @format */

const findAll = async (req, res, next) => {
    res.status(200).json({ msg: "findAll" });
};

module.exports = findAll;
