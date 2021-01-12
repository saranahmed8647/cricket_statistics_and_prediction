const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
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
        resetToken:
        {
            type: String,
        },
        
        expireToken:
        {
            type: Date,
        },
        
    });

    const Admin = mongoose.model("Admin",adminSchema);
    
    module.exports = Admin;