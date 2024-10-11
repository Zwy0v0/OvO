//组合redux模块，导出store
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";

export default configureStore({
    reducer:{
        user:userReducer
    }
})