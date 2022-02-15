import React, { useState, useEffect } from "react";
import "./Sass/Reset_Password.css";

import { useDispatch } from "react-redux";
import { NewUser } from "../../../Store/FetchActions/Auth/Reset_Password";

import { Modal, Button } from "react-bootstrap";
import { useValidation } from "../../../Hooks/Validation";

export const ModalResetToken = ({ email, transferirCode, setIsSecondaryModalOn, setAlert, setStyleAlert }) => {
    const [ show, setShow ] = useState(false);
    const [ isViewPassWord, setIsViewPassWord ] = useState(false);

    const dispatch = useDispatch();

    const ExitModal = () => {
      setIsSecondaryModalOn(false);
    };

    const [ isValid, setIsValid ] = useState({ 
      senha: { 
        mensagem: "", 
        style: { 
            valid: "", 
            color: "border-color4" 
        }
      },
      repetir_senha: { 
        mensagem: "", 
        style: { 
            valid: "", 
            color: "border-color4" 
        }
      }
    });

    const [ dataUser, setDataUser ] = useState({  
      senha: "",
      repetir_senha: "",
    });

    const { ValidationPassword, ValidationReplacePassword } = useValidation();
    
    const AddDataUser = (e) => {
      const { name, value } = e.target;
      setDataUser({ ...dataUser, [name]: value });
    };

    const handleClose = (e) => {
      e.preventDefault();
      const senha = ValidationPassword(dataUser);
      const repetir_senha = ValidationReplacePassword(dataUser);

      setIsValid({
        senha,
        repetir_senha 
      });

      if(!senha.err && !repetir_senha.err){
        const new_password = { email, token: transferirCode, senha: dataUser.senha };
        dispatch(NewUser({ new_password, setAlert, setStyleAlert }));
      };
    };

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <>
        <Modal show={show} centered>
            <Modal.Header closeButton onClick={ExitModal}>
                <Modal.Title>Nova Senha</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="col-md-11 form-floating" >
              <div 
                className="
                  Container_Inputs 
                  d-flex 
                  align-items-center 
                  justify-content-center 
                  flex-column 
                  form-floating
                  mt-4
                  mb-4
                  "

                style={{ textAlign: "center" }}
              >
                
                <input 
                  type={isViewPassWord? "text" : "password"} 
                  
                  className={`
                    form-control
                    ${isValid.senha.style.color} 
                    ${isValid.senha.style.valid}  
                  `} 
                  
                  style={{
                    width: "210px",
                  }}

                  id="password" 
                  value={dataUser.senha} 
                  placeholder="senha" 
                  name="senha" 
                  onChange={AddDataUser}
                  />

                <div className="Container_Icon_View">
                  {isViewPassWord?
                    <i className="fas fa-eye-slash" onClick={() => setIsViewPassWord(false)}/>
                    :
                    <i className="fas fa-eye" onClick={() => setIsViewPassWord(true)}/>
                  }
                </div>
                <label htmlFor="password" className="Label d-flex justify-content-center">Senha</label>
                <div  className="invalid-feedback mt-4 mb-4">
                  <h6 className="font-weight-bold">
                    { isValid.senha.mensagem }
                  </h6>
                </div>
              </div>
            </div>
              <div className="col-md-11 form-floating" >
                <div 
                    className="
                      Container_Inputs 
                      mb-4
                      d-flex 
                      align-items-center 
                      justify-content-center 
                      flex-column 
                      form-floating"

                    style={{ textAlign: "center" }}
                >
                  
                  <input 
                    type={isViewPassWord? "text" : "password"} 
                    
                    className={`
                      form-control 
                      ${isValid.repetir_senha.style.color}
                      ${isValid.repetir_senha.style.valid}
                    `}
                    
                    style={{
                      width: "210px",
                    }}

                    id="repetir_senha" 
                    value={dataUser.repetir_senha} 
                    placeholder="Repetir Senha" 
                    name="repetir_senha" 
                    onChange={AddDataUser}
                  />

                  <div className="Container_Icon_View">
                    {isViewPassWord?
                      <i className="fas fa-eye-slash" onClick={() => setIsViewPassWord(false)}/>
                      :
                      <i className="fas fa-eye" onClick={() => setIsViewPassWord(true)}/>
                    }
                  </div>
                  <label htmlFor="password" className="Label ms-4 d-flex justify-content-center">Repetir Senha</label>
                  <div  className="invalid-feedback mt-4">
                    <h6 className="font-weight-bold">
                      { isValid.repetir_senha.mensagem }
                    </h6>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-outline-danger" onClick={ExitModal}>
                Cancelar
                </Button>
                <Button variant="btn btn-outline-color4" onClick={handleClose}>
                Nova Senha
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};