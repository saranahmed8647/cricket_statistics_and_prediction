const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Sender will be the sender's Email.
const MessageSchema = new Schema(
    {
        
        body : 
        {
            type: String,
            required: true,
            trim: true,
            minlength: 25
        },
        Sender: 
        {
            type: String,
            required: true,
            trim: true,
            minlength: 10
        },
        Time : 
        {
            type: Date,
            default: Date.now
        }

});

const Message = mongoose.model("Message",MessageSchema);
    
module.exports = Message;