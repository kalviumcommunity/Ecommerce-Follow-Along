// import mongoose from "mongoose";
// const mongoose=require('mongoose')
import mongoose from 'mongoose'


const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
});

const usemodel=mongoose.model("usercollection",userSchema);
// export {usemodel};
export default usemodel