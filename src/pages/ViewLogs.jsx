import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const ViewLogs = () => {

    const [deletedEntries, setDeletedEntries] = useState([])
    const [loading, setLoading] = useState(false)

    const handleDeletedLogs = () => {
        try {
            setLoading(true)
        } catch (error) {
            
        }
    }

    const handleEditedLogs = () => {

    }

  return (
    <div className='w-full h-screen text-white bg-richblack-800'>
        <Navbar/>

        <div className='w-full '>
            <div className='flex gap-3 justify-start'>
                <button onClick={handleDeletedLogs} className='rounded-md bg-blue-200'>
                    View Deleted logs
                </button>
                <button onClick={handleEditedLogs} className='rounded-md bg-blue-200'>
                    View Edited logs
                </button>   
            </div>
        </div>
    </div>
  )
}

export default ViewLogs