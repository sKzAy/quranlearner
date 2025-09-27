import React from 'react'
import Link from 'next/link'
import { UserButton, UserProfile } from '@clerk/nextjs'
import { ArrowBack, ArrowForward, AutoStories, Search } from '@mui/icons-material'
import { currentUser } from '@clerk/nextjs/server'
import { updateUser } from '../lib/actions'


const Page = async () => {
const user = await currentUser()

const userData = {
  pfp:user.imageUrl,
  email: user.emailAddresses[0].emailAddress,
  Id:user.id,
  name: user.firstName,
}
console.log(userData)
console.log(user)
updateUser(userData)




  let favVerses = []

  if (favVerses.length === 0){
    return(
      <div data-aos = "fade-in">
       <nav  className='max-md:flex-col max-md:justify-center flex justify-between bg-gradient-to-r from-red-500 to-red-600 text-white
            p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/"}> Back to home</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>My DashBoard</p></div>
        <div className='w-fit mx-auto flex gap-5 '>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={'/choose'}>Continue Reading </Link>
          <div><UserButton/></div>
        </div>
      </nav>
      <div className='min-h-screen bg-gray-100 pt-5'>
      <div className='bg-white w-[70vw] h-[60vh] mx-auto rounded-xl'>
        <div className='text-3xl text-center p-5'>No Favorite Verses Yet</div>
        <div className="start text-gray-600 text-lg w-[40vw] text-center mx-auto">Start building your personal collection of meaningful verses by adding favorites while reading or searching the Quran.</div>
        <div className='pt-10 flex justify-center gap-5'>
          <Link href={"/choose"}> <div className="btn1 hover:text-black transition-all hover:transition-all duration-400 w-fit bg-green-600 p-3 rounded-full text-white flex gap-3">Start Reading <AutoStories/> </div></Link>
          <Link href={"/search"}><div className="btn1 hover:text-black transition-all hover:transition-all duration-400 w-fit bg-blue-600 p-3 rounded-full text-white flex gap-3">Start Searching <Search/> </div></Link>
       
        </div>
        </div>
      </div>
      </div>
    )
  }
  return (
    <div data-aos = "fade-in">
            <nav  className='max-md:flex-col max-md:justify-center flex justify-between bg-gradient-to-r from-red-500 to-red-600 text-white
            p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/"}> Back to home</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>My DashBoard</p></div>
        <div className='w-fit mx-auto flex gap-5 '>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={'/choose'}>Continue Reading </Link>
          <div><UserButton/></div>
        </div>
      </nav>
      <div className="pg bg-green-50 min-h-screen p-5 ">
        <div className="fav bg-white shadow flex flex-col align-middle justify-center text-center">
          <p className='text-3xl font-semibold p-3'>My Favorite Verses </p>
        <div className='verseMap shadow border-t-2 border-gray-100'>
          <div className='flex justify-between align-middle flex-col'>
            <div className='flex justify-start gap-2 align-middle p-2'>
              <div className="surah bg-red-100 rounded-full p-2">Surah Al-Fatiha</div>
               <div className="ayah bg-red-100 rounded-full p-2">Verse 1</div>
            </div>
            <div className="arabic text-right p-5 text-2xl">ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ ٢</div>
            <div className="english text-left p-5 text-xl">All praise is for Allah Lord of all worlds</div>
          </div>
          </div>
        <div className='verseMap shadow border-t-2 border-gray-100'>
          <div className='flex justify-between align-middle flex-col'>
            <div className='flex justify-start gap-2 align-middle p-2'>
              <div className="surah bg-red-100 rounded-full p-2">Surah Al-Fatiha</div>
               <div className="ayah bg-red-100 rounded-full p-2">Verse 2</div>
            </div>
            <div className="arabic text-right p-5 text-2xl">ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>
            <div className="english text-left p-5 text-xl">the Most Compassionate Most Merciful</div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
