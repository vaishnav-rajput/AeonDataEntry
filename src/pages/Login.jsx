import React from 'react'
import { ACCOUNT_TYPE } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setEmployee } from '../slices/employeeSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (name) =>{
    localStorage.setItem("employee", JSON.stringify(name))

    dispatch(setEmployee(name))
    navigate("/")
  }

  return (
    <div className='bg-richblack-800 flex flex-col justify-center text-white items-center w-screen h-screen'>
    <div className='w-full flex flex-col items-center gap-3 justify-center'>
    <div className='mx-auto text-2xl font-poppins'>
      Welcome to AeonLogs Login as:
    </div>
    <div className='select-none flex flex-col w-[500px] h-[500px]'>

     <div onClick={() => handleLogin("Amish")} className='border-2 cursor-pointer border-white text-center text-lg  w-full'>
        Amish
     </div>
     <div  onClick={() => handleLogin("Dakshata")} className='border-2 cursor-pointer border-white text-center text-lg w-full'>Dakshata</div>
     <div  onClick={() => handleLogin("Kripashankar")} className='border-2 cursor-pointer border-white text-center text-lg w-full'>Kripashankar</div>
    </div>
    </div>
    
  </div>
  )
}

export default Login