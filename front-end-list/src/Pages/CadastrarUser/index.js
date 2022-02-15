import React, { useContext, useState } from "react";
import "./Sass/CadastrarUser.css";
import { Template } from "../../Components/Template/Home";

import { NewUser } from "../../Store/FetchActions/Auth/CadastrarUser";

import { useDispatch } from "react-redux";
import { useValidation } from "../../Hooks/Validation";
import { ContextExitHome } from "../../Context/Exit_Home";
import { ContextAlert } from "../../Context/Alert_Template";

import { Loading } from "../../Components/Loading";

export const CadastrarUser = () => {
  const [ isViewPassWord, setIsViewPassWord ] = useState(false);
  const [ isloading, setIsloading ] = useState(false);

  const [ reloadingERR, setReloadingERR ] = useState(false);

  const [ dataUser, setDataUser ] = useState({ 
    name: "", 
    email:"", 
    senha: "",
    repetir_senha: "",
  });

  const [ isValid, setIsValid ] = useState({ 
    name: { err: false, mensagem: "", style: { valid: "", color: "border-color4" } }, 
    email: { err: false, mensagem: "", style: { valid: "", color: "border-color4" } }, 
    senha: { err: false, mensagem: "", style: { valid: "", color: "border-color4" } },
    repetir_senha: { err: false, mensagem: "", style: { valid: "", color: "border-color4" } }
  });
  
  const  dispatch = useDispatch();
  const { ValidationName, ValidationEmail, ValidationPassword, ValidationReplacePassword } = useValidation();
  
  const { transitionExit } = useContext(ContextExitHome);
  const { setAlert, setStyleAlert } = useContext(ContextAlert);
  
  const AddDataUser = (e) => {
    const { name, value } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  };
  
  const AddNewUser = async (e) => {
    e.preventDefault();
    
    const name = ValidationName(dataUser);
    const email = ValidationEmail(dataUser); 
    const senha =  ValidationPassword(dataUser); 
    const repetir_senha = ValidationReplacePassword(dataUser); 

    setIsValid({ 
      name, 
      email, 
      senha, 
      repetir_senha 
    });

    if( window.screen.width <= 630 && name.err && email.err && senha.err){
      setReloadingERR(true);
    } else {
      setReloadingERR(false);
    };

    if(!name.err && !email.err && !senha.err && !repetir_senha.err ){
      setIsloading(true);
      dispatch(NewUser({user: dataUser, setIsValid, setDataUser, setAlert, setStyleAlert, setIsloading}));
    };
  };

  return (
    <Template reloadingERR={reloadingERR}>
      <form className={`row g-3 form`} onSubmit={AddNewUser}>        
        <div className="Container_Header d-flex flex-column" style={{ animation: `${transitionExit.t1}`}}>
          <h1>Novo Usuário</h1>
          <Loading isloading={isloading} />
        </div>
        <div className="col-md-11 form-floating " >
          <div style={{ animation: `${transitionExit.t2}`}} className="Container_Inputs col-md-12 form-floating">
            <input 
              type="text" 
              
              className={`
                form-control 
                bg-color5 
                ${isValid.name.style.color} 
                ${isValid.name.style.valid}
              `} 
              
              id="name" 
              value={dataUser.name} 
              placeholder="Name" 
              name="name" 
              onChange={AddDataUser}
            />
            <label htmlFor="name">Nome</label>
            <div  className="invalid-feedback">
              <h6 className="font-weight-bold">
                { isValid.name.mensagem }
              </h6>
            </div>
          </div>
        </div>
        <div className="col-md-11 form-floating" >
          <div style={{ animation: `${transitionExit.t2}`}} className="Container_Inputs col-md-12 form-floating">
            <input 
              type="email" 
            
              className={`
                form-control 
                ${isValid.email.style.color} 
                bg-color5 
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
          <div style={{ animation: `${transitionExit.t2}`}} className="Container_Inputs col-md-12 form-floating">
            <input 
              type={isViewPassWord? "text" : "password"} 
              
              className={`
                form-control 
                ${isValid.senha.style.color} 
                bg-color5 
                ${isValid.senha.style.valid}
              `}

              id="password" value={dataUser.senha} 
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
        <div className="col-md-11 form-floating" >
          <div style={{ animation: `${transitionExit.t2}`}} className="Container_Inputs col-md-12 form-floating">
            <input 
              type={isViewPassWord? "text" : "password"} 
              
              className={`
                form-control 
                bg-color5 
                ${isValid.senha.style.color} 
                ${isValid.repetir_senha.style.valid}
              `}

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
            <label htmlFor="password">Repetir Senha</label>
            <div  className="invalid-feedback">
              <h6 className="font-weight-bold">
                { isValid.repetir_senha.mensagem }
              </h6>
            </div>
          </div>
        </div>
        <button  style={{ animation: `${transitionExit.t3}`}}  className="btn btn-outline-color4 btn-lg col-md-11 mt-4">Cadastrar-se</button>
      </form>
    </Template>
  )
};