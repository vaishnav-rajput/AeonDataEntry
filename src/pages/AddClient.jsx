import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createClient } from '../services/operations/clientAPI'


const AddClient = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        clientName:"",
        clientEmail: ""
    })

    const {clientName, clientEmail} = formData
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
    
    const handleOnSubmit = (e) => {
      console.log("formData", formData)
        e.preventDefault()
        dispatch(createClient(formData, navigate))
    }

    // useEffect(() => {
      
    // console.log("clientName", formData.clientName)
    //   return () => {
        
    //   }
    // }, [formData])
    
      

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-richblack-800 text-white '>
        <form onSubmit={handleOnSubmit} className='flex flex-col m-auto'>
            <h1>Welcome Amish Please Add a client</h1>
            <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Client Name <sup className="text-pink-200">*</sup>
            </p>
            <input
            required
            type="text"
            name="clientName"
            value={clientName}
            onChange={handleOnChange}
            placeholder="Enter Client Name"
            autoComplete='off'
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            </label>
            <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Client Email 
            </p>
            <input
            required
            type="email"
            name="clientEmail"
            value={clientEmail}
            onChange={handleOnChange}
            placeholder="Enter Client Email"
            autoComplete='off'
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            </label>
            <div className='flex gap-2 mt-5'>
            <Link to={"/"}>
            <p>
              return to HomePage 
            </p>
            </Link>
            <button className='p-1 px-2 bg-caribbeangreen-300'>
                Add Client
            </button>
            </div>
          
        </form>
        <div>
          
          
        </div>
    </div>
  )
}

export default AddClient