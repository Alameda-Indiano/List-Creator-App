import { createSlice } from "@reduxjs/toolkit";

export const LoginUser = createSlice({
    name: "LoginUser",
    initialState: {
        isAuthenticated: localStorage.getItem("token")
    },
    reducers: {
        handleLogin( state ){
            return {
                ...state,
                isAuthenticated: true
            };
        },
        logout( state ){
            return {
                ...state,
                isAuthenticated: false
            };
        },
    },
});

export default LoginUser.reducer;
export const { handleLogin, logout } = LoginUser.actions;