/** @format */
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");
const OpenApiValidator = require("express-openapi-validator");
const authenticate = require("./authenticate");

const applyMiddleware = (app) => {
    app.use(express.json());
    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
    app.use(
        OpenApiValidator.middleware({
            apiSpec: "./swagger.yaml", // ./swagger.yaml
        })
    );
    //TODO: remove later
    app.use(authenticate);
};

module.exports = applyMiddleware;
