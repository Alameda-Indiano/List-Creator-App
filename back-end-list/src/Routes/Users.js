const express = require("express");
const router = express.Router();
const isPrivate = require("../Middlewares/Verify_Token");
const { Verify_Code } = require("../Middlewares/Verify_Code");

const { addUsers } = require("../Controllers/Users/New_User");
const { loginUser } = require("../Controllers/Users/Login_User");
const { push_email, reset_password } = require("../Controllers/Users/Reset_Password");

router.post("/New_User", addUsers);
router.post("/Login", loginUser);
router.post("/Reset_Password", push_email);
router.post("/New_Password", Verify_Code, reset_password);

//Testando:
router.get("/Test_Login_True", isPrivate, (req, res) => {
    return res.status(200).send("Você está logado")
})

module.exports = router;