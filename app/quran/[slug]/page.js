"use client"
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { FavoriteBorder, PlayArrow } from '@mui/icons-material'
import 'ldrs/react/Trio.css'
import { onLikeClick } from '@/app/lib/api'
import { toast } from 'sonner'
import { Trio } from 'ldrs/react'
import SimpleFooter2 from '@/app/components/footer2'
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
import AudioPlayer from '@/app/components/audioPlayer'
import { useRouter } from 'next/navigation'
const Page = ({ params }) => {
  const inputRef = useRef()
  const audioPlayerRef = useRef() // Add this ref for the audio player
  const slug = React.use(params).slug
  const [urdu, setUrdu] = useState(false)
  const [surahData, setSurahData] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function fetchSurah(surahNumber) {
    try {
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
      <div><ReadNavMobile /></div>
      <div><ReadNav /></div>
      <div data-aos="fade-in" className='min-h-[80vh] flex justify-center items-center text-center'>
        <Trio size="150" speed="1.5" color='green' />
      </div>
    </div>
  )

  return (
    <>
      <div className='md:hidden'><ReadNavMobile /></div>
      <ReadNav />
      <div data-aos="fade-in">
        <div className='bigboy shadow-sm rounded-xl w-fit h-fit mx-auto border-gray-100 border-solid '>
          <div className="surah w-full mx-auto bg-green-100 pt-5 p-10 max-md:w-full">
            <div className="title">
              <div className="arabic flex justify-between items-center max-md:mb-3">
                <div
                  className="text-white text-sm bg-green-700 rounded-sm p-2 transition-all duration-300 hover:font-bold cursor-pointer text-center"
                  onClick={() => setUrdu((prev) => !prev)}
                >
                  {urdu ? "English" : "Urdu"}
                </div>
                <p className="w-fit text-3xl font-bold text-green-800 text-right">{surahData.surahNameArabic}</p>
              </div>

              <div className='english w-fit mx-auto text-green-800 font-bold text-2xl'>
                {Number(slug)} - {surahData.surahName} - {surahData?.surahNameTranslation}
              </div>
              <div className='type w-fit mx-auto text-green-600 text-sm mt-2 font-bold'>
                {surahData.numOfAyahs} verses
              </div>
            </div>
          </div>

          <div className='mb-10'>
            {surahData.verses.length > 0 ? surahData.verses.map((verse, index) => (
              <div key={index}>
                <div className="verses w-[95vw] mx-auto bg-gray-100 p-10 max-md:w-full border-t-2 border-slate-200">
                  <div className='flex justify-between'>
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
                              const verseNumber = index + 1
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
                    <p className='w-fit text-green-900 rounded-full text-2xl'>{index + 1}</p>
                  </div>

                  <div className="arabic flex text-green-800 font-bold justify-end p-3 gap-3">
                    <p className='w-fit text-2xl text-right'>{verse.verseArabic}</p>
                  </div>
                  <div className="text-gray-700 mt-2 text-lg">
                    {(urdu === false) ? <p className='text-left'>{verse.verse}</p> : <p className='text-right font-bold'>{verse.verseUrdu}</p>}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center text-gray-500 p-10">No verses found.</div>
            )}
          </div>
        </div>
      </div>
      <div className='flex justify-between align-middle px-30 py-5'>
        <div onClick={()=>{
          if(Number(slug) === 1){
            router.push(`/quran/114`);
          }
          else{
          router.push(`/quran/${Number(slug)-1}`)
          }
        }}
        className="previous bg-green-500 text-white px-4 py-1 rounded-xl
        hover:duration-300 hover:text-black duration-300 transition-all hover:transition-all cursor-pointer text-center">Previous</div>
          <div
        onClick={()=>{
          if(Number(slug) === 114){
            router.push(`/quran/1`)
          }
          else{
          router.push(`/quran/${Number(slug)+1}`)
          }
        }} className="next bg-green-500 text-white px-6 py-1 rounded-xl
        hover:duration-300 hover:text-black duration-300 transition-all hover:transition-all cursor-pointer text-center">Next</div>
      </div>
      {/* Audio Player - Rendered at root level, outside main content */}
      <AudioPlayer
        ref={audioPlayerRef}
        src={`https://server8.mp3quran.net/afs/${String(slug).padStart(3, '0')}.mp3`}
      />
      <SimpleFooter2/>
    </>
  )
}

export default Page