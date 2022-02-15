import api from "../../../Services/api";
import { ValidUser } from "./LoginUser";

export const NewUser = ({new_password, setAlert, setStyleAlert}) => {
    const { email, token, senha } = new_password;
    const user = new_password;

    return (dispatch) => {
        api.post("/New_Password", { email, token, senha })
        .then((res) => {
            if(!res.data.err){
                setStyleAlert({ color: "success", title: "Nova senha armazenada!" });                    
                setAlert(true);
                dispatch(ValidUser(user));
            };
        }).catch((err) => {
            setStyleAlert({ color: "danger", title: "Tete novamente mais tarde!" });                    
            setAlert(true);
            console.log(err)
        });
    };
};