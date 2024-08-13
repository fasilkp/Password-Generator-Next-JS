import mongoose from "mongoose"

const schema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    password :{
        type:Object,
        required:true
    },
    appName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    }
})


const passwordModel=mongoose.models.Password || mongoose.model("Password", schema)
export default passwordModel