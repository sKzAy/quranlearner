import React from 'react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { SpaceDashboardRounded,AutoStories} from '@mui/icons-material'

const SearchNav = () => {
  return (
    <>
      <nav className='max-md:hidden max-md:flex-col max-md:justify-center flex justify-center align-middle items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories/> Select Surah</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Searcher</p></div>
        <div className='w-fit mx-auto flex gap-5'>
          <Link className='cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}><SpaceDashboardRounded/> Dashboard</Link>
          
        </div>
      </nav>
    </>
  )
}

export default SearchNav
