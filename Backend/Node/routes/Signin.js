// const router = require("express").Router();
// var path = require('path');
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const crypto = require('crypto');
// const nodemailer=require('nodemailer');
// const User = require("../models/user.models");
// const UserSession = require("../models/usersession.models");

// // Getting all users
// router.get("/allUsers", (req,res) =>
// {
//     let users_all = [];
    
//     User.find({})
//     .then(use => 
//         {
//             // delete use["password"];
//             // users_all.push(use);
            
            
//             // let temp_array = use;
//             // for(i =0; i<temp_array.length ; i++)
//             // {
//             //     // delete temp_array[i]["password"];
//             //     console.log(temp_array[i]["password"]);
//             // }        
//             // // console.log(temp_array);
//             // res.json(temp_array);    
            
//             res.json(use);
//         })
//     .catch(err => res.status(400).json("Error : "+err));

        
    
// })

// // Getting 1 user by email

// router.post("/singleUser", (req,res) =>
// {
//     User.find({email: req.body.email})
//     .then(team => res.json(team))
//     .catch(err => res.status(400).json("Error : "+err));
// })

// // Register , for User/customer
// router.post("/register",(req,res)=>
// {
//     const {name, email, password,password2,phone} = req.body;
    
//     let errors = [];
//     var email2 = email.toLowerCase();
//     // Checking fields
//     if(!name || !email2 || !password || !phone)
//     {
//         errors.push({msg:"Please fill all the fields"});
//     }
//     // Check password and confirm password
//     if(password !== password2)
//     {
//         errors.push({msg: "Both passwords donot match"});
//     }

//     // check pass length

//     if(password.length < 8)
//     {
//         errors.push({msg: "Password should be atleast 8 characters long"});
//     }
//     if(phone.length !== 11)
//     {
//         errors.push({msg: "Phone number has to be 11 digits long"});
//     }
//     if(phone.charAt(0) !== "0" || phone.charAt(1) !== "3")
//     {
//         errors.push({msg: "Wrong code entered for Phone number"});
//     }
//     // Email check
//     if(!email2.includes("@") || !email2.includes(".com") || email2.length < 9)
//     {
//         errors.push({msg: "Please provide correct email with atleast 9 characters length"});
//     }

//     if(errors.length > 0)
//     {
//         // To send the error messages to frontend
//         res.status(400).send(errors);
//     }
//     else{
//         User.findOne({email : email2})
//         .then(user =>
//             {
//                 if(!user)
//                 {
//                     bcrypt.hash(password,5,(err,hash) =>
//                     {
//                         final_password = hash;
//                         User.create(
//                             {
//                                 name: name.trim(),
//                                 email : email2.trim(),
//                                 password: final_password.trim(),
//                                 phone: phone.trim()
//                             })
//                         .then(user =>
//                             {
//                                 res.json(`${name} has been registered`);
//                             })
//                         .catch(err =>
//                             {
//                                 res.status(400).json(`Error : ${err}`);

//                             })
//                     })
//                 }
//                 else
//                 {
//                     res.status(400).json(`${name} already exists in the accounts`);
//                 }
//             })
//         .catch(err => 
//             {
//                 res.status(400).json(`Error : ${err}`);
//             })

        
//     }

// });

// // For getting user details from User session token
// router.post("/getUserFromSession", (req,res) =>
// {
    
//     const {userSessionToken} = req.body;
    

//     UserSession.findById(userSessionToken)
//     .then(user =>res.send(user.userId)
//         )
//     .catch(err =>
//         {
//             res.status(400).json(`Failed to get user session : ${err}`);
//         })


// })

// // For getting user email from user id
// router.post("/getUserEmailFromId" , (req,res) =>
// {
    
//     const {userIDToken} = req.body;

    

//     User.findById(userIDToken)
//     .then(user =>res.send(user.email)
//         )
//     .catch(err =>
//         {
//             res.status(400).json(`Failed to get user Email : ${err}`);
//         })

// })

// // Login , for user/customer
// router.post("/login",(req,res) =>
// {
//     const {email, password} = req.body;
//     let errors = [];
//     var email2 = email.toLowerCase();

//     if(!email2 || !password)
//     {
//         errors.push({msg:"Please fill all the fields"});
//     }

//     if(password.length < 8)
//     {
//         errors.push({msg: "Password should be atleast 8 characters long"});
//     }

