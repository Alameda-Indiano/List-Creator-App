import { logout } from "../Store/Slices/LoginUser";

export const LogoutUser = () => {
    localStorage.removeItem("token");
    return logout();
};