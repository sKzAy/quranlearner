// "use client"
// import React from 'react'
// import Link from 'next/link'
// import { ArrowBack, Search } from '@mui/icons-material'
// import { UserButton } from '@clerk/nextjs'
// import { Favorite } from '@mui/icons-material'
// import { useRef, useState } from 'react'
// // import { Search } from '@mui/icons-material'

// export default function Page(){
//   let inputRef = useRef()
//   function normalize(str) {
//   return str.toLowerCase().replace(/[^a-z0-9]/g, "");
// }

//   async function handleClick (){

// const surahNames = [
//   "Al-Fatihah",
//   "Al-Baqarah",
//   "Aal-E-Imran",
//   "An-Nisa",
//   "Al-Maidah",
//   "Al-Anam",
//   "Al-Araf",
//   "Al-Anfal",
//   "At-Tawbah",
//   "Yunus",
//   "Hud",
//   "Yusuf",
//   "Ar-Rad",
//   "Ibrahim",
//   "Al-Hijr",
//   "An-Nahl",
//   "Al-Isra",
//   "Al-Kahf",
//   "Maryam",
//   "Ta-Ha",
//   "Al-Anbiya",
//   "Al-Hajj",
//   "Al-Muminun",
//   "An-Nur",
//   "Al-Furqan",
//   "Ash-Shuara",
//   "An-Naml",
//   "Al-Qasas",
//   "Al-Ankabut",
//   "Ar-Rum",
//   "Luqman",
//   "As-Sajda",
//   "Al-Ahzab",
//   "Saba",
//   "Fatir",
//   "Ya-Sin",
//   "As-Saffat",
//   "Sad",
//   "Az-Zumar",
//   "Ghafir",
//   "Fussilat",
//   "Ash-Shura",
//   "Az-Zukhruf",
//   "Ad-Dukhan",
//   "Al-Jathiya",
//   "Al-Ahqaf",
//   "Muhammad",
//   "Al-Fath",
//   "Al-Hujurat",
//   "Qaf",
//   "Adh-Dhariyat",
//   "At-Tur",
//   "An-Najm",
//   "Al-Qamar",
//   "Ar-Rahman",
//   "Al-Waqia",
//   "Al-Hadid",
//   "Al-Mujadila",
//   "Al-Hashr",
//   "Al-Mumtahina",
//   "As-Saff",
//   "Al-Jumua",
//   "Al-Munafiqoon",
//   "At-Taghabun",
//   "At-Talaq",
//   "At-Tahrim",
//   "Al-Mulk",
//   "Al-Qalam",
//   "Al-Haqqah",
// ]
// function findSurah(query) { const normQuery = normalize(query); let bestMatch = null; let bestScore = 0; for (const surah of surahNames) { const normSurah = normalize(surah);  let score = 0; for (const char of normQuery) { if (normSurah.includes(char)) score++; } if (normSurah.includes(normQuery)) {  return surah; } if (score > bestScore) { bestScore = score; bestMatch = surah; } } return bestMatch; }



//     let enteredData = inputRef.current.value
//     const data = normalize(enteredData)
//     console.log(data)
//   }

//   return (
//     <>
//      <div data-aos = "fade-in">
//     <nav  className='max-md:flex-col max-md:justify-center flex justify-center align-middle items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white
//       p-6'>
//         <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
//           <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/"}><ArrowBack/> Back to home</Link>
//         </div>
//         <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
//         <div className='w-fit mx-auto flex gap-5'>
//           <Link className=' hidden cursor-alias hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>My Favorites <Favorite/> </Link>
//           <div><UserButton/></div>
//         </div>
//       </nav>
//       </div>
//       <div className='bg-gray-100 p-10 h-screen '>
//         <div className='bg-white flex flex-col gap-5 justify-center p-6 rounded-3xl w-[70vw] mx-auto'>
//         <div className="search">
//          Search The Quran
//         </div>
//         <div className="input flex gap-2">
//           <input ref = {inputRef} className='w-full bg-gray-100 p-2 rounded-xl text-gray-700' type="text" placeholder='Search for topics,surah,verses etc' /> <button onClick={handleClick} className=' bg-blue-500 p-2 rounded-2xl text-white transition-all hover:text-black hover:transition-all cursor-pointer duration-500 hover:duration-500'>Search</button>
//         </div>
//         <div className='text-gray-500 text-sm'>Try searching for any surah </div>
//         </div>
//         <div className="hidden list w-[70vw] bg-white rounded-3xl mx-auto mt-5 p-10">
//          yo
//          </div>
//       </div>
      
//     </>
//   )
// }


