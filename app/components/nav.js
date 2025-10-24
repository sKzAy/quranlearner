import React from 'react'
import Link from 'next/link'
import { SpaceDashboardRounded,Search} from '@mui/icons-material'
const Navbar = () => {
  return (
    <>
       <div className='' data-aos="fade-in">
      <nav className='max-md:hidden max-md:flex-col max-md:justify-center flex justify-center align-middle items-center bg-gradient-to-r from-green-500 to-green-600 text-white
      p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/search"}><Search /> Search</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
        <div className='w-fit mx-auto flex gap-5'>
          <Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}><SpaceDashboardRounded /> Dashboard</Link>
          
        </div>
      </nav>
    </div>
    </>
  )
}

export default Navbar
