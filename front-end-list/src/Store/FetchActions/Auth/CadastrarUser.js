import api from "../../../Services/api";

import { ValidUser } from "./LoginUser";
import { useValidation } from "../../../Hooks/Validation";

export const NewUser = ({user, setIsValid, setIsloading, setDataUser, setAlert, setStyleAlert}) => {
    const { name, email, senha } = user;
    const { ValidationName, ValidationPassword, ValidationReplacePassword } = useValidation();

    return (dispatch) => {
        api.post("/New_User", { name, email, senha })
        .then((res) => {
            if(res.data.err === true ){
                const Error = {
                    err: true,
                    mensagem: res.data.mensagem,
                    style: {
                        valid: "is-invalid",
                        color: ""
                    }
                };

                setIsValid({ 
                    name: ValidationName(user),
                    email: Error, 
                    senha:  ValidationPassword(user),
                    repetir_senha: ValidationReplacePassword(user)
                });
                
                setIsloading(false);
                setStyleAlert({ color: "danger", title: "Tente Novamente !" });                    
                setAlert(true);
            } else {
                setStyleAlert({ color: "success", title: "Usuário Cadastrado !" });                    
                setAlert(true);
                setDataUser({ name: "", email:"", senha: "", repetir_senha: "" });
                
                setIsloading(false);
                dispatch(ValidUser(user));
            };
        }).catch((err) => {
            setIsloading(false);

            if(err){
                console.log("Servidor OFF, tente novamente mais tarde!");
            };
        }); 
    };
};