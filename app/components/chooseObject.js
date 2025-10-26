import React from 'react'
import { useRouter } from 'next/navigation'

const ChooseObject = ({props}) => {
  let router = useRouter()
  return (
    <>
      <div data-aos="fade-in"
        className="pg bg-gray-100 h-fit flex justify-center items-center flex-wrap p-5 gap-5 text-center
      max-md:flex-col"
      >
        {props?.map((surah) => (
          <div
            onClick={() => router.push(`quran/${surah.surahNum}`)}
            key={surah.surahNum}
            className="surahbox bg-green-800 flex-1 min-w-[250px] max-w-[300px] p-10 rounded-xl hover:shadow-xl hover:shadow-green-300 cursor-pointer transition-all duration-300 mx-auto"
          >
            <div className="arabicName text-green-100 flex justify-between gap-5">
              <div className="Arabic font-bold mx-auto">
                {surah.surahNum} - {surah.surahNameArabic}
              </div>
            </div>
            <div className="EnglishName text-green-100 font-bold text-center">
              {surah.surahName}
            </div>
            <div className="Ayahs text-gray-200 w-fit mx-auto">
              {surah.surahNameTranslation}
            </div>
            <div className="Ayahs text-gray-200 w-fit mx-auto">
              {surah.numOfAyahs} Ayahs
            </div>
            <div className="Ayahs text-gray-200 w-fit mx-auto">
              {surah.relevationPlace}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ChooseObject
