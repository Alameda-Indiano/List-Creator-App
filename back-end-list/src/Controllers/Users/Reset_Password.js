const Users = require("../../Models/Users");
const EmailService = require("../../Service/Generete_Email");
const { EmailResetPassword } = require("../../Mail/Reset_Password");
const crypto = require("crypto");
const { GenerateCode } = require("../../Service/Generete_Code");

module.exports = {
    push_email: async (req, res) => {
        const { email } = req.body;
        
        try {
            const User = await Users.findOne({ email });

            if(!User){
                return res.status(400).json({
                    err: true,
                    mensagem: "O e-mail informado não existe! Por favor, verifique seu e-mail e tente novamente."
                });
            };

            GenerateCode({ User }).then((token_reset_email) => {
                const Email = User.email.toLowerCase();

                const body = EmailResetPassword({ token_reset_email, Email });
    
                try {
                    EmailService.send({to: Email, subject: "Redefinir senha do LIST CREATOR", body: body});
                    
                    return res.status(200).json({
                        err: false,
                        mensagem: `Um e-mail para redefinição de senha foi enviado para ${Email}`
                    });
                } catch (err) {
                    console.log(err);
                };
            
            }).catch((err) => {
                if(err){
                    return res.status(401).send(err);
                };
            });
        } catch (err) {
            if(err){
                return res.status(401).json({
                    err: true,
                    code_err: err,
                    mensagem: "Recarregue a página e tente novamente"
                });
            };
        };
    },
    reset_password: async (req, res) => {
        const { email, senha } = req.body;

        try {
            const User = await Users.findOne({ email });

            if(!User){
                return res.status(400).json({
                    err: true,
                    mensagem: "O e-mail informado não existe! Por favor, verifique seu e-mail e tente novamente."
                });
            };

            User.senha = senha
            await User.save();

            return res.status(200).json({
                err: false,
                mensagem: "Sua senha foi alterada com sucesso"
            });
        } catch (err) {
            if(err) {
                return res.status(401).json({
                    err: true,
                    mensagem: "Não foi possível alterar sua senha! Tente novamente."
                });
            };
        };
    }
};