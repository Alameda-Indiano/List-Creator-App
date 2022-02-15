import React, { createContext, useState } from "react";

export const ContextAlert = createContext();

export const ProviderAlertTemplate = ({ children }) => {
    const [ alert, setAlert ] = useState(false);
    const [ styleAlert, setStyleAlert ] = useState({
        title: "",
        color: ""
    });

    return (
        <ContextAlert.Provider value={{ alert, setAlert, styleAlert, setStyleAlert }}>
            {children}
        </ContextAlert.Provider>
    );
};