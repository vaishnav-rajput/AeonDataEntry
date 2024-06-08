import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { engineerEndpoints } from "../apis"
import { setEntriesLoading } from "../../slices/entrySlice"

const {GETALLENGINEERS_API, CREATEENGINEER_API,ENGINEERENTRIES_API} = engineerEndpoints

export const fetchALLEngineers = async() => {
    let result = []
    try {
        const response = await apiConnector("GET", GETALLENGINEERS_API)
        if (!response?.data?.success) {
            throw new Error("Could Not get engineers")
          }
        result = response?.data?.data
    } catch (error) {
        console.log("GET ALL CLIENTS API ERROR............", error)
      toast.error(error.message)
    }
    return result
}

export const createEngineer = async(name, navigate) => {
    const toastId = toast.loading("loading...")
    try {
        const response = await apiConnector("POST", CREATEENGINEER_API, {name})
        console.log("CREATE ENGINEER API RES", response)
        if (!response?.data?.success) {
            throw new Error("Could Not create engineer")
          }
        toast.success("New Engineer Created Successfully")
        navigate("/")
    } catch (error) {
        console.log("CREATE Engineer API ERROR", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)

} 


export const getEngineerEntries = async(engineerName) => {
    setEntriesLoading(true)
    let result = []
    try {
        const response = await apiConnector("POST", ENGINEERENTRIES_API,{engineerName})
        if(!response?.data?.success){
            throw new Error("Could not fetch client entries")
        }
        console.log("Response in get engineer entries api", response)
        result = response
        console.log("the result is", result)
        setEntriesLoading(false)
    } catch(error){
        console.log("Engineer_ENTRIES_API API ERROR............", error)
        toast.error(error.message) 
        result = error.response?.data       
    }
    return result
}