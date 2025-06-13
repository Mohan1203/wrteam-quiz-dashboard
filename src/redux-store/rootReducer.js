import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/redux-store/slices/userSlice"

export const rootReducer = combineReducers({
    User : userReducer
})
