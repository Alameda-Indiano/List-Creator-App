import api from "../../../Services/api";

import { handleLogin } from "../../Slices/LoginUser";

export const ValidUser = (user, setIsValid, setIsloading, setDataUser, setAlert, setStyleAlert) => {
    const { email, senha } = user;

    return (dispatch) => {
        api.post("/Login", { email, senha } )
        .then((res) => {
            localStorage.removeItem("token");
            
            if(!res.data.err_email && !res.data.err_senha){
                localStorage.setItem("token", JSON.stringify(res.data.token));
                api.defaults.headers.common['Authorizarion'] = res.data.token;
                window.location.pathname = "/Home";
                dispatch(handleLogin());
                
                setAlert(true); 
                setIsloading(false);
                setStyleAlert({ color: "success", title: "Realizando Login !" });
                setDataUser({ email: "", senha: "" });
            } else {
                if(res.data.err_email){
                    setAlert(true); 
                    setIsloading(false);
                    setStyleAlert({ color: "danger", title: "Verifique seu Email !" });

                    setIsValid({ 
                        email: { err: true, mensagem: res.data.mensagem, style: { valid: "is-invalid", color: "" }},  
                        senha: { err: true, mensagem: "", style: { valid: "", color: "border-color4" }} 
                    });    
                } 
                if (res.data.err_senha){
                    setAlert(true); 
                    setIsloading(false);
                    setStyleAlert({ color: "danger", title: "Verifique sua Senha !" });

                    setIsValid({ 
                        email: { err: false, mensagem: "", style: { valid: "is-valid", color: "border-color4" }},  
                        senha: { err: true, mensagem: res.data.mensagem, style: { valid: "is-invalid", color: "" }} 
                    });    
                };
            };
        }).catch((err) => {
            setIsloading(false);
            console.log(err);
        }); 
    };
};
