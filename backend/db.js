const mongoose = require(mongoose)

// const userSchema = new mongoose.schema({
//         username:String,
//         password: String,
//         firstName : String,
//         lastName : String,
        
// })  //Simple Solution

mongoose.connect("")

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

const User = mongoose.model("User",userSchema)

module.exports = {
    User
}
