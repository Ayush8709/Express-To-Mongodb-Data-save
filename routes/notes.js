//Routes
import express from 'express'

const router = express.Router()
router.get('/',(req,res)=>{
    res.json({a:"Ayush", b: "Singh"})
})

export default router;