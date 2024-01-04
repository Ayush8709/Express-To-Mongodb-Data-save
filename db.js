// Connact monogdb in local host
import mongoose from 'mongoose'
const mongoURI =`mongodb://localhost:27017/curd`

const connactToMongo =()=>{
    
mongoose.set("strictQuery", false);//this line not compalsarry
    mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>{
        console.log('Connacted Sussfully')
    }).catch((e)=>{
        console.log(e + `Not Connacted`)
    })

}

export default connactToMongo