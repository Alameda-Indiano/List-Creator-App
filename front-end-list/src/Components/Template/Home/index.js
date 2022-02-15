import React, { useContext, useEffect } from "react";

import { ContextAlert } from "../../../Context/Alert_Template";
import { ContextExitHome } from "../../../Context/Exit_Home";
import { useNavigate } from "react-router-dom";

import { Alerts } from "../../Alerts";

import img from "../../../Assets/img/img.png";
import "./Sass/Home.css";

export const Template = ({ children, reloadingERR }) => {
    const { isExitHome, setIsExitHome, transitionExit, setTransitionExit }  = useContext(ContextExitHome);
    const { alert, setAlert, styleAlert } = useContext(ContextAlert);
    
    const { color, title } = styleAlert;

    const navigate = useNavigate();

    const Exit = () => {
        setTransitionExit({ 
          t1: "Transition_Exit 1.3s normal", 
          t2: "Transition_Exit 2s normal", 
          t3: "Transition_Exit_button 1.3s normal"
        });
    
        setTimeout(() => {
            setIsExitHome(false);
            navigate("/");
        }, 1250);
    };

    useEffect(() => {
        setTransitionExit({
          t1: "",
          t2: "",
          t3: ""
        });
    }, [ setTransitionExit ]);

    const setAlertFunction = () => {
        setAlert(false);
    };

    return (
        <div className="Container_Home_Page">
            <div className="Container_Icon" style={{ animation: `${transitionExit.t1}`}}>
            <div className="Container_Alert">
                { alert ?
                    <Alerts 
                    title={title}
                    color={color}
                    setAlert={setAlertFunction}
                    />
                    :
                    ""
                }
            </div>
            {   isExitHome? 
                ""
                :
                <i className="fas fa-home" onClick={Exit} />
            }
            </div>
            <div className="Container_Info" style={{ height: `${reloadingERR? "85%" : "60%"}` }}>
                { children }
            </div>
            <div className="Container_Img" style={{ visibility: `${reloadingERR? "hidden" : "visible"}` }}>
                <img src={img} alt="" />
            </div>
        </div>
    );
};