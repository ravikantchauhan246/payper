const mongoose = require("mongoose")

// const userSchema = new mongoose.schema({
//         username:String,
//         password: String,
//         firstName : String,
//         lastName : String,
        
// })  //Simple Solution

mongoose.connect("mongodb+srv://admin:uwiVJMOfERL63uw3@cluster0.cbez3lf.mongodb.net/user")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30,
    },

    password:{
        type:String,
        required:true,
        minLength:6,

    },

    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
        minLength:1
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:50,
    }
})

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const User = mongoose.model("User",userSchema)
const Account = mongoose.model("Account",accountSchema)

module.exports = {
    User,
    Account
}
