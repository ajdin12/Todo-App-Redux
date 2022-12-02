import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./todoSlice";

export default configureStore({
    reducer:{
        tasks: taskReducer,
    }
});