//     // Email check
//     if(!email2.includes("@") || !email2.includes(".com") || email2.length < 9)
//     {
//         errors.push({msg: "Please provide correct email with atleast 9 characters length"});
//     }

//     if(errors.length > 0)
//     {
//         // To send the error messages to frontend
//         res.status(400).send(errors);
//     }
//     else
//     {
//         User.findOne({email : email2})
//         .then(user =>
//             {
//                 var valid_password = bcrypt.compareSync(password, user.password);
//                 if(!valid_password)
//                 {
//                     return res.status(400).send("Invalid password for user");
//                 }
//                 else
//                 {
//                     // User session
//                     const user_session = new UserSession();
//                     user_session.userId = user._id;
//                     user_session.save()
//                     .then(result =>
//                         {
//                             return res.send({success: true,
//                             msg: "valid sign in",
//                         token : result._id,
//                     })
//                         })
//                 .catch(err =>
//                     {
//                         return res.status(400).send(`Error Signing up : ${err}`);
//                     });

//                 }
//             })
//             .catch(err =>
//                 {
//                     res.status(400).send(`Error finding user : ${err}`)
//                 })
//     }    

// });

// // Login verify
// router.get("/verify",(req,res) =>
// {
//     // Verify user token still in DB and not deleted.
//     const { query } = req;
//     const { token } = query;

//     UserSession.find(
//         {
//             _id : token,
//             isDeleted : false,

//         })
//         .then(sessions =>
//             {
//                 if(sessions.length != 1)
//                 {
//                     return res.status(400).send({success : false , msg: "Invalid login"});
//                 }
//                 else
//                 {
//                     return res.send(
//                         {
//                             success : true,
//                             msg: "Login correct"
//                         })
//                 }

//             })
//         .catch(err =>
//             {
//                 return res.status(400).send(`Login error : ${err}`);
//             })  
// });
// // Logout
// // NOTE : for verify and logout, it grabs token from URL
// router.get("/logout",(req,res) =>
// {
   
//     // Verify user token still in DB and not deleted.
//     const { query } = req;
//     const { token } = query;

//     UserSession.findOneAndUpdate(
//         {
//             _id : token,
//             isDeleted : false,

//         }, {$set : 
//             {
//                 isDeleted : true
//             }})
//         .then(sessions =>
//             {
//               return res.send({success : true,
//             msg : "Logged out"});
//             })
//         .catch(err =>
//             {
//                 return res.status(400).send(`Logout error : ${err}`);
//             })


// });


// // Delete 
// router.post("/delete",(req,res)=>
// {
//     const {email, password} = req.body;
//     let errors = [];
//     var email2 = email.toLowerCase();
//     // Checking fields
//     if(!email2 || !password)
//     {
//         errors.push({msg:"Please fill all the fields"});
//     }
    

//     // check pass length

//     if(password.length < 8)
//     {
//         errors.push({msg: "Password should be atleast 8 characters long"});
//     }

//     // Email check
//     if(!email2.includes("@") || !email2.includes(".com") || email2.length < 9)
//     {
//         errors.push({msg: "Please provide correct email with atleast 9 characters length"});
//     }

//     if(errors.length > 0)
//     {
//         // To send the error messages to frontend
//         res.status(400).send(errors);
//     }
//     else{
        

//         User.findOneAndDelete({email : email2 })
//         .then((user) =>
//         {
//             res.send(`${user} deleted`);
//         })
//         .catch(err =>
//             {
//                 res.status(400).send(`Error deleting user : ${err}`);
//             }); 
        
//     }

// });


// //check login credentials
// router.post("/checklogin",(req,res) =>
// {
//     const {email, password} = req.body;
//     let errors = [];
//     var email2 = email.toLowerCase();

//     if(!email2 || !password)
//     {
//         errors.push({msg:"Please fill all the fields"});
//     }

//     if(password.length < 8)
//     {
//         errors.push({msg: "Password should be atleast 8 characters long"});
//     }

//     // Email check
//     if(!email2.includes("@") || !email2.includes(".com") || email2.length < 9)
//     {
//         errors.push({msg: "Please provide correct email with atleast 9 characters length"});
//     }

