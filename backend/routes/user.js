const express = require("express")
const zod = require("zod")
const {JWT_SECRECT} = require("../db")
const jwt = require("jsonwebtoken")
const {User} = require("../db")


const router  = express.Router()

const signUpBody = zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/signup",async(req,res)=>{
    const {success} = signUpBody.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            message:"Email is already taken/ incorrect address"
        })
    }

    const existingUser = await User.findOne({
        username:req.body.username
    })
    
    if(existingUser){
        return res.status(411).json({
            message:"Email is already taken/ incorrect address"
        })
    }

    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })

    const userId = user._id

    const token = jwt.sign({userId},JWT_SECRECT)

    return res.json({
        message:"User created successfullt",
        token:token
    })

})

const signInBody = zod.object({
    username:zod.string().email(),
    password:zod.string(),
})

router.post("/signin",async(req,res)=>{
    const {success} = signInBody.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            message:"Email already taken/ incorrect input"
        })
    }

    const user = await User.findOnr({
        username:req.body.username,
        password:req.body.username
    })

    if(user){
        const token = jwt.sign({
            userId:user._id,
        },JWT_SECRECT)

        res.json({
            token:token
        })

        return;
    }
    res.json(411).json({
        message:"Error while logging"
    })
})


module.exports= router