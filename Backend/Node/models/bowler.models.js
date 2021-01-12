const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bowlerSchema = new Schema(
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
        innings:
        {
            type:Number,
            required: true,
            trim: true
        },
        balls_delivered:
        {
            type:Number,
            required: true,
            trim: true
        },
        runs_conceded:
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
        economy:
        {
                type:Number,
                required: true,
                trim: true
        }
        ,
        bowling_strikerate:
        {
                type:Number,
                required: true,
                trim: true
        },
        four_wickets:
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
        }

    });

    const Bowler = mongoose.model("Bowler",bowlerSchema);
    
    module.exports = Bowler;