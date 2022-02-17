const express = require("express");
const routerUser = express.Router();

const { Verify_Code } = require("../Middlewares/Verify_Code");

const { addUsers } = require("../Controllers/Users/New_User");
const { loginUser } = require("../Controllers/Users/Login_User");
const { push_email, reset_password } = require("../Controllers/Users/Reset_Password");

routerUser.post("/New_User", addUsers);
routerUser.post("/Login", loginUser);
routerUser.post("/Reset_Password", push_email);
routerUser.post("/New_Password", Verify_Code, reset_password);

module.exports = routerUser;