import React from 'react'
import Link from 'next/link'
import {ArrowDropDownCircleRounded, SpaceDashboardRounded,AutoStories} from '@mui/icons-material'
const SearchNavMobile = () => {
  return (
    <>
       <nav className='md:hidden flex justify-between align-middle items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white
            p-6'>      
      <details className="dropdown relative duration-500 animate-in">
        <summary className="btn m-1 list-none"><ArrowDropDownCircleRounded /></summary>
        <ul className="bg-blue-700 menu absolute left-0 top-full bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
          <li className='shadow p-2'><Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories/> Select Surah</Link></li>
          <li className='shadow p-2'><Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}><SpaceDashboardRounded/> Dashboard</Link></li>
        </ul>
      </details>
      <div className='text-2xl font-bold flex gap-2'>Quran Searcher<div></div></div>
      </nav>
    </>
  )
}

export default SearchNavMobile
