import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {

    const {employee} = useSelector((state) => state.employee)
    if(employee !== null) return children
    else 
        return <Navigate to="/login" />

}

export default PrivateRoute