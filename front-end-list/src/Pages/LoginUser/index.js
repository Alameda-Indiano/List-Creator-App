import React, { useContext, useState } from "react";
import "./Sass/Login_User.css";
import api from "../../Services/api";

import { Template } from "../../Components/Template/Home";
import { ValidToken } from "../../Components/Modal/ValidToken";
import { ModalResetToken } from "./Reset_Password";
import { Loading } from "../../Components/Loading";

import { ValidUser } from "../../Store/FetchActions/Auth/LoginUser";

import { useDispatch } from "react-redux";
import { useValidation } from "../../Hooks/Validation";

import { ContextExitHome } from "../../Context/Exit_Home";
import { ContextAlert } from "../../Context/Alert_Template";

export const LoginUser = () => {
  const [ isViewPassWord, setIsViewPassWord ] = useState(false);
  const [ isModelOn, setIsModelOn ] = useState(false);
  const [ isSecondaryModalOn, setIsSecondaryModalOn ] = useState(false);
  const [ transferirCode, setTransferirCode ] = useState("");

  const [ dataUser, setDataUser ] = useState({ 
    email:"", 
    senha: "" 
  });

  const [ isloading, setIsloading ] = useState(false);

  const [ isValid, setIsValid ] = useState({ 
    email: { err: false, mensagem: "", style: { valid: "", color: "border-color4" } }, 
    senha: { err: false, mensagem: "", style: { valid: "", color: "border-color4" } } 
  });

  const  dispatch = useDispatch();
  const { ValidationEmail } = useValidation();

  const { transitionExit } = useContext(ContextExitHome);
  const { setAlert, setStyleAlert } = useContext(ContextAlert);

  const AddDataUser = (e) => {
    const { name, value } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  };

  const HandleLogin = (e) => {
    e.preventDefault();
    setIsloading(true);
    setIsValid({ email: ValidationEmail(dataUser),  senha: { err: false, mensagem: "", style: { valid: "", color: "border-color4" } }});
    dispatch(ValidUser(dataUser, setIsValid, setIsloading, setDataUser, setAlert, setStyleAlert ));
  };

  const isModalOff = () => {
    setIsModelOn(false);
  };

  return (
    <Template>
      <form className={`row g-3 form`} onSubmit={HandleLogin}>        
        <div className="Container_Header d-flex flex-column" style={{ animation: `${transitionExit.t1}`}}>
          <h1>Realizar Login</h1>
          <Loading isloading={isloading}/>
        </div>
        <div className="col-md-11 form-floating" >
          <div style={{ animation: `${transitionExit.t2}`}} className="Container_Inputs col-md-12 form-floating mt-4">
            <input 
              type="email" 
              
              className={`
                form-control 
                bg-color5 
                ${isValid.email.style.color} 
                ${isValid.email.style.valid}
              `}

              id="email" 
              value={dataUser.email} 
              placeholder="name@example.com" 
              name="email" 
              onChange={AddDataUser}
            />
            <label htmlFor="email">Email</label>
            <div  className="invalid-feedback">
              <h6 className="font-weight-bold">
                { isValid.email.mensagem }
              </h6>
            </div>
          </div>
        </div>
        <div className="col-md-11 form-floating" >
          <div style={{ animation: `${transitionExit.t2}`}} className="Container_Inputs col-md-12 form-floating mt-4">
            <input 
              type={isViewPassWord? "text" : "password"} 
              
              className={`
                form-control 
                bg-color5 
                ${isValid.senha.style.color} 
                ${isValid.senha.style.valid}
              `} 
              
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
            <label htmlFor="password">Senha</label>
            <div  className="invalid-feedback">
              <h6 className="font-weight-bold">
                { isValid.senha.mensagem }
              </h6>
            </div>
          </div>
        </div>
        <div className="ResetPassword col-11 d-flex">
        {
          isValid.senha.err === true && isValid.email.err === false? 
          <button  
            style={{ animation: `${transitionExit.t3}`}}   
            data-bs-toggle="modal" 
            className="btn btn-outline-color4 btn-md col-md-3 mt-3"
            onClick={(e) => {
              e.preventDefault();
              api.post("/Reset_Password", { email: dataUser.email });
              setIsModelOn(true);
            }}
            >Redefinir Senha!</button>
          :
          ""
        }

        { isModelOn?
            <ValidToken
              title={"Validar Email!"}
              email={dataUser.email}
              stop={true}
              setTransferirCode={setTransferirCode}
              exitText={"Cancelar"}
              nextText={"Avançar"}
              isModalOff={isModalOff}
              setIsSecondaryModalOn={setIsSecondaryModalOn}
              setAlert={setAlert} 
              setStyleAlert={setStyleAlert}
            />
          : !isModelOn && isSecondaryModalOn ? 
            <ModalResetToken
              setAlert={setAlert} 
              setStyleAlert={setStyleAlert}
              email={dataUser.email}
              transferirCode={transferirCode}
              setIsSecondaryModalOn={setIsSecondaryModalOn}
            />
          :
          ""
        }

        </div>
        <button  style={{ animation: `${transitionExit.t3}`}}  className="btn btn-outline-color4 btn-lg col-md-11 mt-5">Realizar Login</button>
      </form>
    </Template>
  )
};