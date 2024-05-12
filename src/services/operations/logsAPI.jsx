import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { logsEndpoints } from "../apis";
import { setEntriesLoading } from "../../slices/entrySlice";

const {GET_DELETED_LOGS} = logsEndpoints

export const fetchDeletedLogs = async() => {
    let result = []
    try {
        const response = await apiConnector("GET", GET_DELETED_LOGS)
        if(!response?.data?.success){
            throw new Error("Could not fetch deleted logs")
        }
        result = response?.data?.data
        console.log("returning this result from api ", result)

    } catch (error) {
        console.log("GET DELETED LOGS API ERROR", error)
        toast.error(error.message)
    }
    return result
}