//     if(errors.length > 0)
//     {
//         // To send the error messages to frontend
//         res.status(400).send(errors);
//     }
//     else
//     {
//         User.findOne({email : email2})
//         .then(user =>
//             {
//                 var valid_password = bcrypt.compareSync(password, user.password);
//                 if(!valid_password)
//                 {
//                     return res.status(400).send("Invalid password for User");
//                 }
//                 else
//                 {
//                     res.send("Successful login");
//                 }
//             })
//             .catch(err =>
//                 {
//                     res.status(400).send(`Error finding Admin : ${err}`)
//                 })
//     }    

// });

// // Getting a user by email
// router.post("/getUserbyEmail" , (req,res) =>
// {
    
//     const {UserEmail} = req.body;

//     User.find({email : UserEmail })
//     .then(result =>
//         {
//             res.json(result);
//         })
//         .catch(err =>
//             {
//                 res.status(400).json("Error Getting Admin from Email : "+err);
//             })
// })




// //User forget password
// let transporter=nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:'crictelligence@gmail.com',
//         pass:'crictelligence123'
//     }
// })


// router.post("/forgetPassword" , (req,res) =>{
//     crypto.randomBytes(32,(err,buffer)=>{
//         if(err){
//             console.log(err)
//         }
//         const token = buffer.toString('hex');
//         User.findOne({email:req.body.email})
//         .then(user=>{
//             if(!user){
//                 return res.status(422).json({error:'User does not exists with that email'})
//             }
//             user.resetToken = token
//             user.expireToken = Date.now() + 3600000
//             user.save().then((result)=>{
//                 transporter.sendMail({
//                     to:user.email,
//                     from:"crictelligence@gmail.com",
//                     subject:"Password reset",
//                     html:`
//                     <p>Your request for password reset</p>
//                     <h5>click on this <a href="http://localhost:3000/resetUser/${token}">Link</a> to reset password.</h5>
//                     `
//                 })
//                 res.json({message:"check your email"});
//             })
//         })
//     })

// })

// router.post('/new-password',(req,res)=>{
//     const newPassword=req.body.password
//     const sentToken=req.body.token

//     User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
//     .then(user=>{
//         if(!user){
//             return res.status(422).json({error:'Try again session expired'})

//         }
//         bcrypt.hash(newPassword,5).then(hashedpassword=>{
//             user.password=hashedpassword
//             user.resetToken=undefined
//             user.expireToken=undefined
//             user.save().then((user)=>{
//                 res.json({message:'password updated successfuly'})
//             })
//         })
//     }).catch(err=>{
//         console.log(err)
//     })
// })



// module.exports = router;

























const router = require("express").Router();
var path = require('path');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const crypto = require('crypto');
const nodemailer=require('nodemailer');
const User = require("../models/user.models");
const UserSession = require("../models/usersession.models");

// Getting all users
router.get("/allUsers", (req,res) =>
{
    let users_all = [];
    
    User.find({})
    .then(use => 
        {
            // delete use["password"];
            // users_all.push(use);
            
            
            // let temp_array = use;
            // for(i =0; i<temp_array.length ; i++)
            // {
            //     // delete temp_array[i]["password"];
            //     console.log(temp_array[i]["password"]);
            // }        
            // // console.log(temp_array);
            // res.json(temp_array);    
            
            res.json(use);
        })
    .catch(err => res.status(400).json("Error : "+err));

        
    
})

// Getting 1 user by email

router.post("/singleUser", (req,res) =>
{
    User.find({email: req.body.email})
    .then(team => res.json(team))
    .catch(err => res.status(400).json("Error : "+err));
})

// Register , for User/customer
router.post("/register",(req,res)=>
{
    const {name, email, password,password2,phone} = req.body;
    
    let errors = [];
    var email2 = email.toLowerCase();
    // Checking fields
    if(!name || !email2 || !password || !phone)
    {
        errors.push({msg:"Please fill all the fields"});
    }
    // Check password and confirm password
    if(password !== password2)
    {
        errors.push({msg: "Both passwords donot match"});
    }

    // check pass length

    if(password.length < 8)
    {
        errors.push({msg: "Password should be atleast 8 characters long"});
    }
    if(phone.length !== 11)
    {
        errors.push({msg: "Phone number has to be 11 digits long"});
    }
    if(phone.charAt(0) !== "0" || phone.charAt(1) !== "3")
    {
        errors.push({msg: "Wrong code entered for Phone number"});
    }
    // Email check
    if(!email2.includes("@") || !email2.includes(".com") || email2.length < 9)
    {
        errors.push({msg: "Please provide correct email with atleast 9 characters length"});
    }

    if(errors.length > 0)
    {
        // To send the error messages to frontend
        res.status(400).send(errors);
    }
    else{
        User.findOne({email : email2})
        .then(user =>
            {
                if(!user)
                {
                    bcrypt.hash(password,5,(err,hash) =>
                    {
                        final_password = hash;
                        User.create(
                            {
                                name: name.trim(),
                                email : email2.trim(),
                                password: final_password.trim(),
                                phone: phone.trim()
                            })
                        .then(user =>
                            {
                                res.json(`${name} has been registered`);
                            })
                        .catch(err =>
                            {
                                res.status(400).json(`Error : ${err}`);

                            })
                    })
                }
                else
                {
                    res.status(400).json(`${name} already exists in the accounts`);
                }
            })
        .catch(err => 
            {
                res.status(400).json(`Error : ${err}`);
            })

        
    }

});

