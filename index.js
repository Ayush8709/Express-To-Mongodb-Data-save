import express from 'express'
import connactToMongo from './db.js'
const app = express()
const port = 5000;

connactToMongo();// Run mongodb Server

//import Routes 
import auth from './routes/auth.js'
import notes from './routes/notes.js'


//Middleware
app.use(express.json()) //if you send json data in req.body then use this middelware

//Router Oprate
app.use('/api/auth', auth)
app.use('/api/notes', notes)




//Default Route
app.use((req, res)=>{
  res.send('<h1> Page Not Found</h1>')
})

app.listen(port,()=>{
  console.log(`Server is running on port ${port}...`);
})