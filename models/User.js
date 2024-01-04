//Schema from Nodes  Data-base
// And Send Route.js
import mongoose, { Schema } from 'mongoose'

 
const useSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required :true,
        unique:true
    },
    password:{
        type: String,
        required :true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', useSchema);


export default User