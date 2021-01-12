const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Message = require("./ComplaintMessage.models");
const User = require("./user.models");
const ComplaintSchema = new Schema(
    {
        Initiator:
        {
            email: 
            {
            type: String,
            required: true,
            trim: true,
            minlength: 10
            },
            name: 
            {
            type: String,
            required: true,
            trim: true,
            minlength: 8
            }
        },
        Title:
        {
            type: String,
            required: true,
            trim: true,
            minlength: 10
        },
        MessagesList : 
       [
           {
        
        type: mongoose.Schema.Types.Mixed,
        ref: 'Message',
        required: true
           }
       ]
            
        
       
       
           


}
);

const Complaint = mongoose.model("Complaint",ComplaintSchema);
    
module.exports = Complaint;

// MessagesList : 
//        {
//             type: [Message],
//             required: true
        
//        }