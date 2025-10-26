import { AllSurahsarr } from "../all_surahs.js";

export default async function FetchSurahObject(surah_number){
    let index = surah_number - 1;
    let surahNameVar = AllSurahsarr[index].surahName
    let surahNameArabicVar = AllSurahsarr[index].surahNameArabicLong
    let surahNameTranslationVar = AllSurahsarr[index].surahNameTranslation
    let numOfAyahsVar = AllSurahsarr[index].totalAyah
    let versesVar = []
    let revelationPlaceVar = AllSurahsarr[index].revelationPlace
    for(let i = 0; i < AllSurahsarr[index].totalAyah;i++){
        versesVar.push({
            verse: AllSurahsarr[index].english[i],
            verseArabic: AllSurahsarr[index].arabic1[i],
            verseUrdu: AllSurahsarr[index].urdu[i]
        }
    )
    }
    let finalObject = {
        surahName : surahNameVar,
        surahNameArabic : surahNameArabicVar,
        surahNameTranslation : surahNameTranslationVar,
        numOfAyahs : numOfAyahsVar,
        verses : versesVar,
        revelationPlace : revelationPlaceVar,
    }
    return finalObject
}

export async function FetchSurahInfo(){
   let surahInfos = [];
   let surahInfoObject;
   let surahNumVar;
   let surahNameVar;
   let surahNameArabicVar;
   let numOfAyahsVar;
   let surahNameTranslationVar;
   for(let chapters = 0;chapters < 114;chapters++){
     let revelationPlaceVar = AllSurahsarr[chapters].revelationPlace
    surahNumVar = AllSurahsarr[chapters].surahNo;
    surahNameVar = AllSurahsarr[chapters].surahName
    surahNameArabicVar = AllSurahsarr[chapters].surahNameArabicLong
    surahNameTranslationVar = AllSurahsarr[chapters].surahNameTranslation
    numOfAyahsVar = AllSurahsarr[chapters].totalAyah

        surahInfoObject = {
        surahNum : surahNumVar,
        surahName : surahNameVar,
        surahNameArabic : surahNameArabicVar,
        surahNameTranslation : surahNameTranslationVar,
        numOfAyahs : numOfAyahsVar,
        revelationPlace : revelationPlaceVar,
    }
    surahInfos.push(surahInfoObject)
   }
   return surahInfos
}
FetchSurahInfo()


