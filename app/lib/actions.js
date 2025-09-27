"use server"
import { userAgent } from "next/server";
import connectDB from "./dbConnect"
import UserModel from "./model"

export async function updateUser({
  pfp,
  email,
  Id,
  name,
}){
  try {
    connectDB();
    await UserModel.findOneAndUpdate(
      {userId: Id},
      {
        name:name,
        pfp:pfp,
        email:email,
      },
      {upsert: true}
    );
  } catch (error) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
    }

export async function updateUserNotes(note,id){
  try{
    connectDB()
    await UserModel.findOneAndUpdate({userId:id},{note:note})
  }
  catch(error){
    console.log(error)
  }
}