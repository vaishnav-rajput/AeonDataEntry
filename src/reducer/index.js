import { combineReducers } from "@reduxjs/toolkit";
import employeeSlice from "../slices/employeeSlice"
import entrySlice from "../slices/entrySlice";

const rootReducer =  combineReducers({
    entry: entrySlice,
    employee: employeeSlice
})

export default rootReducer