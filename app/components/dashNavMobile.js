import React from 'react'
import Link from 'next/link'
import { ArrowDropDownCircleRounded,Search,AutoStories } from '@mui/icons-material'
import { UserButton } from '@clerk/nextjs'

const DashNavMobile = () => {
  return (
    <>
    <nav className='flex justify-between align-middle items-center md:hidden bg-gradient-to-r from-red-500 to-red-600 text-white p-6'>
            <details className="dropdown relative z-[9999]">
              <summary className="btn m-1 list-none z-[9999]">
                <summary className="btn m-1 list-none text-center"><ArrowDropDownCircleRounded /> Open</summary>
               <ArrowDropDownCircleRounded />
              </summary>
              <ul className="menu absolute left-0 top-full bg-red-700 rounded-box w-52 p-3 shadow-sm z-[9999]">
                <li className='shadow p-2'><Link href="/search"><Search/> Search</Link></li>
                <li className='shadow p-2'><Link href="/choose"> <AutoStories/> Continue Reading</Link></li>
              </ul>
            </details>
            <div className='text-2xl font-bold flex gap-2'>Dashboard<div><UserButton /></div></div>
          </nav>
      
    </>
  )
}

export default DashNavMobile
