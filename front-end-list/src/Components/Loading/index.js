import React from "react";
import "./Sass/loading.css";

export const Loading = ({ isloading }) => {
    return (
        <>
            { isloading ?
                <div className="Container_Loading">
                    <i className="fas fa-sync text-color3" style={{ fontSize: "18px" }}/>
                </div>
                :
                ""
            }
        </>
    );
};