/** @format */

const isBig = (numbr) => {
    if (numbr > 5) {
        return true;
    } else {
        return false;
    }
};

const number = (numbr) => {
    const result = isBig(numbr);
    if (result) {
        return "Big";
    }
    return "Small";
};

module.exports = {
    number,
    isBig,
};
