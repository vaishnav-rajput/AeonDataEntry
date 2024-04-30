import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setSerial, setNewEntryLoading, setEntriesLoading } from '../slices/entrySlice'
import { addNewEntry } from '../services/operations/entriesAPI'
import { getAllEntries } from '../services/operations/entriesAPI'
import { formatDate } from '../services/formatDate'


const EntryForm = () => {

    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm()
    const dispatch = useDispatch()
    const {serial, entry, editEntry, newEntryLoading} = useSelector((state) => state.entry)
    const [loading, setLoading] = useState(false)
    const [employees, setEmployees] = useState([])
    const {entriesLoading} = useSelector((state)  => state.entry)
    
    const [entries, setEntries] = useState([])
    const [newEntry, setNewEntry] = useState(false)

    useEffect(() => {
        if(editEntry){
            setValue("client", entry.client)
            setValue("location", entry.location)
            setValue("userName",entry.user )
            setValue("issue", entry.issue)
            setValue("assignedEngineer", entry?.assignedEngineer)
            setValue("status", entry.status)
        }
        const getEntries = async() => {
            const response = await getAllEntries()

            dispatch(setEntries(response.data))
            
        }
        setEntriesLoading(true)
         getEntries()
        setEntriesLoading(false)

    },[newEntry])


    const  onSubmit = async(data) =>{
        
        // if(editEntry){
        //     const currentValues = getValues
        //     const formData = new FormData()
        //     formData.append("client", data.client)
        //     formData.append("location", data.location)
        //     formData.append("user", data.userName)
        //     formData.append("issue", data.issue)
        //     formData.append("assignedEngineer", data.assignedEngineer)
        //     formData.append("status", data.status )
        // }
        setLoading(true)
        const currentValues = getValues()
        console.log("current Vals", currentValues)
        

         const results = await addNewEntry({
            serial: serial,
            client: currentValues.client,
            location: currentValues.location,
            user: currentValues.userName,
            issue: currentValues.issue,
            assignedEngineer: currentValues.assignedEngineer,
            status: currentValues.status
         })
        //  ,token})
         setLoading(false)
         setNewEntry(true)
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

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className='rounded-md items-center justify-center flex border-richblack-700 gap-2 flex-wrap bg-richblack-800 p-6 space-y-8'>
        {/* client */}
        <div  className="flex flex-col space-y-2 pt-[30px]">
            <label className="text-sm text-richblack-5" htmlFor='client'> Client <sup>*</sup></label>
            <input 
                id='client'
                placeholder='enter client name'
                {...register("client", {required: true})}
                className="form-style w-full"
            />
            {
                errors.client && (
                    <span>please enter client name</span>
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
                className="form-style w-full"
            />
            {
                errors.courseTitle && (
                    <span>please enter assigned engineer</span>
                )
            }
        </div>
        {/* type */}
        <div  className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5 " htmlFor='status'>Type <sup>*</sup></label>
            
            <select
            className='text-white form-style'
            id='status'
            defaultValue=""
            {...register("status")}
            >
                <option className=' form-style' value="" disabled>Choose a type</option>
                <option className='form-style' >remote</option>
                <option className='form-style'>on-site</option>                
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
        <div  className='flex flex-col  px-3  bg-richblack-800 rounded-sm '>
            {
                entries ? entries.map((entry,index) => (
                    <div key={index} className='flex flex-row  text-richblack-5 rounded-md border border-white'>
                        
                        <div className=' w-[100px] flex items-center justify-center pt-3 border border-white '>
                            
                                <div>
                                    {

                                    
                                     entry?.client
                                    }
                            </div>
                            
                        </div>
                        <div className='w-[100px] flex items-center justify-center pt-3 border border-white  '>
                            <div>
                            {
                                formatDate(entry?.date)
                            
                            }
                            </div>
                        </div>
                        <div className='w-[100px] flex items-center justify-center pt-3 border border-white  '>
                            <div>
                            {
                                entry?.location
                             }
                            </div>
                            
                        </div>
                        <div className="w-[100px] flex items-center justify-center pt-3 border border-white ">
                            <div>
                                {
                                    entry?.user
                                }
                            </div>
                           
                        </div>
                        <div className="w-[200px] flex items-center justify-center pt-3 border border-white ">
                            <div>
                                {
                                    entry?.issue
                                }
                            </div>
                           
                        </div>
                        <div className="w-[100px] flex items-center justify-center pt-3 border border-white ">
                            <div>
                                {
                                    entry?.assignedEngineer
                                }
                            </div>
                            
                        </div>
                        <div className="w-[100px] flex items-center justify-center border border-white ">
                            <button className='rounded-md  bg-yellow-800 p-2 align-middle'>
                                delete
                            </button>
                        </div>
                    </div>
                ))
                    
                    : (<div>
                        <h1>LOADING....</h1>
                    </div>)

            }
        </div>
    </div>
  )
}

export default EntryForm

