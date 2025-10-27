"use client"
import React from 'react'
import { useEffect, useState, useRef } from 'react'
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
import { SignedIn } from '@clerk/nextjs'
import ReadNavMobile from '@/app/components/readNavMobile'
import ReadNav from '@/app/components/readNav'
import FetchSurahObject from '@/app/lib/quranFunctions.js'
const Page = ({params}) => {
  


  const inputRef = useRef()
  const slug = React.use(params).slug
  const[urdu,setUrdu] = useState(false)
  const [surahData, setSurahData] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchSurah(surahNumber) {
    try {
      // FetchSurahObject expects the 1-based surah number
      const data = await FetchSurahObject(Number(surahNumber))
      setSurahData(data)
    } catch (e) {
      console.error('fetchSurah error:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSurah(Number(slug))
  }, [slug])

  if (loading || !surahData) return (
    <div data-aos="fade-in">
      <div><ReadNavMobile/></div>
      <div><ReadNav/></div>
      <div data-aos="fade-in" className='min-h-[80vh] flex justify-center items-center text-center'>
        <Trio size="150" speed="1.5" color='green' />
      </div>
    </div>
  )

  return (<>
    <div className=' md:hidden'><ReadNavMobile/></div>
    <div data-aos="fade-in">
     <ReadNav/>
      <div className='bigboy shadow-sm rounded-xl w-fit h-fit mx-auto border-gray-100 border-solid '>
        <div className="surah w-full mx-auto bg-green-100  pt-5 p-10 max-md:w-full">
          <div className="title">
            <div className="arabic flex justify-between max-md:mb-3">
               <div className='text-white text-sm bg-green-700 rounded-sm p-2 transition-all duration-300 hover:transition-all hover:duration-300 hover:font-bold cursor-pointer text-center' onClick={()=>{
                if(urdu === false){
                  setUrdu(true)
                }
                else{
                  setUrdu(false)
                }
               }}>{(urdu === false)?<p>Urdu</p>:<p>English</p>}</div>
              <p className='w-fit text-3xl font-bold text-green-800'>{surahData.surahNameArabic}</p>
            </div>
            <div className='english w-fit mx-auto text-green-800 font-bold text-2xl'>
              {Number(slug)} - {surahData.surahName} - {surahData?.surahNameTranslation}
            </div>
            <div className='type w-fit mx-auto text-green-600 text-sm mt-2'>
              {surahData.numOfAyahs} verses
            </div>
          </div>
        </div>

        <div className='mb-10'>
          {
            surahData.verses.length > 0 ? surahData.verses.map((verse, index) => (
              <div key={index}>
                <div className="verses  w-[95vw] mx-auto bg-gray-100 p-10 max-md:w-full border-t-2 border-slate-200">
                  <SignedIn>
                    <AlertDialog>
                      <AlertDialogTrigger className="cursor-pointer text-sm text-red-400 p-1 "> <FavoriteBorder /> </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Make a note.</AlertDialogTitle>
                          <AlertDialogDescription>
                            <input ref={inputRef} type="text" id="noteInput" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Add a note to your favorite verse" />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={async () => {
                            const numberSurah = Number(slug)
                            const verseNumber = index+1
                            const message = ""
                            await onLikeClick(numberSurah, verseNumber, message)
                            toast.success("Successfully added!", {
                                       unstyled: true,
                                       className:
                                         "bg-green-400 text-white border border-green-400 border-2 px-4 py-2 rounded-md flex gap-2 shadow items-center justify-center",
                                     });
                          }}>Skip</AlertDialogCancel>
                          <AlertDialogAction className={"bg-red-500"} onClick={async () => {
                            const numberSurah = Number(slug)
                            const verseNumber = index + 1
                            const message = inputRef.current?.value ?? ""
                            await onLikeClick(numberSurah, verseNumber, message)
                             toast.success("Successfully added!", {
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
                    <p className='w-fit text-2xl'>{verse.verseArabic}</p>
                    <p className='w-fit text-green-900 rounded-full text-2xl'>{index+1}</p>
                  </div>
                  <div className="text-gray-700 mt-2 text-lg">
                    {(urdu === false)?<p className=''>{verse.verse}</p>:<p className='text-right font-bold'>{verse.verseUrdu}</p>}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center text-gray-500 p-10">No verses found.</div>
            )}
        </div>
      </div>
    </div>
  </>)
}


export default Page
// ...existing code...