// For getting user details from User session token
router.post("/getUserFromSession", (req,res) =>
{
    
    const {userSessionToken} = req.body;
    

    UserSession.findById(userSessionToken)
    .then(user =>res.send(user.userId)
        )
    .catch(err =>
        {
            res.status(400).json(`Failed to get user session : ${err}`);
        })


})

// For getting user email from user id
router.post("/getUserEmailFromId" , (req,res) =>
{
    
    const {userIDToken} = req.body;

    

    User.findById(userIDToken)
    .then(user =>res.send(user.email)
        )
    .catch(err =>
        {
            res.status(400).json(`Failed to get user Email : ${err}`);
        })

})

// Login , for user/customer
router.post("/login",(req,res) =>
{
    const {email, password} = req.body;
    let errors = [];
    var email2 = email.toLowerCase();

    if(!email2 || !password)
    {
        errors.push({msg:"Please fill all the fields"});
    }

    if(password.length < 8)
    {
        errors.push({msg: "Password should be atleast 8 characters long"});
    }

    // Email check
    if(!email2.includes("@") || !email2.includes(".com") || email2.length < 9)
    {
        errors.push({msg: "Please provide correct email with atleast 9 characters length"});
    }

    if(errors.length > 0)
    {
        // To send the error messages to frontend
        res.status(400).send(errors);
    }
    else
    {
        User.findOne({email : email2})
        .then(user =>
            {
                var valid_password = bcrypt.compareSync(password, user.password);
                if(!valid_password)
                {
                    return res.status(400).send("Invalid password for user");
                }
                else
                {
                    if(user.Verified === false)
                    {
                        return res.status(420).send("User not verified");
                    }
                    else
                    {
                        // User session
                    const user_session = new UserSession();
                    user_session.userId = user._id;
                    user_session.save()
                    .then(result =>
                        {
                            return res.send({success: true,
                            msg: "valid sign in",
                        token : result._id,
                    })
                        })
                .catch(err =>
                    {
                        return res.status(400).send(`Error Signing up : ${err}`);
                    });


                    }
                    
                }
            })
            .catch(err =>
                {
                    res.status(400).send(`Error finding user : ${err}`)
                })
    }    

});

// Login verify
router.get("/verify",(req,res) =>
{
    // Verify user token still in DB and not deleted.
    const { query } = req;
    const { token } = query;

    UserSession.find(
        {
            _id : token,
            isDeleted : false,

        })
        .then(sessions =>
            {
                if(sessions.length != 1)
                {
                    return res.status(400).send({success : false , msg: "Invalid login"});
                }
                else
                {
                    return res.send(
                        {
                            success : true,
                            msg: "Login correct"
                        })
                }

            })
        .catch(err =>
            {
                return res.status(400).send(`Login error : ${err}`);
            })  
});
// Logout
// NOTE : for verify and logout, it grabs token from URL
router.get("/logout",(req,res) =>
{
   
    // Verify user token still in DB and not deleted.
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate(
        {
            _id : token,
            isDeleted : false,

        }, {$set : 
            {
                isDeleted : true
            }})
        .then(sessions =>
            {
              return res.send({success : true,
            msg : "Logged out"});
            })
        .catch(err =>
            {
                return res.status(400).send(`Logout error : ${err}`);
            })


});


