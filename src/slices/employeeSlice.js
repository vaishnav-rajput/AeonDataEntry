import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    employee: localStorage.getItem("employee") ? JSON.parse(localStorage.getItem("employee")) : null,
    loading: false,
}

const employeeSlice =  createSlice({
    name: "employee",
    initialState: initialState,
    reducers: {
        setEmployee(state, value){
            state.employee = value.payload
        },
        setLoading(state, value){
            state.loading = value.payload
        }
    }
})

export const {setEmployee, setLoading} = employeeSlice.actions
export default employeeSlice.reducer