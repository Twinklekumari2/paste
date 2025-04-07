import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-1/2 mx-auto p-2'>
        <ul className='flex flex-row gap-4 place-content-evenly'>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/paste'>Paste</NavLink></li>
        </ul>
      
    </div>
  )
}

export default Navbar
