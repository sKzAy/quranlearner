import React from 'react'
import Link from 'next/link'
import { SpaceDashboardRounded,AutoStories,ArrowDropDownCircleRounded } from '@mui/icons-material'
import { Search } from 'lucide-react'


const ReadNavMobile = () => {

  return (
    <>
       <nav className='flex justify-between align-middle items-center md:hidden bg-gradient-to-r from-green-500 to-green-600 text-white p-6'>
          <details className="dropdown relative duration-500 animate-in">
            <summary className="btn m-1 list-none text-center"><ArrowDropDownCircleRounded /></summary>
            <ul className="bg-green-700 menu absolute left-0 top-full bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
              <li className='shadow p-2'><Link className=' hover:text-black transition-all hover:transition-all duration-500 flex' href={"/search"}><Search/>Search Surah</Link></li>
              <li className='shadow p-2'><Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}><SpaceDashboardRounded /> Dashboard </Link></li>
            </ul>
          </details>
          <div className='text-2xl font-bold flex gap-2'>Quran Reader</div>
        </nav>
    </>
  )
}

export default ReadNavMobile
