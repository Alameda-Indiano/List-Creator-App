const Users = require("../Models/Users");
const crypto = require("crypto");

exports.GenerateCode = async ({ User }) => {
    const token_reset_email = crypto.randomBytes(4).toString("hex");
            
    const time_token_reset_email = new Date();
    time_token_reset_email.setMinutes(time_token_reset_email.getMinutes() + 10);

    await Users.findByIdAndUpdate(User._id, {
        "$set": {
            time_token_reset_password: time_token_reset_email,
            token_reset_password: token_reset_email
        }
    });  

    return token_reset_email;
};