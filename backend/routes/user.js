const express = require("express")
const zod = require("zod")
const { JWT_SECRET } = require("../config") // Ensure JWT_SECRET is correctly imported
const jwt = require("jsonwebtoken")
const { User, Account } = require("../db")
const {authMiddleware} = require("../middleware")


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

    await Account.create({
        userId,
        balance: 1+ Math.random()*10000
    })

    // Ensure JWT_SECRET is defined and not empty
    if (!JWT_SECRET) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }

    const token = jwt.sign({userId},JWT_SECRET)

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

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password // Fix typo: should be password, not username
    })

    if(user){
        // Ensure JWT_SECRET is defined and not empty
        if (!JWT_SECRET) {
            return res.status(500).json({
                message: "Internal server error"
            })
        }

        const token = jwt.sign({
            userId:user._id,
        },JWT_SECRET)

        res.json({
            token:token
        })

        return;
    }
    res.status(411).json({
        message:"Error while logging"
    })
})

const userUpdate = zod.object({
    password : zod.string().optional(),
    firstName: zod.string().optional(),
    lastName:zod.string().optional()
})


router.put("/",authMiddleware,async (req,res)=>{
    const {success} = userUpdate.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Error while updating information"
        })
    }
        await User.updateOne({_id:req.userId},req.body)

    res.json({
        message:"Updated successfully"
    })
    
    

})

router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user : users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})





module.exports= router