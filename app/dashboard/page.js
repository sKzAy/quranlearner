import React from 'react'
import Link from 'next/link'
import { UserButton,  } from '@clerk/nextjs'
import {  AutoStories, Search } from '@mui/icons-material'
import { currentUser } from '@clerk/nextjs/server'
import { addClerkUserToDb } from '../lib/actions'
import { getUserLiked } from '../lib/actions'
import DeleteProp from '../components/delete'
import { ArrowDropDownCircleRounded } from '@mui/icons-material'


const Page = async () => {
  let userName = (await currentUser()).firstName
  const user = await currentUser()
  addClerkUserToDb(user.id,user.firstName)
  let liked = await getUserLiked(user.id)
  let favVerses = liked[0].liked
  let fetchedVerse = [{}]
  async function fetchFavVerses(){
    let i = 0
    while (i < favVerses.length){
      let surahNo = favVerses[i].surah
      let verseNo = favVerses[i].verse
      let message = favVerses[i].message
      let fetchedData = await fetch(`https://api.alquran.cloud/v1/ayah/${surahNo}:${verseNo}/en.asad`)
      let dataJson = await fetchedData.json()
       let fetchedDataAr = (await fetch(`https://api.alquran.cloud/v1/ayah/${surahNo}:${verseNo}/ar`))
      let dataJsonAr = await fetchedDataAr.json()
      fetchedVerse.push({"surah":surahNo,"verse":verseNo,"message":message,"arabic":dataJsonAr.data.text,"english":dataJson.data.text})
      i++
    }
  }
  await fetchFavVerses()
  if (favVerses.length === 0){
    return(
      <>
      <div>
    <nav className='flex justify-between align-middle items-center md:hidden bg-gradient-to-r from-red-500 to-red-600 text-white
      p-6'>
         
<details className="dropdown relative z-[9999]">
  <summary className="btn m-1 list-none z-[9999]">
    <ArrowDropDownCircleRounded />
  </summary>
  <ul className="menu absolute left-0 top-full bg-red-700 rounded-box w-52 p-2 shadow-sm z-[9999]">
    <li className=''><Link href="/search"><Search/> Search</Link></li>
    <li><Link href="/choose"> <AutoStories/> Continue Reading</Link></li>
  </ul>
</details>
<div className='text-2xl font-bold flex gap-2'>Dashboard<div><UserButton /></div></div>
</nav>
</div>
      <div className='' data-aos = "fade-in">
       <nav  className='max-md:hidden max-md:flex-col max-md:justify-center flex justify-between bg-gradient-to-r from-red-500 to-red-600 text-white
            p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/search"}><Search/>Search</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>My DashBoard</p></div>
        <div className='w-fit mx-auto flex gap-5 '>
          <div><UserButton/></div>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={'/choose'}> <AutoStories/> Continue Reading</Link>
        </div>
      </nav>
      <div className='min-h-screen bg-gray-100 pt-5'>
      <div className='bg-white w-fit h-fit mx-auto rounded-xl p-16'>
        <div className='text-3xl text-center p-5'>No Favorite Verses Yet</div>
        <div className="start text-gray-600 text-lg w-[40vw] text-center mx-auto">Start building your personal collection of meaningful verses by adding favorites while reading or searching the Quran.</div>
        <div className='pt-10 flex justify-center gap-5'>
          <Link href={"/choose"}> <div className="btn1 hover:text-black transition-all hover:transition-all duration-400 w-fit bg-green-600 p-3 rounded-full text-white flex gap-3">Start Reading <AutoStories/> </div></Link>
          <Link href={"/search"}><div className="btn1 hover:text-black transition-all hover:transition-all duration-400 w-fit bg-blue-600 p-3 rounded-full text-white flex gap-3">Start Searching <Search/> </div></Link>
        </div>
        </div>
      </div>
      </div>
      </>
    )
  }
  return (
    <>
    <div>
    <nav className='flex justify-between align-middle items-center md:hidden bg-gradient-to-r from-red-500 to-red-600 text-white
      p-6'>
         
<details className="dropdown relative z-[9999]">
  <summary className="btn m-1 list-none z-[9999]">
    <ArrowDropDownCircleRounded />
  </summary>
  <ul className="menu absolute left-0 top-full bg-red-700 rounded-box w-52 p-2 shadow-sm z-[9999]">
    <li><Link href="/search"><Search/> Search</Link></li>
    <li><Link href="/choose"> <AutoStories/> Continue Reading</Link></li>
  </ul>
</details>

<div className='text-2xl font-bold flex gap-2'>Dashboard<div><UserButton /></div></div>
</nav>

</div>

    <div className='' data-aos = "fade-in">
            <nav  className='max-md:hidden max-md:flex-col max-md:justify-center flex justify-between bg-gradient-to-r from-red-500 to-red-600 text-white
            p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/search"}><Search/> Search</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>My DashBoard</p></div>
        <div className='w-fit mx-auto flex gap-5 '>
          <div><UserButton/></div>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={'/choose'}> <AutoStories/> Continue Reading</Link>
          
        </div>
      </nav>
      <div className="pg bg-green-50 min-h-screen p-5 ">
        <div className="fav bg-white shadow flex flex-col align-middle justify-center text-center">
          <p className='text-3xl  p-3 text-red-600 font-bold'><span className='text-black'>Your Collection</span> {userName} </p>
        <div className='verseMap shadow border-t-2 border-gray-100'>
          <div className='flex justify-between align-middle flex-col'>
            {fetchedVerse.map((verseObj, index) => {
              if (index === 0) return null;
              let arabicText = verseObj.arabic;
              let englishText = verseObj.english;
              return (
                <div key={index} className='eachVerse border-b-2 border-gray-100 p-5 hover:bg-red-50 transition-all hover:transition-all duration-500'>
                  <div className='flex justify-start gap-2 align-middle p-2'>
                    <div> <DeleteProp props={{surah:verseObj.surah,verse:verseObj.verse}}/></div>
                    <div className="bg-red-200 surah rounded-full p-2">Surah {verseObj.surah}</div>
                    <div className="bg-red-200 ayah rounded-full p-2">Verse {verseObj.verse}</div>
                  </div>
                  <div className="arabic text-right p-5 text-3xl">{arabicText}</div>
                  <div className="english text-left p-5 text-xl">{englishText}</div>
                  {
                   ( verseObj.message !== "") ?
                  <div className='text-left p-5 text-xl'>Your Note: <div className="message text-left p-5 italic text-gray-600">"{verseObj.message}"</div></div>: <div></div>}
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Page
