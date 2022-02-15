const Users = require("../Models/Users");

exports.Verify_Code = async (req, res, next) => {
    const { token, email, stop } = req.body;

    try {
        const User = await Users.findOne({ email }).select("+time_token_reset_password token_reset_password");

        if (!User){
            return res.status(207).json({
                err: true,
                mensagem: "O e-mail informado não existe! Por favor, verifique seu e-mail e tente novamente."
            });
        };

        if(!token){
            return res.status(400).json({
                err: true,
                mensagem: "O código de verificação não foi informado"
            });
        };

        if(token !== User.token_reset_password){
            return res.status(207).json({
                err: true,
                mensagem: "Código de verificação invalido!"
            }); 

        };

        if(new Date() > User.time_token_reset_password){
            return res.status(207).json({
                err: true,
                mensagem: "Seu código de verificação expirou!"
            });
        };

        if(stop) {
            return res.status(200).json({
                err: false,
                mensagem: "Código Valido"
            });
        };

        next();
    } catch (err) {
        return res.status(401).send(err);
    };
};