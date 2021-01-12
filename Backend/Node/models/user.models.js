// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const userSchema = new Schema(
//     {
//         name:
//         {
//             type: String,
//             required: true,
//             trim: true
//         },
//         email:
//         {
//             type: String,
//             required: true,
//             minlength: 9,
//             trim: true,
//             unique: true
//         },
//         password:
//         {
//             type: String,
//             required: true,
//             minlength: 8,
//             trim: true,
//             unique: true
//         },
//         phone:
//         {
//             type: String,
//             required: true,
//             minlength: 11,
//             trim: true,
//             unique: true
//         }
//         ,
//         resetToken:
//         {
//             type: String,
//         },
        
//         expireToken:
//         {
//             type: Date,
//         },
        
//     });

// const User = mongoose.model("User",userSchema);
    
// module.exports = User;













const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name:
        {
            type: String,
            required: true,
            trim: true
        },
        email:
        {
            type: String,
            required: true,
            minlength: 9,
            trim: true,
            unique: true
        },
        password:
        {
            type: String,
            required: true,
            minlength: 8,
            trim: true,
            unique: true
        },
        phone:
        {
            type: String,
            required: true,
            minlength: 11,
            trim: true,
            unique: true
        }
        ,
        resetToken:
        {
            type: String,
        },
        
        expireToken:
        {
            type: Date,
        },
        Verified:
        {
            type : Boolean,
            default : false
        },
        verificationToken:
        {
            type: String,
        }
    });

const User = mongoose.model("User",userSchema);
    
module.exports = User;