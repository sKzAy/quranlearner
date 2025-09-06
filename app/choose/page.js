"use client"
import { useState, useEffect,} from 'react'
import React from 'react'
import Link from 'next/link'
import { useRouter, } from 'next/navigation'
import Footer from '../components/footer'

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
            console.log(error)
        }
        
    }
    useEffect(() => {
      fetchSurahs()
    }, [])

    if (loading){
        return  <> <nav  className='max-md:flex-col max-md:justify-center flex justify-between bg-gradient-to-r from-green-500 to-green-600 text-white
      p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className='hover:underline hover:text-black transition-all hover:transition-all duration-500' href={"/"}>Back to home</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
        <div className='w-fit mx-auto'>
          <Link className='' href={'/dashboard'}>My Favorites</Link>
        </div>
      </nav>
      </>
    }
  return (
    <>
       <nav  className='max-md:flex-col max-md:justify-center flex justify-between bg-gradient-to-r from-green-500 to-green-600 text-white
      p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className='hover:underline hover:text-black transition-all hover:transition-all duration-500' href={"/"}>Back to home</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
        <div className='w-fit mx-auto'>
          <Link className='' href={'/dashboard'}>My Favorites</Link>
        </div>
      </nav>
      <div className="pg bg-gray-100 h-fit flex justify-center align-middle flex-wrap p-5 gap-5 text-center
      max-md:flex-col">
        {
            surahArray.map((surah) =>
            <div  onClick={()=>{
                router.push(`quran/${surah.number}`)
            }} key={surah.number} className="max-md:w-[80vw] surahbox bg-green-800 w-[20vw] p-10 rounded-xl hover:shadow-xl hover:shadow-green-300 cursor-pointer transition-all hover:transition-all duration-300 mx-auto">
            <div className="arabicName text-green-100 flex justify-between gap-5">
                
                <div className="Arabic font-bold mx-auto"> {surah.number} - {surah.name}  </div>
            </div>
            <div className="EnglishName text-green-100 font-bold text-center">{surah.englishName}</div>
            <div className="Ayahs text-gray-200 w-fit mx-auto"> {surah.englishNameTranslation}</div>
            <div className="Ayahs text-gray-200 w-fit mx-auto">{surah.numberOfAyahs} Ayahs</div>
            <div className="Ayahs text-gray-200 w-fit mx-auto">{surah.relevationType}</div>
        </div>)
        
        }
      </div>
      <Footer/>
    </>
  )
}


