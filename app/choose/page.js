"use client"
import { useState, useEffect, } from 'react'
import React from 'react'
import { useRouter, } from 'next/navigation'
import { Trio } from 'ldrs/react'
import 'ldrs/react/Trio.css'
import MobileNav from '../components/mobileNav'
import Navbar from '../components/nav.js'
import { FetchSurahInfo } from '../lib/quranFunctions'
import ChooseObject from '../components/chooseObject'
import SimpleFooter from '../components/footer'


export default function Page() {
  async function getSurahInfos(){
  let surahInfos = await FetchSurahInfo()
  setSurahInfos(surahInfos)

  }
  let router = useRouter()
  const [loading, setLoading] = useState(true)
  const[surahInfos,setSurahInfos] = useState([])
  useEffect(() => {
    getSurahInfos()
    setLoading(false)
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
    <ChooseObject props = {surahInfos}/>
    <SimpleFooter/>
    </div>
    
  )

}
