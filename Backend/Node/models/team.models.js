const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = new Schema(
    {
        name:
        {
            type: String,
            required: true,
            minlength: 3,
            trim: true,
            unique: true
        },
        matches : 
        {
            type: Number,
            required: true,
            trim: true
        },
        won:
        {
            type:Number,
            required: true,
            trim: true
        },
        lost:
        {
            type:Number,
            required: true,
            trim: true
        },
        tied:
        {
            type:Number,
            required: true,
            trim: true
        },
        no_result:
        {
            type:Number,
            required: true,
            trim: true
        },
        percentage:
        {
            type:Number,
            required: true,
            trim: true
        }

    });

    const Team = mongoose.model("Team",teamSchema);
    
    module.exports = Team;