import React, { useState, useEffect } from "react";

import api from "../../../Services/api";
import { Modal, Button } from "react-bootstrap";

export const ValidToken = ({ 
    title, 
    email, 
    stop, 
    exitText, 
    nextText, 
    isModalOff, 
    setIsSecondaryModalOn, 
    setTransferirCode,
    setAlert,
    setStyleAlert 
}) => {
    const [ show, setShow ] = useState(false);
    const [ token, setToken ] = useState("");

    const [ isValid, setIsValid ] = useState({
        mensagem: "", 
        style: { 
            valid: "", 
            color: "border-color4" 
        },
    });

    useEffect(() => {
        setShow(true);
    }, []);

    const handleClose = () => {
        setShow(false);
        setTransferirCode(token);
        isModalOff();
        setIsSecondaryModalOn(true);
    };

    const ValidToken = () => { 
        const isValue = token.trim();
        const Value = isValue.length;

        if(isValue !== "" && Value === 8){
            api.post("/New_Password", { email, token, stop })
            .then((res) => {
                if(!res.data.err){        
                    setIsValid({ 
                        mensagem: res.data.mensagem, 
                        style: { 
                            valid: "is-valid", 
                            color: "border-color4" 
                        }
                    });
                    
                    setAlert(true);
                    setStyleAlert({ title: "Código Válido", color: "success" }); 
                    return handleClose();
                };

                setStyleAlert({ color: "danger", title: "Código Invalido!" });
                setAlert(true);
                setIsValid({
                    mensagem: res.data.mensagem, 
                    style: { 
                        valid: "is-invalid", 
                        color: "" 
                    }
                }); 
            }).catch((err) => {
                console.log(err)
            });
        };

        if(isValue === ""){
            setStyleAlert({ color: "danger", title: "Código Invalido!" });
            setAlert(true);
            setIsValid({
                mensagem:`Por favor, nos informe o código de verificação enviado para o seu email antes de prosseguir`, 
                style: { 
                    valid: "is-invalid", 
                    color: "" 
                }   
            });
        } else if(Value !== 8){
            setStyleAlert({ color: "danger", title: "Código Invalido!" });
            setAlert(true);
            setIsValid({
                mensagem:`O código de verificação deve possuir 8 dígitos`, 
                style: { 
                    valid: "is-invalid", 
                    color: "" 
                }   
            });  
        };
    };

    return (
        <>
            <Modal show={show} centered>
                <Modal.Header closeButton onClick={isModalOff}>
                    <Modal.Title>
                        {title}    
                    </Modal.Title>                    
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center w-100">
                        <h6>Um código de verificação foi enviado para</h6> <p>{email}</p>   
                    </div>
                    <hr />
                    <div className="col-md-12 form-floating w-100 mb-5 mt-5">
                        <div 
                            style={{ textAlign: "center" }} 
                            className={`Container_Inputs d-flex align-items-center justify-content-center flex-column form-floating`}>

                            <input 
                                type="text" id="token" placeholder="senha" name="senha"
                                onChange={({ target }) => setToken(target.value)}    
                                className={`form-control text-centermb-4 ${isValid.style.color} ${isValid.style.valid}`}
                                style={{width: "180px", textAlign: "center"}}/>
                            
                            <label htmlFor="token" className="w-100 d-flex justify-content-center">Código de Verificação</label>
                            <div className="invalid-feedback">
                                <h6 className="font-weight-bold">
                                    { isValid.mensagem }
                                </h6>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="text-center w-100">
                        <h6>Não se esqueça de verificar sua caixa de spam!</h6>   
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-outline-danger" onClick={isModalOff}>{exitText}</Button>
                    <Button variant="btn btn-outline-color4" onClick={ValidToken}>{nextText}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};