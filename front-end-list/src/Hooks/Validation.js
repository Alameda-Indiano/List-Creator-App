export const useValidation = () => {
    const ValidationEmail = (data_user) => {
        const { email } = data_user;
        let isValid = /\S+@\S+\.\S+/;
        
        if(!isValid.test(email) || email === ""){
            const Error = {
                err: true,
                mensagem: "Email invalido! Certifique-se que seu Email contenha @ e .",
                style: {
                    valid: "is-invalid",
                    color: ""
                }
            };
            return Error;
        };
        const Error = {
            err: false,
            mensagem: "",
            style: {
                valid: "is-valid",
                color: "border-color4"
            }
        };
        return Error;
    };

    const ValidationPassword = (data_user) => {
        const { senha } = data_user;
        let isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z\d]{8,30}$/

        if(!isValid.test(senha) || senha === ""){
            const Error = {
                err: true,
                mensagem: "Sua senha deve conter o mínimo de oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula e um número",
                style: {
                    valid: "is-invalid",
                    color: ""
                }
            };
            return Error;
        };

        const Error = {
            err: false,
            mensagem: "",
            style: {
                valid: "is-valid",
                color: "border-color4"
            }
        };
        return Error;
    };

    const ValidationReplacePassword = (data_user) => {
        const { senha, repetir_senha } = data_user;

        if(senha !== repetir_senha || repetir_senha === "" ){
            const Error = {
                err: true,
                mensagem: "Por favor, certifique-se que suas senhas coincidem!",
                style: {
                    valid: "is-invalid",
                    color: ""
                }
            };
            return Error;
        };

        const Error = {
            err: false,
            mensagem: "",
            style: {
                valid: "is-valid",
                color: "border-color4"
            }
        };
        return Error;
    };

    const ValidationName = (data_user) => {
        const { name } = data_user;
        let isValid = /^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/;

        if(!isValid.test(name) || name === ""){
            const Error = {
                err: true,
                mensagem: "Este campo é obrigatório!",
                style: {
                    valid: "is-invalid",
                    color: ""
                }
            };
            return Error;
        };
        const Error = {
            err: false,
            mensagem: "",
            style: {
                valid: "is-valid",
                color: "border-color4"
            }
        };
        return Error;
    };

    return { ValidationEmail, ValidationPassword, ValidationReplacePassword, ValidationName };
};