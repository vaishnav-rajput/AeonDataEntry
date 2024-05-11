import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createClient } from '../services/operations/clientAPI'


const AddClient = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        clientName:""
    })

    const {clientName} = formData
    const handleOnChange = (e) => {
        setFormData(() => ({
          
          [e.target.name]: e.target.value,
        }))
      }
    
    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(createClient(clientName, navigate))
    }

      

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
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            </label>
            <button>
                Submit
            </button>
        </form>
    </div>
  )
}

export default AddClient