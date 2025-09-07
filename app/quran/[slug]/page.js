"use client"
import React from 'react'
import Link from 'next/link'
import { useEffect,useState } from 'react'
import { use } from 'react'
import Footer from '@/app/components/footer'
import { UserButton } from '@clerk/nextjs'
import { ArrowBack, Favorite } from '@mui/icons-material'
import { Trio } from 'ldrs/react'
import 'ldrs/react/Trio.css'

const Page = ({params}) => {
let number = use(params)

  // console.log(`sloggy: ${params.slug}`)
  const [surah, setSurah] = useState([])
  const [surahEng,setSurahEng] = useState([])
  const [loading, setLoading] = useState(true)
  async function fetchArabic(){
    
    console.log(`numba: ${number}`)
    let fetchedData = await fetch(`https://api.alquran.cloud/v1/surah/${Number(number.slug)}`)

      if (!fetchedData.ok) {
      console.error("Fetch error:", fetchedData.status);
    return;
  }
    let dataJson = await fetchedData.json()
    setSurah(dataJson)
  }
async function fetchEnglish(){
  let fetchData = await fetch(`https://api.alquran.cloud/v1/surah/${Number(number.slug)}/en.asad`)
     if (!fetchData.ok) {
      console.error("Fetch error:", fetchData.status);
    return;
  }
  let dataJsonEng = await fetchData.json()
    setSurahEng(dataJsonEng)
    setLoading(false)
}


useEffect(() => {
  fetchArabic()
}, [])
useEffect(() => {
  fetchEnglish()
}, [])

  if (loading) return <div data-aos = "fade-in">
   <nav  className='max-md:flex-col max-md:justify-center flex justify-between bg-gradient-to-r from-green-500 to-green-600 text-white
      p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/"}> <ArrowBack/> Back to home</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
        <div className='w-fit mx-auto flex gap-5'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>My Favorites </Link>
          <div><UserButton/></div>
        </div>
      </nav>
      <div data-aos = "fade-in" className='min-h-[80vh] flex justify-center items-center text-center'>
           <Trio
       size="150"
       speed="1.5"
       color='green'
         />
     </div>
   </div>
  
  return (
    <div data-aos = "fade-in">
    <nav  className='max-md:flex-col max-md:justify-center flex justify-between bg-gradient-to-r from-green-500 to-green-600 text-white
      p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}><ArrowBack/> Back to choose</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
        <div className='w-fit mx-auto flex gap-5'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>My Favorites  <Favorite/> </Link>
          <div><UserButton/></div>
        </div>
      </nav>
        <div className='flex justify-between'>
          {/* <div><Image src={""} alt = "none" width={20} height={20}></Image></div> */}
        </div>
      <div  className='bigboy shadow-sm rounded-xl w-fit h-fit mx-auto border-gray-100 border-solid '>
          <div  className="surah w-[75vw] mx-auto bg-green-100  pt-5 p-10 max-md:w-full">
          <div className="title">
              <div className="arabic flex text-green-800 font-bold justify-end">
              <p className='w-fit text-3xl'>{surah.data?.name}</p>
              </div>
              <div className='english w-fit mx-auto text-green-800 font-bold text-2xl'>
             {surah.data?.number} - {surah.data?.englishName} - {surah.data?.englishNameTranslation}
              </div>
          </div>
        </div>
            <div className='mb-10'>
           {
          surah?.data?.ayahs?.map((surah,index) =>
          <div key={index} >
         <div className="verses w-[75vw] mx-auto bg-gray-100 p-10 max-md:w-full border-t-2 border-slate-200">
             <div className="arabic flex text-green-800 font-bold justify-end p-3 gap-3">
              <p className='w-fit text-2xl'>{surah.text}</p>
              <p className='w-fit text-green-900 rounded-full text-2xl'>{surah.numberInSurah}</p>
              
              </div>
              <p>{surahEng?.data?.ayahs? surahEng.data.ayahs[index].text:<></>}</p>
          </div>
          </div>
          )}
          </div>
      
      </div>
      
      {/* {loading === false ? <Footer/>:<div></div>} */}
      
    </div>
  )
}

export default Page
