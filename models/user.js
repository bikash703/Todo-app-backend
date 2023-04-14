import mongoose from "mongoose"

const backendSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{type:String, 
        select:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

})

export const User =  mongoose.model("user",backendSchema)