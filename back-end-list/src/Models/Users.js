const DataBase = require("../DataBase/Base");
const bcrypt = require("bcryptjs");

const SchemaUsers = new DataBase.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    time_token_reset_password: {
        type: Date,
        select: false
    },
    token_reset_password: {
        type: String,
        select: false
    },
    senha: {
        type: String,
        require: true,
        select: false
    },
    creatdAt: {
        type: Date,
        default: Date.now
    }
});

SchemaUsers.pre("save", function(next){
    const Senha_Criptografada = bcrypt.hashSync(this.senha, 10);
    this.senha = Senha_Criptografada;
    next();
});

const Users = DataBase.model("users", SchemaUsers);
module.exports = Users;