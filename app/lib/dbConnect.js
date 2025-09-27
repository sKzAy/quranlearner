import mongoose from "mongoose";

let isConnected = false

export default async function connectDB(){
    mongoose.set("strictQuery",true)
    if (isConnected){
        console.log("alr connected nig")
    }
    if(!process.env.MONGO_DB_URL){
        console.log("url not found")
    }
    try{
        await mongoose.connect(process.env.MONGO_DB_URL)
        isConnected = true
        console.log("connected to database")
    }
    catch(error){
        console.log(error)
    }
}

