import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    serial: 1,
    editEntry: false,
    entry: null,
    newEntryLoading: false,
    entriesLoading: false,
}

const entrySlice = createSlice({
    name: "entry",
    initialState,
    reducers:{
        setSerial : (state, action) => {
            state.serial = action.payload
        },
        setEditEntry: (state, action) => {
            state.editEntry = action.payload
        },
        resetEntryState: (state) => {
            state.entry= null
            state.editEntry = false
        },
        setNewEntryLoading: (state, action) =>{
            state.newEntryLoading = action.payload
        },
        setEntriesLoading:(state, action) => {
            state.entriesLoading = action.payload
        }
    }
})

export const {setSerial, setEditEntry, resetEntryState, setNewEntryLoading, setEntriesLoading} = entrySlice.actions
export default entrySlice.reducer