const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_JWT;

module.exports = (req, res, next) => {
    const token = req.headers["authorization"];

    if(!token){
        return res.status(207).json({
            err: true,
            mensagem: "Por favor, realize login para continuar!",
            mensagem_dev: "O Token deve ser informado no CABEÇALHO (header) da requisição"
        });
    };

    jwt.verify(token, secret, (err, decoded) => {
        if(err){
            return res.status(207).json({
                err: true,
                mensagem: "Sua sessão expirou! Por favor, realize login novamente."
            });
        };

        req.user_id = decoded.id;
        next();
    });
};