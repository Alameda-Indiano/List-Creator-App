const Users = require("../../Models/Users");
const bcrypt = require("bcryptjs");
const New_Token = require("../../Service/Generete_Token");

exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;    
    
    try {
        const User_Filter = await Users.findOne({ email }).select("+senha");
        
        if(!User_Filter){
            return res.status(207).json({
                err_email: true,
                err_senha: false,
                mensagem: "Usuário não existe! Por favor, verifique seu Email e tente novamente ou cadastre um novo usuário."
            });
        };

        if(!bcrypt.compareSync(senha, User_Filter.senha)){
            return res.status(207).json({
                err_email: false,
                err_senha: true,
                mensagem: "Senha invalida!"
            });
        };

        User_Filter.senha = undefined;

        return res.status(200).json({
            err: false,
            token: New_Token({ id: User_Filter._id })
        });
    } catch (err) {
        if(err) {
            return res.status(207).json({
                err: true,
                mensagem: "Não foi possível realizar o login! Tente novamente."
            });
        };
    };
};