// Delete 
router.post("/delete",(req,res)=>
{
    const {email, password} = req.body;
    let errors = [];
    var email2 = email.toLowerCase();
    // Checking fields
    if(!email2 || !password)
    {
        errors.push({msg:"Please fill all the fields"});
    }
    

    // check pass length

    if(password.length < 8)
    {
        errors.push({msg: "Password should be atleast 8 characters long"});
    }

    // Email check
    if(!email2.includes("@") || !email2.includes(".com") || email2.length < 9)
    {
        errors.push({msg: "Please provide correct email with atleast 9 characters length"});
    }

    if(errors.length > 0)
    {
        // To send the error messages to frontend
        res.status(400).send(errors);
    }
    else{
        

        User.findOneAndDelete({email : email2 })
        .then((user) =>
        {
            res.send(`${user} deleted`);
        })
        .catch(err =>
            {
                res.status(400).send(`Error deleting user : ${err}`);
            }); 
        
    }

});


//check login credentials
router.post("/checklogin",(req,res) =>
{
    const {email, password} = req.body;
    let errors = [];
    var email2 = email.toLowerCase();

    if(!email2 || !password)
    {
        errors.push({msg:"Please fill all the fields"});
    }

    if(password.length < 8)
    {
        errors.push({msg: "Password should be atleast 8 characters long"});
    }

    // Email check
    if(!email2.includes("@") || !email2.includes(".com") || email2.length < 9)
    {
        errors.push({msg: "Please provide correct email with atleast 9 characters length"});
    }

    if(errors.length > 0)
    {
        // To send the error messages to frontend
        res.status(400).send(errors);
    }
    else
    {
        User.findOne({email : email2})
        .then(user =>
            {
                var valid_password = bcrypt.compareSync(password, user.password);
                if(!valid_password)
                {
                    return res.status(400).send("Invalid password for User");
                }
                else
                {
                    res.send("Successful login");
                }
            })
            .catch(err =>
                {
                    res.status(400).send(`Error finding Admin : ${err}`)
                })
    }    

});

// Getting a user by email
router.post("/getUserbyEmail" , (req,res) =>
{
    
    const {UserEmail} = req.body;

    User.find({email : UserEmail })
    .then(result =>
        {
            res.json(result);
        })
        .catch(err =>
            {
                res.status(400).json("Error Getting Admin from Email : "+err);
            })
})




//User forget password
let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'crictelligence@gmail.com',
        pass:'crictelligence123'
    }
})
let transporter2=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'crictelligence@gmail.com',
        pass:'crictelligence123'
    }
})


router.post("/forgetPassword" , (req,res) =>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString('hex');
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:'User does not exists with that email'})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"crictelligence@gmail.com",
                    subject:"Password reset",
                    html:`
                    <p>Your request for password reset</p>
                    <h5>click on this <a href="http://localhost:3000/resetUser/${token}">Link</a> to reset password.</h5>
                    `
                })
                res.json({message:"check your email"});
            })
        })
    })

})

router.post('/new-password',(req,res)=>{
    const newPassword=req.body.password
    const sentToken=req.body.token

    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:'Try again session expired'})

        }
        bcrypt.hash(newPassword,5).then(hashedpassword=>{
            user.password=hashedpassword
            user.resetToken=undefined
            user.expireToken=undefined
            user.save().then((user)=>{
                res.json({message:'password updated successfuly'})
            })
        })
    }).catch(err=>{
        console.log(err)
    })
})

// EMail Verify
router.post("/verifyEmail" , (req,res) =>{
    console.log("Verify EMail Ran");
    console.log(`User EMail : ${req.body.email}`);
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString('hex');
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:'User does not exists with that email'})
            }
            
            user.verificationToken = token
            
            user.save().then((result)=>{
                transporter2.sendMail({
                    to:user.email,
                    from:"crictelligence@gmail.com",
                    subject:"Email Verification",
                    html:`
                    <p>Click the following link to verify your account</p>
                    <p>You can then proceed to login from your mobile device</p>
                    <h5>click on this <a href="http://localhost:3000/EmailVerify/${token}">Link</a> to verify email.</h5>
                    `
                })
                res.json({message:"check your email"});
            })
        })
    })

})

// Complete Email verification

router.post('/verifyEmailFinal',(req,res)=>
{
    const sentToken=req.body.token

    User.findOne({verificationToken:sentToken})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:'Try again Error Occured'});
        }
        user.verificationToken=undefined
            user.Verified= true
            user.save().then((user)=>{
                res.json({message:'Email Verified successfuly'})
            })
        
    }).catch(err=>{
        console.log(err)
    })
})



module.exports = router;