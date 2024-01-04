//Schema from Nodes  Data-base
// And Send Route.js
import mongoose, { Schema } from 'mongoose'

 
const nodesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
   
    description:{
        type:String,
        required:true
    },
   
    tag:{
        type:String,
        default:"General"
    },
   
    date:{
        type: Date,
        default: Date.now
    }
})

const Node = mongoose.model('Node', nodesSchema)

export default User