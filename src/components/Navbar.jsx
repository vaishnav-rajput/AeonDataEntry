import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from "../assets/aeonLogslogo.png"
import { setEmployee } from '../slices/employeeSlice'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const {employee} = useSelector((state) => state.employee)
    const dispatch = useDispatch()
    
    const handleLogout = () => {
        dispatch(setEmployee(null))
        localStorage.setItem("employee", null)
    }

  return (
    <div className='w-screen p-2 select-none'>
        <nav className='flex mx-auto w-[95%] justify-between'>
            <Link to={"/"}>
            <img src={logo} width={150} height={50} />

            </Link>
                {
                    employee == "Amish" ? (
                        <ul className='flex gap-3  items-center text-white'>
                            <Link to={"/view-logs"}>
                            <li className='cursor-pointer'>View-Logs</li>
                            </Link>
                            
                            <Link to={"/addClient"}>
                            <li className='cursor-pointer'>AddClient</li>

                            </Link>
                            <Link to={"/addEngineer"}>
                            <li className='cursor-pointer'>AddEngineer</li>

                            </Link>
                            <li onClick={handleLogout} className='p-2 rounded-sm cursor-pointer bg-blue-100 '>Logout</li>
                        </ul>
                        
                    ) : (
                    <ul>
                        <li ><button onClick={handleLogout} className='p-2 rounded-sm bg-blue-100 '>Logout</button></li>
                    </ul>
                )
                }
        </nav>
    </div>
  )
}

export default Navbar