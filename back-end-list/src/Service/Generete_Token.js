const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_JWT;

module.exports = (params = {}) => {
    return jwt.sign(params, secret, {
        expiresIn: 7200
    });
};