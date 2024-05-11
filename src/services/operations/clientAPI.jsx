import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { clientEndpoints } from "../apis"
import { setEntriesLoading } from "../../slices/entrySlice"

const {GETALLCLIENTS_API, CREATECLIENT_API , CLIENTENTRIES_API} = clientEndpoints


export const fetchALLClients = async() => {
    let result = []
    try {
        const response = await apiConnector("GET", GETALLCLIENTS_API)
        if (!response?.data?.success) {
            throw new Error("Could Not clients")
          }
        result = response?.data?.data
    } catch (error) {
        console.log("GET ALL CLIENTS API ERROR............", error)
      toast.error(error.message)
    }
    return result
}

export const createClient = async(name, navigate) => {
    const toastId = toast.loading("loading...")
    try {
        const response = await apiConnector("POST", CREATECLIENT_API, name)
        console.log("CREATE CLIENT API RES", response)
        if (!response?.data?.success) {
            throw new Error("Could Not create client")
          }
        toast.success("New Client Created Successfully")
        navigate("/")
    } catch (error) {
        console.log("CREATE CLIENT API ERROR", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)

} 


export const getClientEntries = async(clientName) => {
    setEntriesLoading(true)
    let result = []
    try {
        console.log("CLient name in get client entries api", clientName)
        const response = await apiConnector("POST", CLIENTENTRIES_API,{clientName})
        if(!response?.data?.success){
            throw new Error("Could not fetch client entries")
        }
        console.log("Response in get Client entries api", response)
        result = response
        console.log("the result is", result)
        setEntriesLoading(false)
    } catch(error){
        console.log("CLIENT_ENTRIES_API API ERROR............", error)
        toast.error(error.message) 
        result = error.response?.data       
    }
    return result
}