require('dotenv-safe').config();
const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const app = express();

const port = process.env.PORT || process.env.LOCAL_HOST;

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ["GET, PUT, POST, DELETE"],
    allowedHeaders: "Content-Type, Authorization",
    optionsSuccessStatus: 204
}));

const router = require("./Routes/Users");

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
    console.info(`Back-End está ON na porta ${port}`);
});