
"use client"
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { Search } from '@mui/icons-material'
import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ArrowDropDownCircleRounded } from '@mui/icons-material'
import { AutoStories,SpaceDashboardRounded } from '@mui/icons-material'

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
    "At-Taghabun","At-Talaq","At-Tahrim","Al-Mulk","Al-Qalam","Al-Haqqah","Al-Maarij","Nuh","Al-Jinn",
    "Al-Muzzammil","Al-Muddathir","Al-Qiyamah","Al-Insan","Al-Mursalat","An-Naba","An-Naziat","Abasa",
    "At-Takwir","Al-Infitar","Al-Mutaffifin","Al-Inshiqaq","Al-Buruj","At-Tariq","Al-Ala","Al-Ghashiyah",
    "Al-Fajr","Al-Balad","Ash-Shams","Al-Lail","Ad-Duha","Al-Inshirah","At-Tin","Al-Alaq","Al-Qadr",
    "Al-Bayyinah","Az-Zalzalah","Al-Adiyat","Al-Qariah","At-Takathur","Al-Asr","Al-Humazah","Al-Fil",
    "Quraysh","Al-Maun","Al-Kawthar","Al-Kafirun","An-Nasr","Al-Masad","Al-Ikhlas","Al-Falaq","An-Nas"
  ]

  // Map surah names to their numbers (1-indexed)
  const surahNameToNumber = {}
  surahNames.forEach((name, index) => {
    surahNameToNumber[normalize(name)] = index + 1
  })

  // Create a map for surah numbers to names
  const surahNumberToName = {}
  surahNames.forEach((name, index) => {
    surahNumberToName[index + 1] = name
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

    // Check if query is a number (surah number search)
    const queryAsNumber = parseInt(query.trim())
    if (!isNaN(queryAsNumber)) {
      if (queryAsNumber >= 1 && queryAsNumber <= surahNames.length) {
        return { 
          match: surahNumberToName[queryAsNumber], 
          suggestions: [],
          surahNumber: queryAsNumber
        }
      } else {
        // Number out of range, show suggestions for closest numbers
        const closeNumbers = []
        for (let i = Math.max(1, queryAsNumber - 2); i <= Math.min(surahNames.length, queryAsNumber + 2); i++) {
          closeNumbers.push({ name: surahNumberToName[i], number: i })
        }
        return { 
          match: null, 
          suggestions: closeNumbers
        }
      }
    }

    // Original name-based search logic
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
      <div className=' md:hidden'>
          <nav className='flex justify-between align-middle items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white
            p-6'>      
      <details className="dropdown relative duration-500 animate-in">
        <summary className="btn m-1 list-none"><ArrowDropDownCircleRounded /></summary>
        <ul className="bg-blue-700 menu absolute left-0 top-full bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
          <li className=''><Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories/> Select Surah</Link></li>
          <li><Link className=' cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}><SpaceDashboardRounded/> Dashboard</Link></li>
        </ul>
      </details>
      <div className='text-2xl font-bold flex gap-2'>Quran Searcher<div><UserButton /></div></div>
      </nav>
      </div>
     <div data-aos = "fade-in">
      <nav className='max-md:hidden max-md:flex-col max-md:justify-center flex justify-center align-middle items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6'>
        <div className='flex justify-center align-middle gap-5 w-fit mx-auto'>
          <Link className=' hover:text-black transition-all hover:transition-all duration-500' href={"/choose"}> <AutoStories/> Select Surah</Link>
        </div>
        <div> <p className='text-2xl font-bold text-center w-fit mx-auto'>Quran Searcher</p></div>
        <div className='w-fit mx-auto flex gap-5'>
          <div><UserButton/></div>
          <Link className='cursor-pointer hover:text-black transition-all hover:transition-all duration-500' href={'/dashboard'}><SpaceDashboardRounded/> Dashboard</Link>
          
        </div>
      </nav>
     </div>

      <div className='bg-gray-100 p-10 h-screen '>
        <div className='bg-white flex flex-col gap-5 justify-center p-6 rounded-3xl w-[70vw] mx-auto'>
          <div className="search font-bold max-md:min-w-[90vw] ">
            Search The Quran
          </div>
          <div className="input flex gap-2 ">
            <input 
              ref={inputRef} 
              className='w-full bg-gray-100 p-2 rounded-xl text-gray-700' 
              type="text" 
              placeholder='eg: Al-Fatihah or 1'
              onKeyPress={handleKeyPress}
            /> 
            <button onClick={handleClick} className='md:hidden bg-blue-500 p-2 rounded-2xl text-white transition-all hover:text-black hover:transition-all cursor-pointer duration-500 hover:duration-500 flex'><Search/></button>
            <button onClick={handleClick} className='max-md:hidden bg-blue-500 p-2 rounded-2xl text-white transition-all hover:text-black hover:transition-all cursor-pointer duration-500 hover:duration-500 flex'><Search/> Search</button>
          </div>
          <div className='text-gray-500 text-sm'>Try searching for any surah by name or number (1-114)</div>
        </div>
        
        <div ref={hRef} className="list w-[70vw] bg-white rounded-3xl mx-auto mt-5 p-10">
          {result === null && suggestions.length === 0 && (
            <p className="text-gray-600">Search Results will be shown here</p>
          )}
          {result && (
            <div>
              <p>✅ Found Surah: <strong>{result.name}</strong> (Surah {result.number})</p>
              <button 
                onClick={() => handleSurahClick(result.name, result.number)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
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