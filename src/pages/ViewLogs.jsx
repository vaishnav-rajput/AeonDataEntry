import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { fetchDeletedLogs } from '../services/operations/logsAPI'
import { formatDate } from '../services/formatDate'

const ViewLogs = () => {

    const [deletedEntries, setDeletedEntries] = useState([])
    const [loading, setLoading] = useState(false)

    const handleDeletedLogs = async() => {
        try {
            setLoading(true)
            const response = await fetchDeletedLogs();
            console.log("SEtting the deleted entries to ", response)
            setDeletedEntries(response)
            setLoading(false)
        } catch (error) {
            console.log("Handle deleted logs error ", error)

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
            {
                deletedEntries && 
                <table  className="w-full table-auto text-white">
            <thead>
            <tr className="bg-gray-200">
            <th className="px-4 py-2">Invoice</th>
            <th className="px-4 py-2">Client</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Issue</th>
            <th className="px-4 py-2">Engineer</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">
                Deleted At
            </th>
          </tr>
        </thead>
        <tbody>

            {
                !loading ? (deletedEntries?.map((entry,index) => (
                    <tr key={entry._id}>
                        <td className="border px-4 py-2">{entry.dInvoiceNo}</td>
                        <td className="border px-4 py-2">{entry.dClient}</td>
                        <td className="border px-4 py-2">{formatDate(entry.dDate)}</td>
                        <td className="border px-4 py-2">{entry.dLocation}</td>
                        <td className="border px-4 py-2">{entry.dUser}</td>
                        <td className="border px-4 py-2">{entry.dIssue}</td>
                        <td className="border px-4 py-2">{entry.dAssignedEngineer}</td>
                        <td className="border px-4 py-2">{entry.dType}</td>
                        <td className="border px-4 py-2">{entry.dStatus}</td>
                        <td className="border px-4 py-2">{formatDate(entry.createdAt)}</td>

                       
                        
                    </tr>
                )
                )): (<div><h1 className='text-white'>Loading...</h1></div>)
            }
            </tbody>
             </table>
            }
           
        </div>
    </div>
  )
}

export default ViewLogs