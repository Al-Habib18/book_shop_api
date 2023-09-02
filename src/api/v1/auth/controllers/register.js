/** @format */

const authService = require("../../../../lib/auth");
const { generateToken } = require("../../../../lib/token");

const register = async (req, res, next) => {
    const { name, email, password, role, account } = req.body;

    try {
        const user = await authService.register({
            name,
            email,
            password,
            role,
            account,
        });

        // generate access token
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const accessToken = generateToken({ payload });

        //  response
        const response = {
            code: 201,
            messgage: "Singup successful",
            data: {
                access_token: accessToken,
            },
            links: {
                login: "api/v1/auth/login",
            },
        };

        res.status(201).send(response);
    } catch (e) {
        next(e);
    }
};

module.exports = register;
