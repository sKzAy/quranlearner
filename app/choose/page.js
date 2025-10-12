"use client"
import { useState, useEffect,} from 'react'
import React from 'react'
import Link from 'next/link'
import { useRouter, } from 'next/navigation'
import Footer from '../components/footer'
import { UserButton } from '@clerk/nextjs'
import { ArrowBack, ArrowForward, Favorite } from '@mui/icons-material'
import { Trio } from 'ldrs/react'
import 'ldrs/react/Trio.css'
import { ArrowDropDownCircleRounded,Search,SpaceDashboardRounded } from '@mui/icons-material'


export default function Page(){
    const [surahArray,setSurahArray] = useState([]);
    let router = useRouter()
    const [loading,setLoading] = useState(true)


    async function fetchSurahs () {
        try{
            let fetchedData = await fetch("https://api.alquran.cloud/v1/surah")
            let surahs = await fetchedData.json()
            setSurahArray(surahs.data)
            setLoading(false)
        }
        catch (error){
          throw new Error("Failed to fetch data" + error)
        }
    }
    useEffect(() => {
      fetchSurahs()
    }, [])

    if (loading) return <>
    <div>
    <nav className='flex justify-between align-middle items-center md:hidden bg-gradient-to-r from-green-500 to-green-600 text-white
      p-6'>
<details className="dropdown relative duration-500 animate-in">
  <summary className="btn m-1 list-none"><ArrowDropDownCircleRounded /></summary>
  <ul className="bg-green-700 menu absolute left-0 top-full bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
    <li className=''><Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/search"}><Search/> Search</Link></li>
    <li><Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}><SpaceDashboardRounded/> Dashboard</Link></li>
  </ul>
</details>
<div className='text-2xl font-bold flex gap-2'>Quran Reader <div><UserButton /></div></div>
</nav>

</div>

    <div className='' data-aos="fade-in">
    <nav className='max-md:hidden max-md:flex-col max-md:justify-center flex justify-center align-middle items-center bg-gradient-to-r from-green-500 to-green-600 text-white
      p-6'>
      <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
        <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/search"}><Search/> Search</Link>
      </div>
      <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
      <div className='w-fit mx-auto flex gap-5'>
        <Link className=' cursor-alias hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}><SpaceDashboardRounded/> Dashboard</Link>
        <div><UserButton /></div>
      </div>
    </nav>
    <div data-aos="fade-in" className='min-h-[80vh] flex justify-center items-center text-center'>
      <Trio
        size="150"
        speed="1.5"
        color='green'
      />
    </div>
  </div>
  </>
    
  return (
    
    <div data-aos = "fade-in">
<nav className='flex justify-between align-middle items-center md:hidden bg-gradient-to-r from-green-500 to-green-600 text-white
      p-6'>
         
<details className="dropdown relative duration-500 animate-in">
  <summary className="btn m-1 list-none"><ArrowDropDownCircleRounded /></summary>
  <ul className="bg-green-700 menu absolute left-0 top-full bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
    <li className=''><Link className=' hover:text-black transition-all hover:transition-all duration-500'href={"/search"}><Search/> Search</Link></li>
    <li><Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}><SpaceDashboardRounded/> Dashboard</Link></li>
  </ul>
</details>
<div className='text-2xl font-bold flex gap-2'>Quran Reader <div><UserButton /></div></div>
</nav>
        <nav className='max-md:hidden max-md:flex-col max-md:justify-center flex justify-center align-middle items-center bg-gradient-to-r from-green-500 to-green-600 text-white p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className='text-center hover:text-black transition-all hover:transition-all duration-500' href={"/search"}><Search/> Search</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
        <div className='w-fit mx-auto flex gap-5'>
          <div><UserButton /></div>
          <Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}><SpaceDashboardRounded/> Dashboard</Link>
        </div>
      </nav>
      
     <div
  className="pg bg-gray-100 h-fit flex justify-center items-center flex-wrap p-5 gap-5 text-center
      max-md:flex-col"
>
  {surahArray.map((surah) => (
    <div
      onClick={() => router.push(`quran/${surah.number}`)}
      key={surah.number}
      className="surahbox bg-green-800 flex-1 min-w-[250px] max-w-[300px] p-10 rounded-xl hover:shadow-xl hover:shadow-green-300 cursor-pointer transition-all duration-300 mx-auto"
    >
      <div className="arabicName text-green-100 flex justify-between gap-5">
        <div className="Arabic font-bold mx-auto">
          {surah.number} - {surah.name}
        </div>
      </div>
      <div className="EnglishName text-green-100 font-bold text-center">
        {surah.englishName}
      </div>
      <div className="Ayahs text-gray-200 w-fit mx-auto">
        {surah.englishNameTranslation}
      </div>
      <div className="Ayahs text-gray-200 w-fit mx-auto">
        {surah.numberOfAyahs} Ayahs
      </div>
      <div className="Ayahs text-gray-200 w-fit mx-auto">
        {surah.relevationType}
      </div>
    </div>
  ))}
</div>

    {/* <Footer/> */}
    </div>
  )
}


