const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const batsmanSchema = new Schema(
    {
        name:
        {
            type: String,
            required: true,
            minlength: 3,
            trim: true
        },
        
        country:
        {
            type: String,
            required: true,
            minlength: 2,
            trim: true
        },
        wicket_keeper : 
        {
            type: Boolean,
            required: true,
            trim: true
        },
        span:
        {
            starting_year : 
            {
                type:Number,
                required: true,
                trim: true
            },
            ending_year:
            {
                type:Number,
                required: true,
                trim: true
            }

        },
        matches:
        {
            type:Number,
            required: true,
            trim: true
        },
        innings:
        {
            type:Number,
            required: true,
            trim: true
        },
        not_outs:
        {
            type:Number,
            required: true,
            trim: true
        },
        runs:
        {
            type:Number,
            required: true,
            trim: true
        },
        highest_score:
        {
            highest_runs : 
            {
                type:Number,
                required: true,
                trim: true
            },
            out:
            {
                type: Boolean,
                required: true,
                trim: true
            }
            }
        ,
        average:
        {
                type:Number,
                required: true,
                trim: true
            
    
        },
        balls_faced:
        {
                type:Number,
                required: true,
                trim: true
        },
        strike_rate:
        {
                type:Number,
                required: true,
                trim: true
        }
        ,
        hundreds:
        {
                type:Number,
                required: true,
                trim: true
        },
        fiftys:
        {
                type:Number,
                required: true,
                trim: true
        },
        ducks:
        {
                type:Number,
                required: true,
                trim: true
        }





    });

    const Batsman = mongoose.model("Batsman",batsmanSchema);
    
    module.exports = Batsman;