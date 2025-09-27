import React from 'react'
import Link from 'next/link'

const Box = ({number}) => {
  return (
    <>
    { number === 1?
      <div className='flex flex-col bg-white w-fit h-fit p-10 rounded-3xl gap-4 hover:shadow-xl transition-all hover:transition-all duration-500'>
        <div className="title mx-auto w-fit text-2xl">
            Read the Quran
        </div>
        <div className="text w-fit h-[13vh] mx-auto text-center text-gray-400">
            Explore the holy Quran with Arabic text and translations
        </div>
        <div className="btn text-center">
            <Link className='hover:text-black duration-500 tranistion-all hover:transition-all bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-xl' href={"/choose"}>Get Started</Link>
        </div>
      </div> : number === 2? <div className='flex flex-col bg-white w-fit h-fit p-10 rounded-3xl gap-4 hover:shadow-xl transition-all hover:transition-all duration-500'>
        <div className="title mx-auto w-fit text-2xl">
            Search & Discover
        </div>
        <div className="text w-fit h-[13vh] mx-auto text-center text-gray-400">
            Find specific Surahs with our powerful search functionality.
        </div>
        <div className="btn text-center">
            <Link className='hover:text-black duration-500 tranistion-all hover:transition-all bg-gradient-to-r from-blue-400 to-blue-600 text-white p-3 rounded-xl' href={"/search"}>Get Started</Link>
        </div>
      </div> : number === 3 ? <div className='flex flex-col bg-white w-fit h-fit p-10 rounded-3xl gap-4 hover:shadow-xl transition-all hover:transition-all duration-500'>
        <div className="title mx-auto w-fit text-2xl">
            Go to Dashboard
        </div>
        <div className="text w-fit h-[13vh] mx-auto text-center text-gray-400">
            Save your favorite verses and build your personal collection of meaningful passages.
        </div>
        <div className="btn text-center">
            <Link className='hover:text-black duration-500 tranistion-all hover:transition-all bg-gradient-to-r from-red-400 to-red-600 text-white p-3 rounded-xl' href={"/dashboard"}>Get Started</Link>
        </div>
      </div> : <h1>nope</h1>}
    </>
  )
}

export default Box
