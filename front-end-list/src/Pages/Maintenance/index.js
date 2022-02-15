import React from "react";

export const Maintenance = () => {
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "orange",

        }}>
            <i className="fas fa-tools" style={{
                fontSize: "50px",
                padding: "20px"
            }}/>
            <h1>Em desenvolvimento!</h1>
        </div>
    );
};