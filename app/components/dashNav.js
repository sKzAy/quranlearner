import React from 'react'
import Link from 'next/link'
import {Search,AutoStories } from '@mui/icons-material'
import { UserButton } from '@clerk/nextjs'

const DashNav = () => {
  return (
    <>
        <nav className='max-md:hidden max-md:flex-col max-md:justify-center flex justify-between bg-gradient-to-r from-red-500 to-red-600 text-white p-6'>
            <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
              <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/search"}><Search/>Search</Link>
            </div>
            <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>My DashBoard</p></div>
            <div className='w-fit mx-auto flex gap-5 '>
              <div><UserButton/></div>
              <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={'/choose'}> <AutoStories/> Continue Reading</Link>
            </div>
          </nav>
      
    </>
  )
}

export default DashNav
