import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiConnector } from '../services/apiconnector'
import { getAllEntries } from '../services/operations/entriesAPI'
import { setEntriesLoading } from '../slices/entrySlice'
import { FaBullseye } from 'react-icons/fa'


const Entries = () => {
    const {entry, entriesLoading } = useSelector((state) => state.entry)
    const [entries, setEntries] = useState([])
    useEffect(() => {
    
        const getEntries = async() => {
            setEntriesLoading(true)
            const response = await getAllEntries()
            console.log("get Entries response", response)
            setEntriesLoading(false)

            setEntries(response.data)
            console.log("all entries" , response)
        }

    }, [])
  return (

    <div>
        {
         entriesLoading ? (<div>LOADING...</div>) :
         (<div>
            {
                entries.map((entry, index) => (
                    <div key={index}>
                        <div>
                            {entry.client}
                        </div>
                        <div>{entry.issue}</div>
                    </div>
                ))
            }
            </div>
            )
        }
        
    </div>  
  )
}

export default Entries