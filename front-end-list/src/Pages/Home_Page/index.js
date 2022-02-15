import React, { useContext, useEffect, useState } from "react";

import "./Sass/Home_Page.css";
import { Template } from "../../Components/Template/Home";

import { ContextExitHome } from "../../Context/Exit_Home";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const [ Animation, setAnimation ] = useState("");

    const { setIsExitHome } = useContext(ContextExitHome);
    const navigate = useNavigate();

    const Animation_Exit_Login = () => {
        setAnimation("Transition_Exit 2s normal");

        setTimeout(() => {
            setIsExitHome(false);
            navigate("/Login")
        }, 1900);
    };

    const Animation_Exit_Cadastro = () => {
        setAnimation("Transition_Exit 2s normal");
        setTimeout(() => {
            setIsExitHome(false);
            navigate("/Cadastro");
        }, 1900);
    };

    useEffect(() => {
        setAnimation("");
        setIsExitHome(true);
    }, [ setIsExitHome ]);
    
    let width = window.screen.width;

    return (
        <Template>
            <p style={{ animation: `${Animation}` }}>O <strong>List Creator</strong> torna sua vida muito mais organizada! Utilize nosso site para criar listas e nunca mais se esquecer do que comprar no Super Mercado ou daquela reunião importante de trabalho e você ainda pode delegar tarefas as outras pessoas, tudo isso on-line e gratuito!</p>
            
            <div style={{ animation: `${Animation}` }} className="Container_Buttons">
                <button className={`btn btn-outline-color4 ${width <= 320? "btn-md" : "btn-lg"}`} onClick={Animation_Exit_Login}>Realizar login</button>
                <button className={`btn btn-outline-color4 ${width <= 320? "btn-md" : "btn-lg"}`} onClick={Animation_Exit_Cadastro}>Criar conta</button>
            </div>
        </Template>
    );
};