import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "./Services/logout_user_service";

import { LoginUser } from "./Pages/LoginUser";
import { HomePage } from "./Pages/Home_Page";
import { CadastrarUser } from "./Pages/CadastrarUser";

import { Maintenance } from "./Pages/Maintenance";

const CustomRoute = ({ children }) => {
    const { isAuthenticated } = useSelector(( store ) => store.LoginUser);

    return  isAuthenticated? children : <Navigate to="/" />
};

export default function RoutesProject() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Login" element={<LoginUser/>} />
                <Route path="/Cadastro" element={<CadastrarUser />} />

                <Route path="/Home" element={ 
                    <CustomRoute>
                        <Maintenance />
                    </CustomRoute> 
                }/>
            </Routes>
        </BrowserRouter>
    );
};