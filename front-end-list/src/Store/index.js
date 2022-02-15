import { configureStore } from "@reduxjs/toolkit";

import LoginUser from "./Slices/LoginUser";

export default configureStore({
    reducer: {
        LoginUser
    }
});