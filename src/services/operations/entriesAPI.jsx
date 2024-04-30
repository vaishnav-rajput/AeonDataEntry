import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { entryEndpoints } from "../apis";
import { formatDate } from "../formatDate";


const {CREATEENTRY_API,  GETALLENTRIES_API} = entryEndpoints

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
        result.date = formatDate(result.date)
        console.log("date", result.date)
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