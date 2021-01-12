const router = require("express").Router();
let Team = require("../models/team.models");
const neatCsv = require('neat-csv');
// const csvtojson = require("csvtojson");
var path = require('path');
const fs= require("fs");
const csv = require('csv-parser');
var fastcsv = require("fast-csv");


// Getting all teams
router.get(("/"),(req, res) =>
{
    Team.find({})
    .then(team => res.json(team))
    .catch(err => res.status(400).json("Error : "+err));

});

// Getting One Team
router.post(("/team"),(req, res) =>
{
    Team.find({name: req.body.name})
    .then(team => res.json(team))
    .catch(err => res.status(400).json("Error : "+err));

});


// Adding Team's CSV record to DB   
router.post(("/addFile"),(req, res) =>
{
    const file_name = req.body.name;
    const file_path = path.join(__dirname,"..","public","files",`${file_name}.csv`);


let stream = fs.createReadStream(file_path);

stream.pipe(csv())
.on('data', (row) => {
    
        var name = row['﻿Team'];
        var matches = (row["Matches"]);
        var won = (row['Won']);
        var lost = (row['Lost']);
        var tied = (row['Tied']);
        var no_result = (row['NR']);
        var percentage = (row['%']);
    
        // Make new obj to be saved in DB
        const newTeam = new Team({
            name,
            matches,
            won,
            lost,
            tied,
            no_result,
            percentage
        });
        newTeam.save().then(() =>res.send("Team added"))
        .catch(err => res.status(400).json("Error saving Team  " + err));
    

})
.on('end', () => {
    console.log('CSV file successfully processed');
    
}
);

});

// Adding 1 team via form: 
router.post(("/add"),(req, res) =>
{
    var name = req.body.name;
    var matches = Number(req.body.matches);
    var won = Number(req.body.won);
    var lost = Number(req.body.lost);
    var tied = Number(req.body.tied);
    var no_result = Number(req.body.no_result);
    var percentage = Number(req.body.percentage);

        // Make new obj to be saved in DB
        const newTeam = new Team({
            name,
            matches,
            won,
            lost,
            tied,
            no_result,
            percentage
        });
        newTeam.save().then(() =>res.json("Team added"))
        .catch(err => res.status(400).json("Error saving Team  " + err));
});

// For deleting all Teams Data
router.delete("/delete",(req, res) =>
{
    Team.remove({})
    .then(()=>
    {
        res.json("Data of All teams has been removed");
    })
    .catch(err =>
        {
            res.status(400).json("Error Deleting Teams : "+err);
        });
});


// For deleting One Teams Data
router.post("/deleteone",(req, res) =>
{
    
    Team.findOneAndRemove({name: req.body.name})
    .then((result) =>{
        if(result ===null)
        {
            res.status(500).send("Unable to delete Team");
        }
        else
        {
            res.json(`${result}  has been deleted !`)
        }
    })
    .catch((err)=>{res.status(400).json("Failed to delete Team : "+err)});
});

// Update one Team
router.post("/update",(req, res) =>
{

    var name = req.body.name;
    var matches = Number(req.body.matches);
    var won = Number(req.body.won);
    var lost = Number(req.body.lost);
    var tied = Number(req.body.tied);
    var no_result = Number(req.body.no_result);
    var percentage = Number(req.body.percentage);

    Team.findOneAndUpdate({name: name}, {$set: {matches: matches, 
    won: won, lost: lost, tied : tied, no_result: no_result, percentage: percentage}})
    .then(()=>{res.json(`${name} has been updated` )})
    .catch((err) =>{res.status(400).json(`Error updating  ${name}  details`)});
})

module.exports = router ;