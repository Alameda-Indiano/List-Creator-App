const TabelaUsers = require("../../Models/Users");

exports.addUsers = async (req, res) => {
    const { email } = req.body;

    try {
        if(await TabelaUsers.findOne({ email })){
            return res.status(207).json({
                err: true,
                mensagem: `Este Email já esta sendo utilizado! Por favor, faça login ou adicione outro endereço de Email.`
            });
        };

        const New_User = await TabelaUsers.create(req.body);

        New_User.senha = undefined;

        return res.status(200).json({
            err: false,
            mensagem: "Usuário cadastrado com sucesso!",
            new_user: New_User
        })
    } catch (err) {
        if(err){
            return res.status(401).json({
                err: true,
                mensagem: "Erro! Não foi possível criar um novo usuário."
            });
        };
    };
};