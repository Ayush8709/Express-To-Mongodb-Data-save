//Routes 
import express from 'express'
import User from '../models/User.js' // User Schema imported 
const router = express.Router();//it is a package to help to create a route 
import bcrypt from 'bcryptjs' // Hashing a password (NOTE: npm i bcryptjs) 
import jwt from 'jsonwebtoken'//(NOTE :npm i jsonwebtoken)



//Without Validation
/*
const router = express.Router()
router.post('/', (req, res) => {
    console.log(req.body)

    const user = User(req.body);// This line send data for data base
    user.save()//This line is save data from database

    res.send(res.body)
}) */

//###########################################################################################################################



//With Validation:-
//validation auth js (NOTE: npm i react-validator)
import { body, validationResult } from 'express-validator'

router.post('/createuser', [
    body('name', "Enter a Valid Name").isLength({ min: 3 }),//chek name is valid or not
    body('email', "Enter a Valid Email").isEmail(),//chek email valid or not
    body('password', "Enter a Valid password with atleast 5 cheracter").isLength({ min: 5 }),//chek password valid or not
], async (req, res) => {

    const errors = validationResult(req);//if user data is not valid then run this funtion and show error
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        //Chek user existe or not
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: " user already exist" })
        }
        //#############


        //Password hasing function with help to bcryptjs
        const salt = await bcrypt.genSalt()//genSalt() is a function of bcrypt it use to increase password string 
        const securePassword = await bcrypt.hash(req.body.password, salt)
        //####################



        user = await User.create({ //send data to mongodb
            name: req.body.name,
            password: securePassword,
            email: req.body.email,
        })
        //without jWT token genrate  simple send res.json(user)
        // res.json(user) 

        //with jWT token genrate
        const JWT_SECRET = "Ayushsingh0455@"// Jwt Default token (secreate token) genrate
        //JWT new Token genrate and chek old Token due to security perpose
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)//simple chek sign method is (data :- new token genrate) (JWT_SECRET :- chek old token ) sing method chek old token is valid token or not and send new token with (data)

        res.send(authToken) //send new Token in clien side user


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured")
    }

})

//###################################################################################################################



//Login Route create :- login router chek user is register or not 
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),//chek email valid or not
    body('password', 'Please fill the Password').exists()//chek password is valid or not

], async (req, res) => {

    const errors = validationResult(req);//if user data is not valid then run this funtion and show error
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;// to use array destructer method and pull email and password from req.body
    try {
        //Chek is email exists on database or not
        let user = await User.findOne({ email })
        //if not exists and show error
        if (!user) {
            return res.status(404).json({ error: "Enter valid email" })
        }

        //Chek your enter password match the database password
        const passwordCompair = await bcrypt.compare(password, user.password)//(password :- is your enter password vallu) (user.password :- chek database password ) bcrypt.compare :- function match both password

        //If password not match  then show error
        if (!passwordCompair) {
            return res.status(404).json({ error: "Enter valid password" })
        }

        const JWT_SECRET = "ayushsingh0455@"// default Jwt token create 
        //if password is currect then send jwt token
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET) //Match old token to new token new token is (data) and old token is (JWT_SECRET)
        res.send(authToken)

    } catch (error) {// authewise send error
        console.error(error.message);
        res.status(500).send('Internal  some error')

    }

})


    //##########################################################################################################################################

    //Get login user detail in dataBase
    router.post('/login', async (req, res) => {
            
        try {
            const userId = 'todo'
            const user = await User.findOne(userId).select("-Password")
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal  some error')
        }

    })
    

export default router;