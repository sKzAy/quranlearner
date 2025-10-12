"use client"
import React from 'react'
import Link from 'next/link'
import { useEffect, useState,useRef } from 'react'
import Footer from '@/app/components/footer'
import { UserButton } from '@clerk/nextjs'
import { FavoriteBorder } from '@mui/icons-material'
import 'ldrs/react/Trio.css'
import { onLikeClick } from '@/app/lib/api'
import { toast } from 'sonner'
import { Trio } from 'ldrs/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {ArrowDropDownCircleRounded} from '@mui/icons-material'
import {AutoStories,SpaceDashboardRounded,} from '@mui/icons-material'
import { SignedIn } from '@clerk/nextjs'

const Page = ({ params }) => {

  let inputRef = useRef();
  let number = React.use(params);

  // console.log(`sloggy: ${params.slug}`)
  const [surah, setSurah] = useState([])
  const [surahEng, setSurahEng] = useState([])
  const [loading, setLoading] = useState(true)
  async function fetchArabic() {

    let fetchedData = await fetch(`https://api.alquran.cloud/v1/surah/${Number(number.slug)}`)

    if (!fetchedData.ok) {
      console.error("Fetch error:", fetchedData.status);
      return;
    }
    let dataJson = await fetchedData.json()
    setSurah(dataJson)
  }
  async function fetchEnglish() {
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

  if (loading) return <div data-aos="fade-in">
    <div>
        <nav className='flex justify-between align-middle items-center md:hidden bg-gradient-to-r from-green-500 to-green-600 text-white
          p-6'>
             
    <details className="dropdown relative duration-500 animate-in">
      <summary className="btn m-1 list-none"><ArrowDropDownCircleRounded /></summary>
      <ul className="bg-green-700 menu absolute left-0 top-full bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
        <li className=''><Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories/> Select Surah</Link></li>
        <li><Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>Dashboard <SpaceDashboardRounded/></Link></li>
      </ul>
    </details>
    <div className='text-2xl font-bold flex gap-2'>Quran Reader <div><UserButton /></div></div>
    </nav>
    
    </div>
    <nav className='max-md:hidden max-md:flex-col max-md:justify-center flex justify-center align-middle items-center bg-gradient-to-r from-green-500 to-green-600 text-white
      p-6'>
      <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
        <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories/> Select Surah</Link>
      </div>
      <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
      <div className='w-fit mx-auto flex gap-5'>
        <Link className=' cursor-alias hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>Dashboard <SpaceDashboardRounded/></Link>
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

  let ayahs = surah?.data?.ayahs

  return (<>
  <div className=' md:hidden'>
      <nav className='flex justify-between align-middle items-center bg-gradient-to-r from-green-500 to-green-600 text-white
        p-6'>      
  <details className="dropdown relative duration-500 animate-in">
    <summary className="btn m-1 list-none"><ArrowDropDownCircleRounded /></summary>
    <ul className="bg-green-700 menu absolute left-0 top-full bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
      <li className=''><Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories/> Select Surah</Link></li>
      <li><Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>Dashboard <SpaceDashboardRounded/></Link></li>
    </ul>
  </details>
  <div className='text-2xl font-bold flex gap-2'>Quran Reader <div><UserButton /></div></div>
  </nav>
  </div>
    <div data-aos="fade-in">
      <nav className='max-md:hidden max-md:flex-col max-md:justify-center flex justify-center align-middle items-center bg-gradient-to-r from-green-500 to-green-600 text-white p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories/> Select Surah</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
        <div className='w-fit mx-auto flex gap-5'>
          <div><UserButton /></div>
          <Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>Dashboard <SpaceDashboardRounded/></Link>
        </div>
      </nav>
      <div className='flex justify-between'>
      </div>
      <div className='bigboy shadow-sm rounded-xl w-fit h-fit mx-auto border-gray-100 border-solid '>
        <div className="surah w-full mx-auto bg-green-100  pt-5 p-10 max-md:w-full">
          <div className="title">
            <div className="arabic flex text-green-800 font-bold justify-end">
              <p className='w-fit text-3xl'>{surah?.data?.name || ""}</p>
            </div>
            <div className='english w-fit mx-auto text-green-800 font-bold text-2xl'>
              {surah?.data?.number || ""} - {surah?.data?.englishName || ""} - {surah?.data?.englishNameTranslation || ""}
            </div>
          </div>
        </div>
        <div className='mb-10'>
          {
            Array.isArray(ayahs) && ayahs.length > 0 ? ayahs.map((ayah, index) =>
              
              <div key={index}>
                
                <div className="verses  w-[95vw] mx-auto bg-gray-100 p-10 max-md:w-full border-t-2 border-slate-200">
                 <SignedIn> <AlertDialog>
                      <AlertDialogTrigger className="cursor-pointer text-sm text-red-400 p-1 "> <FavoriteBorder/> </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Make a note.</AlertDialogTitle>
                          <AlertDialogDescription>
                            <input ref={inputRef} type="text" id="noteInput" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Add a note to your favorite verse" />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={async () => {
                            let numberSurah = Number(number.slug)
                            let verse = ayah.numberInSurah
                            let message = ""
                            let answer = await onLikeClick(numberSurah, verse, message)
                            if (answer === 1){
                            toast.success("Added to liked verses!", {
                              unstyled: true,
                              className:
                                "bg-green-400 text-white border border-green-400 border-2 px-4 py-2 rounded-md flex gap-2 shadow items-center justify-center",
                            });
                          }
                        else if(answer === -1){
                          toast.success("Error,Try Later!", {
                              unstyled: true,
                              className:
                                "bg-red-400 text-white border border-red-400 border-2 px-4 py-2 rounded-md flex gap-2 shadow items-center justify-center",
                            });
                        }}
}
                          
                          
                          >Skip</AlertDialogCancel>
                          <AlertDialogAction className={"bg-red-500"} onClick={async () => {
                            let numberSurah = Number(number.slug)
                            let verse = ayah.numberInSurah
                            let message = inputRef.current.value;
                            if (!message) {
                              message = "";
                            }
                            onLikeClick(numberSurah, verse, message)
                            toast.success("Added to liked verses!", {
                              unstyled: true,
                              className:
                                "bg-green-400 text-white border border-green-400 border-2 px-4 py-2 rounded-md flex gap-2 shadow items-center justify-center",
                            });
                          }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    </SignedIn>
                  <div className="arabic flex text-green-800 font-bold justify-end p-3 gap-3">
                    <p className='w-fit text-2xl'>{ayah?.text || ""}</p>
                    <p className='w-fit text-green-900 rounded-full text-2xl'>{ayah?.numberInSurah || ""}</p>
                    
                  </div>
                  <p>
                    {surahEng?.data?.ayahs && surahEng.data.ayahs[index]
                      ? surahEng.data.ayahs[index].text
                      : ""}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 p-10">No verses found.</div>
            )
          }
        </div>
      </div>
      {/* <Footer /> */}
    </div>
    </>
  )
}

export default Page
