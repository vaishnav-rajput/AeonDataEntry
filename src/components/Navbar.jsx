import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from "../assets/aeonLogslogo.png"
import { setEmployee } from '../slices/employeeSlice'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const {employee} = useSelector((state) => state.employee)
    const dispatch = useDispatch()
    

  return (
    <div className='w-screen p-2 select-none'>
        <nav className='flex justify-between'>
            <img src={logo} width={150} />
                {
                    employee == "Amish" ? (
                        <ul className='flex gap-3  items-center text-white'>
                            <Link to={"/view-logs"}>
                            <li className='cursor-pointer'>View-Logs</li>
                            </Link>
                            
                            <Link to={"/addClient"}>
                            <li className='cursor-pointer'>AddClient</li>

                            </Link>
                            <li onClick={() => dispatch(setEmployee(null))} className='p-2 rounded-sm cursor-pointer bg-blue-100 '>Logout</li>
                        </ul>
                        
                    ) : (
                    <ul>
                        <li ><button onClick={() => dispatch(setEmployee(null))} className='p-2 rounded-sm bg-blue-100 '>Logout</button></li>
                    </ul>
                )
                }
        </nav>
    </div>
  )
}

export default Navbar