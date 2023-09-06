/** @format */
const userService = require("../../../../lib/user");

const createItem = async (req, res, next) => {
    const { name, email, password, role, account, address } = req.body;
    try {
        const user = await userService.create({
            name,
            email,
            password,
            role,
            account,
        });

        const response = {
            user: {
                id: user.id,
                name,
                email,
                role,
                account,
            },
            links: {
                self: `api/v1/users/${user.id}`,
            },
        };
        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};
module.exports = createItem;
