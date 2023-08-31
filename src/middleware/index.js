/** @format */
const express = require("express");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");
const OpenApiValidator = require("express-openapi-validator");

const applyMiddleware = (app) => {
    app.use(express.json());
    app.use(morgan("dev"));
    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
    app.use(
        OpenApiValidator.middleware({
            apiSpec: "./swagger.yaml",
        })
    );
};

module.exports = applyMiddleware;
