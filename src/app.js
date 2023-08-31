/** @format */

const express = require("express");
const applyMiddleware = require("./middleware");
const routes = require("./routes");

// import seed for making fake users
// const { seedUser } = require("./seed");

// express app
const app = express();

applyMiddleware(app);
app.use(routes);

app.get("/health", (req, res) => {
    res.status(200).json({
        health: "OK",
        user: req.user,
    });
});

app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

module.exports = app;
