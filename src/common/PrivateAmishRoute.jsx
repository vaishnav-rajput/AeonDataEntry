import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const PrivateAmishRoute = ({children}) => {
    const {employee} = useSelector((state) => state.employee)

   if(employee === "Amish") return children
    else {
        toast.error("this route is reserved for Amish only")
        return <Navigate to="/login" />

    }
}

export default PrivateAmishRoute