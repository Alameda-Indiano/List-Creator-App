import { createContext, useState } from "react";

export const ContextExitHome = createContext();

export const ProviderExitHome = ({ children }) => {
    const [ isExitHome, setIsExitHome ] = useState(false);
    const [ transitionExit, setTransitionExit ] = useState({
        t1: "", 
        t2: "", 
        t3: ""
    })
    
    return (
        <ContextExitHome.Provider value={{ isExitHome, setIsExitHome, transitionExit, setTransitionExit }}>
            { children }
        </ContextExitHome.Provider>
    );
};