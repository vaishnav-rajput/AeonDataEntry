import React, { useEffect } from 'react'
import EntryForm from '../components/EntryForm'
import Entries from '../components/Entries'
import Navbar from '../components/Navbar'

const Home = () => {


  return (
    <div className='bg-richblack-800 h-screen select-none'>
      
        <Navbar/>
      <div>
        <EntryForm />
      </div>
    </div>
  )
}

export default Home