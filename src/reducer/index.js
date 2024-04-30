import { combineReducers } from "@reduxjs/toolkit";
const { default: entrySlice } = require("../slices/entrySlice");

const rootReducer =  combineReducers({
    entry: entrySlice
})

export default rootReducer