"use client"
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowBack, Search } from '@mui/icons-material'
import { UserButton } from '@clerk/nextjs'
import { Favorite } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export default function Page(){
  let hRef = useRef()
  let router = useRouter()
  let inputRef = useRef()
  const [result, setResult] = useState(null)
  const [suggestions, setSuggestions] = useState([])

  function normalize(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, "")
  }

  const surahNames = [
    "Al-Fatihah","Al-Baqarah","Aal-E-Imran","An-Nisa","Al-Maidah","Al-Anam","Al-Araf","Al-Anfal",
    "At-Tawbah","Yunus","Hud","Yusuf","Ar-Rad","Ibrahim","Al-Hijr","An-Nahl","Al-Isra","Al-Kahf",
    "Maryam","Ta-Ha","Al-Anbiya","Al-Hajj","Al-Muminun","An-Nur","Al-Furqan","Ash-Shuara","An-Naml",
    "Al-Qasas","Al-Ankabut","Ar-Rum","Luqman","As-Sajda","Al-Ahzab","Saba","Fatir","Ya-Sin","As-Saffat",
    "Sad","Az-Zumar","Ghafir","Fussilat","Ash-Shura","Az-Zukhruf","Ad-Dukhan","Al-Jathiya","Al-Ahqaf",
    "Muhammad","Al-Fath","Al-Hujurat","Qaf","Adh-Dhariyat","At-Tur","An-Najm","Al-Qamar","Ar-Rahman",
    "Al-Waqia","Al-Hadid","Al-Mujadila","Al-Hashr","Al-Mumtahina","As-Saff","Al-Jumua","Al-Munafiqoon",
    "At-Taghabun","At-Talaq","At-Tahrim","Al-Mulk","Al-Qalam","Al-Haqqah"
  ]

  // Map surah names to their numbers (1-indexed)
  const surahNameToNumber = {}
  surahNames.forEach((name, index) => {
    surahNameToNumber[normalize(name)] = index + 1
  })

  function similarity(a, b) {
    a = a.toLowerCase()
    b = b.toLowerCase()
    let matches = 0
    for (let char of a) {
      if (b.includes(char)) matches++
    }
    return matches / Math.max(a.length, b.length)
  }

  function findSurah(query) {
    const normQuery = normalize(query)

    // Perfect match
    const exact = surahNames.find(s => normalize(s) === normQuery)
    if (exact) {
      return { 
        match: exact, 
        suggestions: [],
        surahNumber: surahNameToNumber[normalize(exact)]
      }
    }

    // Partial match
    const partial = surahNames.find(s => normalize(s).includes(normQuery))
    if (partial) {
      return { 
        match: partial, 
        suggestions: [],
        surahNumber: surahNameToNumber[normalize(partial)]
      }
    }

    // Suggestions
    const scored = surahNames.map(s => ({
      name: s,
      score: similarity(normQuery, s),
      surahNumber: surahNameToNumber[normalize(s)]
    }))
    scored.sort((a, b) => b.score - a.score)

    return { 
      match: null, 
      suggestions: scored.slice(0, 3).map(s => ({
        name: s.name,
        number: s.surahNumber
      }))
    }
  }

  function handleSurahClick(surahName, surahNumber) {
    router.push(`/quran/${surahNumber}`)
  }

  async function handleClick (){
    let enteredData = inputRef.current.value
    if (!enteredData) return

    const { match, suggestions, surahNumber } = findSurah(enteredData)
    setResult(match ? { name: match, number: surahNumber } : null)
    setSuggestions(suggestions)

    // Auto-redirect if exact match found
    if (match && surahNumber) {
      // Small delay to show the result before redirecting
      setTimeout(() => {
        router.push(`/quran/${surahNumber}`)
      }, 500)
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }
  
  return (
    <>
     <div data-aos = "fade-in">
      <nav className='max-md:flex-col max-md:justify-center flex justify-center align-middle items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/"}><ArrowBack/> Back to home</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Reader</p></div>
        <div className='w-fit mx-auto flex gap-5'>
          <Link className=' hidden cursor-alias hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}>My Favorites <Favorite/> </Link>
          <div><UserButton/></div>
        </div>
      </nav>
     </div>

      <div className='bg-gray-100 p-10 h-screen '>
        <div className='bg-white flex flex-col gap-5 justify-center p-6 rounded-3xl w-[70vw] mx-auto'>
          <div className="search">
            Search The Quran
          </div>
          <div className="input flex gap-2">
            <input 
              ref={inputRef} 
              className='w-full bg-gray-100 p-2 rounded-xl text-gray-700' 
              type="text" 
              placeholder='eg Al-Fatihah'
              onKeyPress={handleKeyPress}
            /> 
            <button onClick={handleClick} className=' bg-blue-500 p-2 rounded-2xl text-white transition-all hover:text-black hover:transition-all cursor-pointer duration-500 hover:duration-500'>Search</button>
          </div>
          <div className='text-gray-500 text-sm'>Try searching for any surah </div>
        </div>
        
        <div ref={hRef} className="list w-[70vw] bg-white rounded-3xl mx-auto mt-5 p-10">
          {result && (
            <div>
              <p>✅ Found Surah: <strong>{result.name}</strong></p>
              <button 
                onClick={() => handleSurahClick(result.name, result.number)}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Go to Surah {result.number}: {result.name}
              </button>
              <p className="text-sm text-gray-600 mt-1">Redirecting automatically...</p>
            </div>
          )}
          
          {!result && suggestions.length > 0 && (
            <div>
              <p>❌ Surah not found.</p>
              <p>Did you mean:</p>
              <ul className="list-disc pl-5 mt-2">
                {suggestions.map((s, i) => (
                  <li key={i} className="mb-2">
                    <button 
                      onClick={() => handleSurahClick(s.name, s.number)}
                      className="text-blue-600 hover:text-blue-800 underline cursor-pointer text-left"
                    >
                      {s.name} (Surah {s.number})
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

