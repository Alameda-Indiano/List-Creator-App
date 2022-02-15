import React, { useEffect } from "react";

import { Alert } from "react-bootstrap";
import "./Sass/Animation.css";

export const Alerts = ({ title, color, setAlert }) => {
    
    useEffect(() => {
        setTimeout(() => {
            setAlert(false);
        }, 2000);
    }, [ setAlert ]);
    
    return (
        <Alert variant={color} className="Alert">
            <Alert.Heading>
                <h5>{title}</h5>
            </Alert.Heading>
        </Alert>
    );
};
