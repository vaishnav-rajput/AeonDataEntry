import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setNewEntryLoading, setEntriesLoading, setEditEntry, setEntry } from '../slices/entrySlice'
import { addNewEntry, deleteEntry, updateEntry } from '../services/operations/entriesAPI'
import { getAllEntries } from '../services/operations/entriesAPI'
import { formatDate } from '../services/formatDate'
import { formatInvoice } from '../services/formatInvoice'
import { fetchALLClients, getClientEntries } from '../services/operations/clientAPI'
import { useDownloadExcel } from 'react-export-table-to-excel'
import SearchClient from './SearchClient'
import toast from 'react-hot-toast'


const EntryForm = () => {
    const tableRef = useRef(null)
    const {register, handleSubmit, setValue, getValues,reset, formState: {errors}} = useForm()
    const dispatch = useDispatch()
    const {serial, entry, editEntry} = useSelector((state) => state.entry)
    const {employee} = useSelector((state) => state.employee)
    const [loading, setLoading] = useState(false)
    const {entriesLoading} = useSelector((state)  => state.entry)
    
    const [entries, setEntries] = useState([])
    const [newEntry, setNewEntry] = useState(false)
    const [deletedEntry, setDeletedEntry] = useState(false)
    const [clients, setClients] = useState([])
    const curr = Date.now()
    const currDate = formatDate(curr)

    useEffect(() => {
        
        const getEntries = async() => {
            const response = await getAllEntries()
            const allEntries = response.data
            setEntries(allEntries)
            
        }
        
        dispatch(setEntriesLoading(true))
         getEntries()
        dispatch(setEntriesLoading(false))

    },[newEntry, deletedEntry, editEntry])

    useEffect(() => {
      
        const getClients = async() => {
            setLoading(true)
            try {
                const response = await fetchALLClients()
                setClients(response)
            } catch (error) {
                console.log("Could not fetch Clients", error)
            }
            setLoading(false)
        }
        getClients()
    }, [])

    const {onDownload} = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: String(currDate),
        sheet: 'call_data'
    })
    
    const isFormUpdated = () => {
        const currentValues = getValues()
        if(currentValues.client !== entry.client ||
            currentValues.location !== entry.location ||
            currentValues.userName !== entry.user ||
            currentValues.issue !== entry.issue ||
            currentValues.type !== entry.type ||
            currentValues.assignedEngineer !== entry.assignedEngineer ||
            currentValues.status !== entry.status  )
            return true
        else
            return false
    }

    const  onSubmit = async(data) =>{
        
        if(editEntry){
            if(isFormUpdated){
                const currentValues = getValues
                const formData = new FormData()
                formData.append("client", data.client)
                formData.append("location", data.location)
                formData.append("user", data.userName)
                formData.append("issue", data.issue)
                formData.append("assignedEngineer", data.assignedEngineer)
                formData.append("status", data.status )
                formData.append("type", data.type )
                formData.append("entryId", entry._id)
                var object = {};
                formData.forEach((value, key) => object[key] = value);
                console.log("object will be" , object)

                // api call
                const result = await updateEntry(object)
                dispatch(setEditEntry(false))
                reset()
            }
            else{
                toast.error("No changes made so far")
            }
            return
        }
        

         dispatch(setEntriesLoading(true))
         setNewEntry(false)
        const currentValues = getValues()
        console.log("current Vals", currentValues)
        
                
            console.log("serial no", serial)
            const currDate = Date.now()
        const invoiceNo = formatInvoice(currDate)    

         const results = await addNewEntry({
            invoiceNo: invoiceNo,
            client: currentValues.client,
            location: currentValues.location,
            user: currentValues.userName,
            issue: currentValues.issue,
            assignedEngineer: currentValues.assignedEngineer,
            type: currentValues.type,
            status: currentValues.status

         })
        //  ,token})
         dispatch(setEntriesLoading(false))
         setNewEntry(true)
         reset()
        // const formData = new FormData()
        // formData.append("client", currentValues.client)
        // formData.append("location", currentValues.location)
        // formData.append("user", currentValues.userName)
        // formData.append("issue", currentValues.issue)
        // formData.append("assignedEngineer", currentValues.assignedEngineer)
        // formData.append("status", currentValues.status )
        // formData.append("serial", serial) 

        // // formdata = formData.toObject()
        // setNewEntryLoading(true)
        // console.log("addNewEntryAPI CAll res", formData)

        // const result = await addNewEntry(formData)
        // setNewEntryLoading(false)
    }

    const handleDelete = async(entry) => {
        setDeletedEntry(false)
        dispatch(setEntriesLoading(true))
        console.log("entry in handle delete", entry)
        await deleteEntry( entry)
        dispatch(setEntriesLoading(false))
        setDeletedEntry(true)
    }

    const handleEdit = async(entry) => {
        const entryId = entry._id;
        dispatch(setEditEntry(true))
        dispatch(setEntry(entry))
        setValue("client", entry.client)
        setValue("location", entry.location)
        setValue("userName", entry.user)
        setValue("issue", entry.issue)
        setValue("assignedEngineer", entry.assignedEngineer)
        setValue("type", entry.type)
        setValue("status", entry.status)

    }

    const handleFilter = async (clientName) => {
        try {
            setEntriesLoading(true)
            setLoading(true)
            console.log("clientName is", clientName)
            const response = await getClientEntries(clientName)
            setLoading(false)
            setEntriesLoading(false)
            console.log("response", response)
            setEntries(response?.data?.data)
            console.log("entries", entries)
        } catch (error) {
            console.log("Could not fetch Client Entries", error)
            
        }
    }

  return (
    <div>   
        <div  className="ml-12  w-[95%] flex space-y-2 items-center m-x-6">
            <label className="text-md text-richblack-5 pt-1 mr-2 " htmlFor='clientToFilter'>Filter Entries:</label>
            <select 
                className="form-style"
                defaultValue=""
                name='clientToFilter'
                onChange={(e) => handleFilter(e.target.value)}
                >
                    <option className='text-black' value="" >Choose a Client</option>
                    {
                        !loading && clients.map((client, index) => (
                            
                            <option onClick={handleFilter} key={index}  value={client?.name}>
                                {client?.name}
                            </option>
                    
                        ))
                    }
            </select>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='rounded-md  items-center justify-center flex border-richblack-700 gap-2  bg-richblack-800 p-x-6  pb-6 space-y-8'>
        {/* client */}
        
         <div className="flex flex-col space-y-2 pt-[30px]">
            <label className="text-sm text-richblack-5" htmlFor='client'>Client<sup>*</sup></label>
            <select 
                className="form-style w-full"
                id='client'
                defaultValue=""
                {...register("client", {required: true})}
                >
                    <option className='text-black' value="" disabled>Choose a Client</option>
                    {
                        !loading && clients.map((client, index) => (
                            
                            <option key={index} value={client?.name}>
                                {client?.name}
                            </option>
                        ))
                    }
            </select>
            {errors.courseCategory && (
                <span>
                    Client is required
                </span>
            )
            }
        </div>
        {/* location */}
        <div  className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor='location'>location</label>
            <input 
                id='location'
                placeholder='enter location'
                {...register("location")}
                className="form-style w-full"
                autoComplete='off'
            />
            {
                errors.location && (
                    <span>please enter location</span>
                )
            }
        </div>
        {/* user */}
        <div  className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor='userName'>User</label>
            <input 
                id='userName'
                placeholder="enter user's name"
                {...register("userName")}
                className="form-style w-full"
                autoComplete='off'
            />
            {
                errors.userName && (
                    <span>please enter user name</span>
                )
            }
        </div>
        {/* issue  */}
        <div  className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor='issue'>issue <sup>*</sup></label>
            <input 
                id='issue'
                placeholder='enter issue'
                {...register("issue", {required: true})}
                className="form-style w-full"
                autoComplete='off'
            />
            {
                errors.issue && (
                    <span>please enter issue</span>
                )
            }
        </div>
        {/* assigned Engineer */}
        <div  className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor='assignedEngineer'>Assigned Engineer <sup>*</sup></label>
            <input 
                id='assignedEngineer'
                placeholder='enter assigned Engineer'
                {...register("assignedEngineer", {required: true})}
                className="form-style w-full "
                autoComplete='off'  
            />
            {
                errors.assignedEngineer && (
                    <span>please enter assigned engineer</span>
                )
            }
        </div>
        {/* type */}
        <div  className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5 " htmlFor='Type'>Type <sup>*</sup></label>
            
            <select
            className='text-white form-style'
            id='type'
            defaultValue=""
            {...register("type")}
            >
                <option className=' form-style' value="" disabled>Choose a type</option>
                <option className='form-style' >remote</option>
                <option className='form-style'>on-site</option>                
            </select>
        </div>

        {/* status */}
        <div  className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5 " htmlFor='status'>Status <sup>*</sup></label>
            
            <select
            className='text-white form-style'
            id='status'
            defaultValue=""
            {...register("status")}
            >
                <option className=' form-style' value="" disabled>Choose a Status</option>
                <option className='form-style' >pending</option>
                <option className='form-style'>done</option>                
            </select>
        </div>
        
        
            <button className='rounded-md bg-blue-100  text-white text-lg h-auto w-[100px]' 
                    
            >
                {
                    !editEntry ? "Save" : "Save Changes"
                }
            </button>
        </form>
        {/* show entries */}

        <div  className='flex flex-col  justify-center items-center px-3  bg-richblack-800 rounded-sm '>
        <table ref={tableRef} className="w-[95%] table-auto text-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Serial</th>
            <th className="px-4 py-2">Invoice</th>
            <th className="px-4 py-2">Client</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Issue</th>
            <th className="px-4 py-2">Engineer</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Status</th>
                {
                    employee == "Amish" && 
                    <th className='px-4 py-2'>Actions</th>
                }
          </tr>
        </thead>
        <tbody>

            {
                !loading ? (entries?.map((entry,index) => (
                    <tr key={entry._id}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{entry.invoiceNo}</td>
                        <td className="border px-4 py-2">{entry.client}</td>
                        <td className="border px-4 py-2">{formatDate(entry.createdAt)}</td>
                        <td className="border px-4 py-2">{entry.location}</td>
                        <td className="border px-4 py-2">{entry.user}</td>
                        <td className="border px-4 py-2">{entry.issue}</td>
                        <td className="border px-4 py-2">{entry.assignedEngineer}</td>
                        <td className="border px-4 py-2">{entry.type}</td>
                        <td className="border px-4 py-2">{entry.status}</td>
                        {
                            employee == "Amish" &&
                            <td className="border px-4 py-2">
                            <div className="w-[100px] flex flex-col gap-y-2 items-center justify-center border border-white ">
                                <button onClick={() => handleDelete(entry)} className='rounded-md  bg-yellow-800 p-2 align-middle'>
                                    delete
                                </button>
                                <button onClick={() => handleEdit(entry)} className='rounded-md  bg-yellow-800 p-2 align-middle'>
                                    edit
                                </button>
                            </div>
                           </td>
                        }
                        
                    </tr>
                )
                )): (<div><h1 className='text-white'>Loading...</h1></div>)
            }
        </tbody>
      </table>
      <div className=" flex w-[95%] text-white mt-3">
        <button className='justify-self-end p-2  bg-caribbeangreen-700 rounded-sm '  onClick={onDownload}>
            Download Report
        </button>
      </div>
        </div>
    </div>
  )
}

export default EntryForm

