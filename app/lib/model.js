import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  pfp:{
    type:String,
  },
  name:{
    type:String,
    required:true,
  },
  email:{
    type: String,
    required: true,
    unique:true,
    trim:true,
  },
  userId: {
    type: String,
    required: true,   
    unique: true,     
    trim: true
  },
  notes: [
    {
      verseNo: { type: Number,},
      surahNo: { type: Number,},
      note: { type: String,} 
    },
  ],
  favorites: [
    {
      verseNo: { type: Number,},
      surahNo: { type: Number, }
    }
  ]
}, { timestamps: true }); 

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
