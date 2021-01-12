const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const allrounderSchema = new Schema(
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

        }
        ,
        matches:
        {
            type:Number,
            required: true,
            trim: true
        },
        batting_runs:
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
        batting_average:
        {
                type:Number,
                required: true,
                trim: true
        },
        hundreds:
        {
                type:Number,
                required: true,
                trim: true
        },
        wickets:
        {
            type:Number,
            required:true,
            trim: true
        }
        ,
        best_figures:
        {
            runs : 
            {
                type:Number,
                required: true,
                trim: true
            },
            wickets:
            {
                type: Number,
                required: true,
                trim: true
            }
        },
        bowling_average:
        {
                type:Number,
                required: true,
                trim: true
        },
        five_wickets:
        {
                type:Number,
                required: true,
                trim: true
        },
        average_difference:
        { 
            type:Number,
            required: true,
            trim: true

        }
    });

    const Allrounder = mongoose.model("Allrounder",allrounderSchema);
    
    module.exports = Allrounder;