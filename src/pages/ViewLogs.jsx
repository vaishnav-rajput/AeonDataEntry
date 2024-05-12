import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { fetchDeletedLogs, fetchEditedEntries } from '../services/operations/logsAPI'
import { formatDate } from '../services/formatDate'

const ViewLogs = () => {

    const [deletedEntries, setDeletedEntries] = useState([])
    const [editedEntries, setEditedEntries] = useState([])
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(null)
    


    const handleDeletedLogs = async() => {
        try {
            // setEditedEntries([])
            setActive("delete")
            setLoading(true)
            const response = await fetchDeletedLogs();
            console.log("SEtting the deleted entries to ", response)
            setDeletedEntries(response)
            setLoading(false)
        } catch (error) {
            console.log("Handle deleted logs error ", error)

        }
    }

    const handleEditedLogs = async() => {
        try {
            setDeletedEntries([])
            setActive("edit")
            setLoading(true)
            const response = await fetchEditedEntries();
            console.log("the response is ", response)
            setEditedEntries(response.data)
            console.log("edited entries length ", editedEntries.length)
            console.log("edited entries ", editedEntries)

            setLoading(false)
        } catch (error) {
            console.log("Handle edited logs error ", error)

        }
    }

  return (
    <div className=' select-none w-full h-screen text-white bg-richblack-800'>
        <Navbar/>

        <div className='w-full '>
            <div className='flex gap-3 justify-start'>
                <button onClick={handleDeletedLogs} className={`rounded-md p-2 px-3 ${active === "delete" && "bg-blue-200"}`}>
                    View Deleted logs
                </button>
                <button onClick={handleEditedLogs} className={`rounded-md p-2 px-3 ${active === "edit" && "bg-blue-200"}`}>
                    View Edited logs
                </button>   
            </div>
            
            {/* DELETED ENTRIES */}
            {
                deletedEntries.length >0  && 
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

            
            {/* EDITED ENTRIES */}
            {
               active === "edit" && !loading ? (   
                 
                editedEntries.map((entry, index) =>
                    (
                        
                            <div key={entry._id} className='flex flex-col gap-2 mb-[60px] p-5'>
                               <table className="min-w-full table-auto divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Type</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Engineer</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                                </thead>
                                    {
                                        !loading && 
                                <tbody class=" divide-y  divide-gray-200">
            
                                        <tr >
                                            <td className={`px-6 py-4 text-gray-500  whitespace-nowrap`}>Original</td>
                                            <td className={`px-6 py-4 text-gray-500 whitespace-nowrap`} >{entry.eInvoiceNo}</td>
                                            <td className={`px-6 py-4 text-gray-500 whitespace-nowrap`} >{entry.oClient}</td>
                                            <td className={`px-6 py-4 text-gray-500 whitespace-nowrap`} >{formatDate(entry.oDate)}</td>
                                            <td className={`px-6 py-4 text-gray-500 whitespace-nowrap`} >{entry.oLocation}</td>
                                            <td className={`px-6 py-4 text-gray-500 whitespace-nowrap`} >{entry.oUser}</td>
                                            <td className={`px-6 py-4 text-gray-500 whitespace-nowrap`} >{entry.oIssue}</td>
                                            <td className={`px-6 py-4 text-gray-500 whitespace-nowrap`} >{entry.oAssignedEngineer}</td>
                                            <td className={`px-6 py-4 text-gray-500 whitespace-nowrap`} >{entry.oType}</td>
                                            <td className={`px-6 py-4 text-gray-500 whitespace-nowrap`} >{entry.oStatus}</td>
                                        </tr> 
                                        <tr className='border-none'>
                                            <td className= {` px-6 py-4 whitespace-nowrap`} >Edited</td>
                                            <td className= {`px-6 py-4 whitespace-nowrap`} >{entry.eInvoiceNo}</td>
                                            <td className= {`${entry.eClient !== entry.oClient && "border-b border-yellow-50"} px-6 py-4 whitespace-nowrap`} >{entry.eClient}</td>
                                            <td className= {`px-6 py-4 whitespace-nowrap`} >{formatDate(entry.createdAt)}</td>
                                            <td className= {`${entry.oLocation !== entry.eLocation && "border-b border-yellow-50"}px-6 py-4 whitespace-nowrap`} >{entry.eLocation}</td>
                                            <td className= {`${entry.oUser !== entry.eUser && "border-b border-yellow-50"} px-6 py-4 whitespace-nowrap`} >{entry.eUser}</td>
                                            <td className= {`${entry.oIssue !== entry.eIssue && "border-b border-yellow-50"} px-6 py-4 whitespace-nowrap`} >{entry.eIssue}</td>
                                            <td className= {`${entry.eAssignedEngineer !== entry.oAssignedEngineer && "border-b border-yellow-50"} px-6 py-4 whitespace-nowrap`} >{entry.eAssignedEngineer}</td>
                                            <td className= {`${entry.oType !== entry.eType && "border-b border-yellow-50"} px-6 py-4 whitespace-nowrap`} >{entry.eType}</td>
                                            <td className= {`${entry.oStatus !== entry.eStatus && "border-b border-yellow-50"} px-6 py-4 whitespace-nowrap`} >{entry.eStatus}</td>
                                        </tr>
                                </tbody>
            
                                    }
                                        
                               </table>
                            </div>
                                
                    )
                    
                    )
                 
                 ) : (<div></div>)
                
                
            }
            
        </div>
    </div>
  )
}

export default ViewLogs