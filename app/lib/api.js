"use server"
import {getUserLiked,updateUserLike} from "@/app/lib/actions"
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from "next/cache"


export async function onLikeClick (surahNo,verseNo,message){
  try{
    let likeObject = {"surah":surahNo,"verse":verseNo,"message":message}
    const user = await currentUser()
    let likeArr = await getUserLiked(user.id)
    console.log(likeArr)
    likeArr[0].liked.push(likeObject)
    updateUserLike(user.id, likeArr[0].liked)
    return 1;
  }
  catch (err){
    return -1;
  }
}

export async function onDeleteClick(surahNo,verseNo){
  try{
  const user = await currentUser()
  let likeArr = await getUserLiked(user.id)
  console.log(likeArr)
  let updatedLikes = likeArr[0].liked.filter(like => !(like.surah === surahNo && like.verse === verseNo));
  let response = await updateUserLike(user.id, updatedLikes)
  if (response === 1){
  revalidatePath('/dashboard')
  return 1;
}
else{
  return -1;
}
  }
  catch (err){
    return -1;
  }
}

