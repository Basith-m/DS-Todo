import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice/todoSlice";
import authSlice from "./authSlice/authSlice";

const store = configureStore({
    reducer : {
        todoReducer: todoSlice,
        authReducer: authSlice
    }
})

export default store;