import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { entryEndpoints } from "../apis";
import { setEntriesLoading } from "../../slices/entrySlice";


const {CREATEENTRY_API,  GETALLENTRIES_API, DELETEENTRY_API} = entryEndpoints

export const addNewEntry = async (data) => {
    let result = null
    const toastId = toast.loading("loading...")
    try {
        const response = await apiConnector("POST", CREATEENTRY_API, data)

        console.log("CREATE ENTRY API RESPONSE", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add entry Details")
          }
      toast.success("New Entry Created Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE ENTRY API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getAllEntries = async() => {
    const toastId = toast.loading("loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GETALLENTRIES_API)
        if(!response?.data?.success){
            throw new Error("Could not fetch entries")
        }
    result = response?.data

    } catch (error) {
        console.log("GET_ALL_ENTRIES_API API ERROR............", error)
        toast.error(error.message)  
    }
    toast.dismiss(toastId)
    return result
}


export const deleteEntry = async( entry) => {
        const toastId = toast.loading("loading...")
        console.log("entry in delete Entry API", entry)
        setEntriesLoading(true)
        try {
            const response = await apiConnector("POST", DELETEENTRY_API, entry)
            console.log("DELETE ENTRY API RESPONSE", response)
            if (!response?.data?.success) {
                throw new Error("Could Not Delete Entry")
              }
            toast.success("Entry deleted successfully")  
        setEntriesLoading(false)
        } catch (error) {
            console.log("DELETE ENTRY API ERROR............", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
    
}