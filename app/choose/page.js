"use client"
import { useState, useEffect, } from 'react'
import React from 'react'
import Link from 'next/link'
import { useRouter, } from 'next/navigation'
import Footer from '../components/footer'
import { UserButton } from '@clerk/nextjs'
import { ArrowBack, ArrowForward, Favorite } from '@mui/icons-material'
import { Trio } from 'ldrs/react'
import 'ldrs/react/Trio.css'
import { ArrowDropDownCircleRounded, Search, SpaceDashboardRounded } from '@mui/icons-material'
import MobileNav from '../components/mobileNav'
import Navbar from '../components/nav.js'


export default function Page() {

  const [surahArray, setSurahArray] = useState([]);
  let router = useRouter()
  const [loading, setLoading] = useState(true)


  async function fetchSurahs() {
    try {
      let fetchedData = await fetch("https://api.alquran.cloud/v1/surah")
      let surahs = await fetchedData.json()
      setSurahArray(surahs.data)
      setLoading(false)
    }
    catch (error) {
      throw new Error("Failed to fetch data" + error)
    }
  }
  useEffect(() => {
    fetchSurahs()
  }, [])

  if (loading) return <>
    <div>
      <MobileNav/>
    </div>
    <div>
    <Navbar/>
    </div>
     <div data-aos="fade-in" className='min-h-[80vh] flex justify-center items-center text-center'>
        <Trio
          size="150"
          speed="1.5"
          color='green'
        />
      </div>
  </>

  return (

    <div data-aos="fade-in">
      <div>
      <MobileNav/>
    </div>
    <div>
    <Navbar/>
    </div>
      <div data-aos="fade-in"
        className="pg bg-gray-100 h-fit flex justify-center items-center flex-wrap p-5 gap-5 text-center
      max-md:flex-col"
      >
        {surahArray?.map((surah) => (
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
