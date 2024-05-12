import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { logsEndpoints } from "../apis";
import { setEntriesLoading } from "../../slices/entrySlice";

const {GET_DELETED_LOGS, GET_EDITED_LOGS} = logsEndpoints

export const fetchDeletedLogs = async() => {
    let result = []
    try {
        const response = await apiConnector("GET", GET_DELETED_LOGS)
        if(!response?.data?.success){
            throw new Error("Could not fetch deleted logs")
        }
        result = response?.data?.data

    } catch (error) {
        console.log("GET DELETED LOGS API ERROR", error)
        toast.error(error.message)
    }
    return result
}

export const fetchEditedEntries = async() => {
    let result = []
    try {
        const response = await apiConnector("GET", GET_EDITED_LOGS)
        if(!response?.data?.success){
            throw new Error("Could not fetch deleted logs")
        }
        result = response?.data
        console.log("the results are ", result)
    } catch (error) {
        console.log("GET DELETED LOGS API ERROR", error)
        toast.error(error.message)
    }
    return result
}