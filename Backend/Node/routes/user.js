const router = require("express").Router();
var path = require('path');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user.models");

process.env.SECRET_KEY = "secret";  

// Login page
router.post("/login",(req,res)=>
{
    User.findOne({
        email : req.body.email
    })
    .then(user =>
        {
            // If user exists
            if(user)
            {
                if(bcrypt.compareSync(req.body.password, User.password))
                {
                    // Password matched
                    const payload = 
                    {
                        _id: user._id,
                        name: user.name,
                        email : user.email
                    }
                    let token = jwt.sign(payload,process.env.SECRET_KEY,
                        {
                            expiresInMinutes : 30
                        })
                        res.send(token);

                }
                else
                {
                    res.status(400).json(`Error : User doesnt exist`);
                }
            }
            else
            {
                res.status(400).json(`Error : User doesnt exist`);
            }
        })
    .catch(err =>
        {
            res.status(400).json(`Error : ${err}`);
        })

});
// Register
router.post("/register",(req,res)=>
{
    const {name, email, password,password2} = req.body;
    let errors = [];

    // Checking fields
    if(!name || !email || !password)
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

    // Email check
    if(!email.includes("@") || !email.includes(".com") || email.length < 9)
    {
        errors.push({msg: "Please provide correct email with atleast 9 characters length"});
    }

    if(errors.length > 0)
    {
        // To send the error messages to frontend
    }
    else{
        User.findOne({email : email})
        .then(user =>
            {
                if(!user)
                {
                    bcrypt.hash(password,5,(err,hash) =>
                    {
                        final_password = hash;
                        User.create(
                            {
                                name: name,
                                email : email,
                                password: final_password
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
                    res.json(`${name} already exists in the accounts`);
                }
            })
        .catch(err => 
            {
                res.status(400).json(`Error : ${err}`);
            })

        
    }

});

module.exports = router;