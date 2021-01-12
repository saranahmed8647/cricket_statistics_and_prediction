const router = require("express").Router();
var path = require('path');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const nodemailer=require('nodemailer');


const Admin = require("../models/admin.models");
const AdminSession = require("../models/adminSession.models");

// Register , for Admin
router.post("/register",(req,res)=>
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
        Admin.findOne({email : email2})
        .then(user =>
            {
                if(!user)
                {
                    bcrypt.hash(password,5,(err,hash) =>
                    {
                        final_password = hash;
                        Admin.create(
                            {
                                
                                email : email2,
                                password: final_password
                            })
                        .then(user =>
                            {
                                res.json(`${email2} has been registered`);
                            })
                        .catch(err =>
                            {
                                res.status(400).json(`Error : ${err}`);

                            })
                    })
                }
                else
                {
                    res.json(`${email2} already exists in the accounts`);
                }
            })
        .catch(err => 
            {
                res.status(400).json(`Error : ${err}`);
            })

        
    }

});




// Delete , for Admin
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
        

        Admin.findOneAndDelete({email : email2 })
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







// Login
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
        Admin.findOne({email : email2})
        .then(user =>
            {
                var valid_password = bcrypt.compareSync(password, user.password);
                if(!valid_password)
                {
                    return res.status(400).send("Invalid password for Admin");
                }
                else
                {
                    // Admin session
                    const admin_session = new AdminSession();
                    admin_session.userId = user._id;
                    admin_session.save()
                    .then(result =>
                        {
                            return res.send({success: true,
                            msg: "valid sign in",
                        token : result._id})
                        })
                .catch(err =>
                    {
                        return res.status(400).send(`Error Logging in : ${err}`);
                    });

                }
            })
            .catch(err =>
                {
                    res.status(400).send(`Error finding Admin : ${err}`)
                })
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
        Admin.findOne({email : email2})
        .then(user =>
            {
                var valid_password = bcrypt.compareSync(password, user.password);
                if(!valid_password)
                {
                    return res.status(400).send("Invalid password for Admin");
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




// Login verify
router.get("/verify",(req,res) =>
{
    // Verify user token still in DB and not deleted.
    const { query } = req;
    const { token } = query;

    AdminSession.find(
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

    AdminSession.findOneAndUpdate(
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

router.post("/update",(req,res) =>
{
    let new_email =  req.body.email;
    let new_password =  req.body.password;
    let old_token = req.body.token;

    bcrypt.hash(new_password,5,(err,hash) =>
    {
        Admin.findOneAndUpdate(
            {
                _id : old_token,
                
    
            }, {$set : 
                {
                    email: new_email,
                    password: hash
                }})
            .then(sessions =>
                {
    
                    AdminSession.findOneAndUpdate(
                        {
                            _id : old_token,
                            isDeleted : false,
                
                        }, {$set : 
                            {
                                isDeleted : true
                            }})
                        .then(sessions =>
                            {
                              console.log("Credentials changed and user logged out");
                            })
                        .catch(err =>
                            {
                                console.log("Credentials changed BUT, Error logging user  out");
                            })
                
                  return res.send({success : true,
                msg : "Logged out"});
                })
            .catch(err =>
                {
                    return res.status(400).send(`Logout error : ${err}`);
                })


    })
    
    
})
// For updating account details 



// For getting Admin details from Admin session token
router.post("/getAdminFromSession", (req,res) =>
{
    
    const {AdminSessionToken} = req.body;
    

    AdminSession.findById(AdminSessionToken)
    .then(user =>res.send(user.userId)
        )
    .catch(err =>
        {
            res.status(400).json(`Failed to get Admin session : ${err}`);
        })


})

// For getting Admin email from Admin id
router.post("/getAdminEmailFromId" , (req,res) =>
{
    
    const {AdminIDToken} = req.body;

    

    Admin.findById(AdminIDToken)
    .then(user =>res.send(user.email)
        )
    .catch(err =>
        {
            res.status(400).json(`Failed to get Admin Email : ${err}`);
        })

})

router.post("/getAdminbyEmail" , (req,res) =>
{
    
    const {AdminEmail} = req.body;

    Admin.find({email : AdminEmail })
    .then(result =>
        {
            res.json(result);
        })
        .catch(err =>
            {
                res.status(400).json("Error Getting Admin from Email : "+err);
            })
})


router.get("/getAllAdmin" , (req,res) =>
{
    Admin.find({})
    .then(result =>
        {
            res.json(result);
        })
        .catch(err =>
            {
                res.status(400).json(`Error getting all Admins : ${err}`);
            })
})


//admin forget password
let transporter=nodemailer.createTransport({
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
        Admin.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:'Admin does not exists with that email'})
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
                    <h5>click on this <a href="http://localhost:3000/reset/${token}">Link</a> to reset password.</h5>
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

    Admin.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
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

module.exports = router;