
"use client"
import React from 'react'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
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
import { ArrowDropDownCircleRounded } from '@mui/icons-material'
import { AutoStories, SpaceDashboardRounded, } from '@mui/icons-material'
import { SignedIn } from '@clerk/nextjs'

const Page = ({ params }) => {

  let inputRef = useRef();
  let number = React.use(params);

  const [surahData, setSurahData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchSurah() {
    try {
      const surahNumber = Number(number.slug);

      // Try multiple approaches to avoid CORS issues
      const apiUrls = [
        `https://alquran-api.pages.dev/api/quran/surah/${surahNumber}?lang=en`,
        `https://corsproxy.io/?${encodeURIComponent(`https://alquran-api.pages.dev/api/quran/surah/${surahNumber}?lang=en`)}`,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://alquran-api.pages.dev/api/quran/surah/${surahNumber}?lang=en`)}`
      ];

      let dataJson = null;

      for (let apiUrl of apiUrls) {
        try {


          let fetchedData = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            mode: 'cors'
          })

          if (fetchedData.ok) {
            dataJson = await fetchedData.json();

            break; // Exit loop if successful
          }
        } catch (err) {

          continue; // Try next URL
        }
      }

      if (!dataJson) {
        throw new Error('All API attempts failed');
      }


      setSurahData(dataJson)
      setLoading(false)
      setError(null)
    } catch (error) {

      setError(error.message)
      setLoading(false)

      toast.error("Failed to load surah data. Please try again.", {
        unstyled: true,
        className:
          "bg-red-400 text-white border border-red-400 border-2 px-4 py-2 rounded-md flex gap-2 shadow items-center justify-center",
      });
    }
  }

  useEffect(() => {
    fetchSurah()
  }, [number.slug])

  // Error state
  if (error) return (
    <div data-aos="fade-in">
      <div className=' md:hidden'>
        <nav className='flex justify-between align-middle items-center bg-gradient-to-r from-green-500 to-green-600 text-white p-6'>
          <details className="dropdown relative duration-500 animate-in">
            <summary className="btn m-1 list-none"><ArrowDropDownCircleRounded /></summary>
            <ul className="bg-green-700 menu absolute left-0 top-full bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
              <li className='shadow p-2'><Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories /> Select Surah</Link></li>
              <li className='shadow p-2'><Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>Dashboard <SpaceDashboardRounded /></Link></li>
            </ul>
          </details>
          <div className='text-2xl font-bold flex gap-2'>Quran Reader <div><UserButton /></div></div>
        </nav>
      </div>

      <nav className='max-md:hidden max-md:flex-col max-md:justify-center flex justify-center align-middle items-center bg-gradient-to-r from-green-500 to-green-600 text-white p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories /> Select Surah</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
        <div className='w-fit mx-auto flex gap-5'>
          <div><UserButton /></div>
          <Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>Dashboard <SpaceDashboardRounded /></Link>
        </div>
      </nav>

      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
          <strong className="font-bold">Error loading data! </strong>
          <span className="block sm:inline">{error}</span>
          <div className="mt-4">
            <button
              onClick={fetchSurah}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
        <p className="mt-4 text-gray-600">If this continues, the API might be temporarily unavailable.</p>
      </div>
    </div>
  )

  if (loading) return (
    <div data-aos="fade-in">
      <div>
        <nav className='flex justify-between align-middle items-center md:hidden bg-gradient-to-r from-green-500 to-green-600 text-white p-6'>
          <details className="dropdown relative duration-500 animate-in">
            <summary className="btn m-1 list-none"><ArrowDropDownCircleRounded /></summary>
            <ul className="bg-green-700 menu absolute left-0 top-full bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
              <li className='shadow p-2'><Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories /> Select Surah</Link></li>
              <li className='shadow p-2'><Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>Dashboard <SpaceDashboardRounded /></Link></li>
            </ul>
          </details>
          <div className='text-2xl font-bold flex gap-2'>Quran Reader <div><UserButton /></div></div>
        </nav>
      </div>

      <nav className='max-md:hidden max-md:flex-col max-md:justify-center flex justify-center align-middle items-center bg-gradient-to-r from-green-500 to-green-600 text-white p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories /> Select Surah</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
        <div className='w-fit mx-auto flex gap-5'>
          <Link className=' cursor-alias hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>Dashboard <SpaceDashboardRounded /></Link>
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
  )

  let verses = surahData?.verses

  return (<>
    <div className=' md:hidden'>
      <nav className='flex justify-between align-middle items-center bg-gradient-to-r from-green-500 to-green-600 text-white p-6'>
        <details className="dropdown relative duration-500 animate-in">
          <summary className="btn m-1 list-none"><ArrowDropDownCircleRounded /></summary>
          <ul className="bg-green-700 menu absolute left-0 top-full bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
            <li className='shadow p-2'><Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories /> Select Surah</Link></li>
            <li className='shadow p-2'><Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>Dashboard <SpaceDashboardRounded /></Link></li>
          </ul>
        </details>
        <div className='text-2xl font-bold flex gap-2'>Quran Reader <div><UserButton /></div></div>
      </nav>
    </div>

    <div data-aos="fade-in">
      <nav className='max-md:hidden max-md:flex-col max-md:justify-center flex justify-center align-middle items-center bg-gradient-to-r from-green-500 to-green-600 text-white p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories /> Select Surah</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
        <div className='w-fit mx-auto flex gap-5'>
          <div><UserButton /></div>
          <Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>Dashboard <SpaceDashboardRounded /></Link>
        </div>
      </nav>

      <div className='flex justify-between'>
      </div>

      <div className='bigboy shadow-sm rounded-xl w-fit h-fit mx-auto border-gray-100 border-solid '>
        <div className="surah w-full mx-auto bg-green-100  pt-5 p-10 max-md:w-full">
          <div className="title">
            <div className="arabic flex text-green-800 font-bold justify-end">
              <p className='w-fit text-3xl'>{surahData?.name || ""}</p>
            </div>
            <div className='english w-fit mx-auto text-green-800 font-bold text-2xl'>
              {surahData?.id || ""} - {surahData?.transliteration || ""} - {surahData?.translation || ""}
            </div>
            <div className='type w-fit mx-auto text-green-600 text-sm mt-2'>
              {surahData?.type ? `${surahData.type.charAt(0).toUpperCase() + surahData.type.slice(1)} • ${surahData.total_verses} verses` : ""}
            </div>
          </div>
        </div>

        <div className='mb-10'>
          {
            Array.isArray(verses) && verses.length > 0 ? verses.map((verse, index) => (
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
                            let numberSurah = Number(number.slug)
                            let verseNumber = verse.id
                            let message = ""
                            onLikeClick(numberSurah, verseNumber, message)

                            toast.success("Accessing Database...", {
                              unstyled: true,
                              className: "bg-green-400 text-white border border-green-400 border-2 px-4 py-2 rounded-md flex gap-2 shadow items-center justify-center",
                            });
                            setTimeout(() => {
                             
                              toast.success("Added to liked verses!", {
                                unstyled: true,
                                className: "bg-green-400 text-white border border-green-400 border-2 px-4 py-2 rounded-md flex gap-2 shadow items-center justify-center",
                              });
                            }, 3000);

                          }}>Skip</AlertDialogCancel>
                          <AlertDialogAction className={"bg-red-500"} onClick={async () => {
                            let numberSurah = Number(number.slug)
                            let verseNumber = verse.id
                            let message = inputRef.current.value;
                            if (!message) {
                              message = "";
                            }
                            onLikeClick(numberSurah, verseNumber, message)
                            toast.success("Accessing Database...", {
                              unstyled: true,
                              className: "bg-green-400 text-white border border-green-400 border-2 px-4 py-2 rounded-md flex gap-2 shadow items-center justify-center",
                            });
                            setTimeout(() => {
                              toast.success("Added to liked verses!", {
                                unstyled: true,
                                className: "bg-green-400 text-white border border-green-400 border-2 px-4 py-2 rounded-md flex gap-2 shadow items-center justify-center",
                              });
                            }, 3000);

                          }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </SignedIn>

                  <div className="arabic flex text-green-800 font-bold justify-end p-3 gap-3">
                    <p className='w-fit text-2xl'>{verse?.text || ""}</p>
                    <p className='w-fit text-green-900 rounded-full text-2xl'>{verse?.id || ""}</p>
                  </div>
                  <p className="text-gray-700 mt-2">
                    {verse?.translation || ""}
                  </p>
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