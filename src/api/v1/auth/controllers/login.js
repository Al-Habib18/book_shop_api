/** @format */
const authService = require("../../../../lib/auth");

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        let refresh = {};

        const accessToken = await authService.login({ email, password });

        if (accessToken) {
            refresh = await authService.createRefreshToken({
                email,
            });
        }
        const response = {
            code: 200,
            message: "Login successful",
            data: {
                access_token: accessToken,
                refress_token: refresh.token,
            },
            links: {
                self: req.url,
            },
        };
        res.status(201).json(response);
    } catch (e) {
        next(e);
    }
};

module.exports = login;
// // login.ts

// import { isLoggedIn, setAuthTokens, clearAuthTokens, getAccessToken, getRefreshToken } from 'axios-jwt'
// import { axiosInstance } from './api'

// // 4. Post email and password and get tokens in return. Call setAuthTokens with the result.
// const login2 = async (params: ILoginRequest) => {
//   const response = await axiosInstance.post('/auth/login', params)

//   // save tokens to storage
//   setAuthTokens({
//     accessToken: response.data.access_token,
//     refreshToken: response.data.refresh_token
//   })
// }

// // 5. Remove the auth tokens from storage
// const logout = () => clearAuthTokens()

// // Check if refresh token exists
// if (isLoggedIn()) {
//   // assume we are logged in because we have a refresh token
// }

// // Get access to tokens
// const accessToken = getAccessToken()
// const refreshToken = getRefreshToken()
