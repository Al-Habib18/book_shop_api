/** @format */

require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectDB } = require("./db");

const server = http.createServer(app);

let PORT = process.env.PORT || 4000;

const main = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
            // seedUser();  we used this for making fake users
        });
    } catch (e) {
        console.log("Database error");
        console.log(e);
    }
};

main();
