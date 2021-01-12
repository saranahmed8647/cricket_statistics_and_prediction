const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSessionSchema = new Schema(
    {
        userId: 
        {
            type:  String,
            default: ""
        },
        timestamp: 
        {
            type: Date,
            default: Date.now(),

        },
        isDeleted : 
        {
            type: Boolean,
            default: false
        }
    });

const AdminSession = mongoose.model("AdminSession",adminSessionSchema);
    
module.exports = AdminSession;