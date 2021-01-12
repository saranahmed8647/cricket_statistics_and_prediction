const router = require("express").Router();
let Batsman = require("../models/batsman.models");
let Bowler = require("../models/bowler.models");
let Allrounder = require("../models/allrounder.models");
// const csvtojson = require("csvtojson");
var path = require('path');
const fs= require("fs");
const csv = require('csv-parser');
var fastcsv = require("fast-csv");


// THis route should show the choice of selecting category and searching by name
// router.get(("/"),(req, res) =>
// {
//     Team.find({})
//     .then(team => res.json(team))
//     .catch(err => res.status(400).json("Error : "+err));

// });

// BATSMEN routes

// Getting All Batsmen
router.get(("/batsmen"),(req, res) =>
{
    Batsman.find({})
    .then(bat => res.json(bat))
    .catch(err => res.status(400).json("Error : "+err));

});
// Getting batsman by name
router.post(("/batsmen/one"),(req, res) =>
{
    
    Batsman.find({name: req.body.name})
    .then(bat => res.json(bat))
    .catch(err => res.status(400).json("Error : "+err));

});

// Adding Batsmen CSV record to DB   
router.post(("/batsmen/addFile"),(req, res) =>
{
    const file_name = req.body.name;
    const file_path = path.join(__dirname,"..","public","files",`${file_name}.csv`);


    let readable = fs.createReadStream(file_path).pipe(csv());
    let error_count = 0;
    
    readable.on('data', (row) => {
        
            var name = row['Name'];
            var country = (row["Country"]);
            var starting_year = (row['Starting Year']);
            var ending_year = (row['Ending Year']);
            var matches = (row["Matches"]);
            var innings = (row["Innings"]);
            var not_outs = (row['Not outs']);
            var runs = (row["Runs"]);
            var highest_score = (row['Highest score']);
            var average = (row["Average"]);
            var balls_faced = (row['Balls faced']);
            var strike_rate = (row['Strike rate']);
            var hundreds = (row["Hundreds"]);
            var fiftys = (row["Fiftys"]);
            var ducks = (row["Ducks"]);
            var wiks = (row["Wicketleeper"]);
            // Innings: 
            let innings2;
            if(innings.includes("-"))
            {
                innings2 = 0;
            }
            else
            {
                innings2 = innings;
            }

            // Not outs
            let not_outs2;
            if(not_outs.includes("-"))
            {
                not_outs2 = 0;
            }
            else
            {
                not_outs2 = not_outs;
            }

            // RUns
            let runs2;
            if(runs.includes("-"))
            {
                runs2 = 0;
            }
            else
            {
                runs2 = runs;
            }

            // highest score
            let out_status_for_highestscore;
            let highest_score_runs2;
            if(highest_score.includes("*"))
            {
                out_status_for_highestscore = false;
                let temp_var = highest_score.split("*");
                highest_score_runs2 = temp_var[0];
            }
            else
            {
                out_status_for_highestscore = true;
                let temp_var = highest_score.split("*");
                highest_score_runs2 = temp_var[0];
            }

            if(highest_score.includes("-"))
            {
                out_status_for_highestscore = true;
                highest_score_runs2 = 0;
            }
            
            // Average
            
            let average2;
            if(average.includes("-"))
            {
                average2 = 0;
            }
            else
            {
                average2 = average;
            }

            // Balls faced
            
            let balls_faced2;
            if(balls_faced.includes("-"))
            {
                balls_faced2 = 0;
            }
            else
            {
                balls_faced2 = balls_faced;
            }

            // Strike rate
            
            let strike_rate2;
            if(strike_rate.includes("-"))
            {
                strike_rate2 = 0;
            }
            else
            {
                strike_rate2 = strike_rate;
            }

            // Hundreds
            
            let hundreds2;
            if(hundreds.includes("-"))
            {
                hundreds2 = 0;
            }
            else
            {
                hundreds2 = hundreds;
            }

            // Fiftys
            
            let fiftys2;
            if(fiftys.includes("-"))
            {
                fiftys2 = 0;
            }
            else
            {
                fiftys2 = fiftys;
            }

            // Ducks
            
            let ducks2;
            if(ducks.includes("-"))
            {
                ducks2 = 0;
            }
            else
            {
                ducks2 = ducks;
            }


            let country2;
            if(country === "IRE" || country === "ENG/IRE" || country.includes("IRE"))
            {
                country2 = "Ireland";
            }
            else if(country === "EAf")
            {
                country2 = "East African Federation";
            }
            else if(country === "BMUDA")
            {
                country2 = "Bermuda";
            }
            else if(country === "NZ" || country === "AUS/NZ" || country.includes("NZ"))
            {
                country2 = "New Zealand";
            }
            else if(country === "WI" || country === "ICC/WI" || country.includes("WI") )
            {
                country2 = "West Indies";
            }
            else if(country === "ENG" || country === "ENG/ICC" || country.includes("ENG"))
            {
                country2 = "England";
            }
            else if(country === "BDESH" || country === "Asia/BDESH" || country.includes("BDESH"))
            {
                country2 = "Bangladesh";
            }
            else if(country === "NEPAL")
            {
                country2 = "Nepal";
            }
            else if(country === "CAN" || country === "CAN/WI" || country.includes("CAN"))
            {
                country2 = "Canada";
            }
            else if(country === "AFG")
            {
                country2 = "Afghanistan";
            }
            else if(country === "KENYA")
            {
                country2 = "Kenya";
            }
            else if(country === "INDIA" || country === "Asia/ICC/INDIA" || country.includes("INDIA"))
            {
                country2 = "India";
            }
            else if(country === "PAK" || country === "Asia/PAK" || country.includes("PAK") )
            {
                country2 = "Pakistan";
            }
            else if(country === "USA" || country === "SA/USA" || country.includes("USA"))
            {
                country2 = "United States of America";
            }
            else if(country === "AUS" || country === "AUS/ICC" || country.includes("AUS"))
            {
                country2 = "Australia";
            }
            else if(country === "HKG" || country === "HKG/NZ" || country.includes("HKG"))
            {
                country2 = "Hong Kong";
            }
            else if(country === "SCOT" || country === "ENG/SCOT" || country.includes("SCOT"))
            {
                country2 = "Scotland";
            }
            else if(country === "NL" || country === "NL/SA" || country.includes("NL"))
            {
                country2 = "Netherland";
            }
            else if(country === "ZIM" || country === "Afr/ZIM" || country.includes("ZIM"))
            {
                country2 = "Zimbabwe";
            }
            else if(country === "SL" || country === "Asia/ICC/SL" || country.includes("SL"))
            {
                country2 = "Sri Lanka";
            }
            else if(country === "UAE")
            {
                country2 = "United Arab Emirates";
            }
            else if(country === "OMAN")
            {
                country2 = "Oman";
            }
            else if(country === "SA" || country === "Afr/SA" || country.includes("SA") )
            {
                country2 = "South Africa";
            }
            else if(country === "NAM")
            {
                country2 = "Namibia";
            }
            else if(country === "PNG" || country === "ENG/PNG" || country.includes("PNG"))
            {
                country2 = "Papua New Guinea";
            }
            else if(country === "KENYA" || country.includes("KENYA") || country === "Afr/KENYA")
            {
                country2 = "Kenya";
            }
            else
            {
                country2 = country;
            }


            
            var wik_bool = false;
            if(wiks === "no")
            {
                wik_bool = false;
            }
            else
            {
                wik_bool = true;
            }
            
            // Make new obj to be saved in DB
            const newBatsman = new Batsman({
                name: name,
                country: country2,
                
                span: {starting_year : starting_year,
                    ending_year:ending_year },
                matches: matches,
                wicket_keeper :wik_bool,
                innings: innings2,
                not_outs: not_outs2,
                runs:runs2,
                highest_score:{highest_runs : highest_score_runs2 ,
                                out: out_status_for_highestscore },
                average: average2,
                balls_faced: balls_faced2,
                strike_rate: strike_rate2,
                hundreds: hundreds2,
                fiftys: fiftys2,
                ducks: ducks2
            });

            readable.pause();
            newBatsman.save()
            .then(results =>
                {
                    console.log("Batsman added");
                    readable.resume();
                })
            .catch(err => 
                {
                    console.log("Error saving batsman  " + err);
                    error_count ++;
                });
    })
    readable.on('end', () => {
        if(error_count < 7)
        {
            console.log('CSV file successfully processed');
        res.json("All Batsmen added Successfully");
        }
        else
        {
            console.log('CSV file successfully processed but there were errors');
            res.status(400).json("Error processing the CSV file properly");
        }
        
        
    }
    )
    // readable.on('error', () => {
        
        
    // }
    // );

});

// Adding 1 batsman via form: 
router.post(("/batsmen/addone"),(req, res) =>
{
    var name =  req.body.name;
    var country = req.body.country;
    // span
    var starting_year =  Number(req.body.span.starting_year);
    var ending_year = Number(req.body.span.ending_year);
    
    
    var wicket_keeper = req.body.wicket_keeper;

    var matches = Number(req.body.matches);
    var innings = Number(req.body.innings);
    var not_outs = Number(req.body.not_outs);
    var runs = Number(req.body.runs);
    // highest_score
    var highest_runs = Number(req.body.highest_score.highest_runs);
    var out = req.body.highest_score.out;
    
    var average = Number(req.body.average);
    var balls_faced = Number(req.body.balls_faced);
    var strike_rate = Number(req.body.strike_rate);
    var hundreds = Number(req.body.hundreds);
    var fiftys = Number(req.body.fiftys);
    var ducks = Number(req.body.ducks);

// Make new obj to be saved in DB
const newBatsman = new Batsman({
    name: name,
    country: country,
    wicket_keeper : wicket_keeper,
    span: {starting_year : starting_year,
        ending_year:ending_year },
    matches: matches,
    innings: innings,
    not_outs: not_outs,
    runs:runs,
    highest_score:{highest_runs : highest_runs ,
                    out: out },
    average: average,
    balls_faced: balls_faced,
    strike_rate: strike_rate,
    hundreds: hundreds,
    fiftys: fiftys,
    ducks: ducks
});
newBatsman.save().then(() =>res.json("Batsmen added"))
.catch(err => res.status(400).json("Error saving batsmen  " + err));


});

// Getting batsmen by country name : 

router.post("/batsmen/ByCountry",(req,res) =>
{
    Batsman.find({country: req.body.name})
    .then(bowl => res.json(bowl))
    .catch(err => res.status(400).json("Error : "+err));


})


// For deleting all batsmen Data
router.delete("/batsmen/delete",(req, res) =>
{
    Batsman.deleteMany({})
    .then(()=>
    {
        res.json("Data of All Batsmen has been removed");
    })
    .catch(err =>
        {
            res.status(400).json("Error Deleting batsmen : "+err);
        });
});


// For deleting One Batsman's Data
router.post("/batsmen/deleteone",(req, res) =>
{
    Batsman.findOneAndRemove({name: req.body.name})
    .then((result) =>{res.json(`${req.body.name}  has been deleted !`)})
    .catch((err)=>{res.status(400).json("Failed to delete batsman : "+err)});
});

// Update one batsman
router.post("/batsmen/update",(req, res) =>
{

    var name =  req.body.name;
    var country = req.body.country;
    // span
    var starting_year =  Number(req.body.span.starting_year);
    var ending_year = Number(req.body.span.ending_year);
    
    // To be implemented
    var wicket_keeper = req.body.wicket_keeper;

    var matches = Number(req.body.matches);
    var innings = Number(req.body.innings);
    var not_outs = Number(req.body.not_outs);
    var runs = Number(req.body.runs);
    // highest_score
    var highest_runs = Number(req.body.highest_score.highest_runs);
    var out = req.body.highest_score.out;
    
    var average = Number(req.body.average);
    var balls_faced = Number(req.body.balls_faced);
    var strike_rate = Number(req.body.strike_rate);
    var hundreds = Number(req.body.hundreds);
    var fiftys = Number(req.body.fiftys);
    var ducks = Number(req.body.ducks);


    Batsman.findOneAndUpdate({name: name}, {$set: {
        name: name,
        country: country,
        wicket_keeper : wicket_keeper,
        span: {starting_year : starting_year,
            ending_year:ending_year },
        matches: matches,
        innings: innings,
        not_outs: not_outs,
        runs:runs,
        highest_score:{highest_runs : highest_runs ,
                        out: out },
        average: average,
        balls_faced: balls_faced,
        strike_rate: strike_rate,
        hundreds: hundreds,
        fiftys: fiftys,
        ducks: ducks
    }})
    .then(()=>{res.json(`${name} has been updated` )})
    .catch((err) =>{res.status(400).json(`Error updating  ${name}  details`)});
});


// BOWLERS routes

// Getting All Bowlers
router.get(("/bowlers"),(req, res) =>
{
    Bowler.find({})
    .then(bowl => res.json(bowl))
    .catch(err => res.status(400).json("Error : "+err));

});
// Getting bowler by name
router.post(("/bowlers/one"),(req, res) =>
{
    Bowler.find({name: req.body.name})
    .then(bowl => res.json(bowl))
    .catch(err => res.status(400).json("Error : "+err));

});

// Adding Bowler CSV record to DB   
// NOTE: to add here: add the attribute of wicketkeeper here and in csv file
router.post(("/bowlers/addFile"),(req, res) =>
{
    const file_name = req.body.name;
    const file_path = path.join(__dirname,"..","public","files",`${file_name}.csv`);


    let readable = fs.createReadStream(file_path).pipe(csv());

    
    readable.on('data', (row) => 
    {
            var name = row['﻿Name'];
            var country = (row["Country"]);
            var starting_year = (row['Starting Year']);
            var ending_year = (row['Ending Year']);
            var matches = (row["Matches"]);
            var innings = (row["Innings"]);
            var Balls_delivered = (row["Balls delivered"]);
            var Runs_conceded = (row["Runs conceded"]);
            var Wickets = (row["Wickets"]);
            var best_bowling_figures_wickets = (row['Best Figures Wickets']);
            var best_bowling_figures_runs = (row['Best Figures Runs']);
            var Bowling_Average = (row["Bowling Average"]);
            var Economy = (row["Economy"]);
            var Bowling_Strike_rate = (row["Bowling Strike rate"]);
            var four_wickets = (row["4 wickets in an innings"]);
            var five_wickets = (row["5 wickets in an innings"]);
                
            // Innings

            let innings2;
            if(innings.includes("-"))
            {
                innings2 = 0;
            }
            else
            {
                innings2 = innings;
            }

            // Balls delivered

            let Balls_delivered2;
            if(Balls_delivered.includes("-"))
            {
                Balls_delivered2 = 0;
            }
            else
            {
                Balls_delivered2 = Balls_delivered;
            }

            // runs conceded
            let Runs_conceded2;
            if(Runs_conceded.includes("-"))
            {
                Runs_conceded2 = 0;
            }
            else
            {
                Runs_conceded2 = Runs_conceded;
            }

            
            // wickets
            
            let Wickets2;
            if(Wickets.includes("-"))
            {
                Wickets2 = 0;
            }
            else
            {
                Wickets2 = Wickets;
            }
            
            // bowling average
            
            let Bowling_Average2;
            if(Bowling_Average.includes("-"))
            {
                Bowling_Average2 = 0;
            }
            else
            {
                Bowling_Average2 = Bowling_Average;
            }

            
            // Economy
            
            let Economy2;
            if(Economy.includes("-"))
            {
                Economy2 = 0;
            }
            else
            {
                Economy2 = Economy;
            }

            
            // Bowling strike rate
            
            let Bowling_Strike_rate2;
            if(Bowling_Strike_rate.includes("-"))
            {
                Bowling_Strike_rate2 = 0;
            }
            else
            {
                Bowling_Strike_rate2 = Bowling_Strike_rate;
            }

            
            // Four wickets
            
            let four_wickets2;
            if(four_wickets.includes("-"))
            {
                four_wickets2 = 0;
            }
            else
            {
                four_wickets2 = four_wickets;
            }
            // Five wickets
            
            let five_wickets2;
            if(five_wickets.includes("-"))
            {
                five_wickets2 = 0;
            }
            else
            {
                five_wickets2 = five_wickets;
            }


            let country2;
            if(country === "IRE" || country === "ENG/IRE" || country.includes("IRE"))
            {
                country2 = "Ireland";
            }
            else if(country === "EAf")
            {
                country2 = "East African Federation";
            }
            else if(country === "BMUDA")
            {
                country2 = "Bermuda";
            }
            else if(country === "NZ" || country === "AUS/NZ" || country.includes("NZ"))
            {
                country2 = "New Zealand";
            }
            else if(country === "WI" || country === "ICC/WI" || country.includes("WI") )
            {
                country2 = "West Indies";
            }
            else if(country === "ENG" || country === "ENG/ICC" || country.includes("ENG"))
            {
                country2 = "England";
            }
            else if(country === "BDESH" || country === "Asia/BDESH" || country.includes("BDESH"))
            {
                country2 = "Bangladesh";
            }
            else if(country === "NEPAL")
            {
                country2 = "Nepal";
            }
            else if(country === "CAN" || country === "CAN/WI" || country.includes("CAN"))
            {
                country2 = "Canada";
            }
            else if(country === "AFG")
            {
                country2 = "Afghanistan";
            }
            else if(country === "KENYA")
            {
                country2 = "Kenya";
            }
            else if(country === "INDIA" || country === "Asia/ICC/INDIA" || country.includes("INDIA"))
            {
                country2 = "India";
            }
            else if(country === "PAK" || country === "Asia/PAK" || country.includes("PAK") )
            {
                country2 = "Pakistan";
            }
            else if(country === "USA" || country === "SA/USA" || country.includes("USA"))
            {
                country2 = "United States of America";
            }
            else if(country === "AUS" || country === "AUS/ICC" || country.includes("AUS"))
            {
                country2 = "Australia";
            }
            else if(country === "HKG" || country === "HKG/NZ" || country.includes("HKG"))
            {
                country2 = "Hong Kong";
            }
            else if(country === "SCOT" || country === "ENG/SCOT" || country.includes("SCOT"))
            {
                country2 = "Scotland";
            }
            else if(country === "NL" || country === "NL/SA" || country.includes("NL"))
            {
                country2 = "Netherland";
            }
            else if(country === "ZIM" || country === "Afr/ZIM" || country.includes("ZIM"))
            {
                country2 = "Zimbabwe";
            }
            else if(country === "SL" || country === "Asia/ICC/SL" || country.includes("SL"))
            {
                country2 = "Sri Lanka";
            }
            else if(country === "UAE")
            {
                country2 = "United Arab Emirates";
            }
            else if(country === "OMAN")
            {
                country2 = "Oman";
            }
            else if(country === "SA" || country === "Afr/SA" || country.includes("SA") )
            {
                country2 = "South Africa";
            }
            else if(country === "NAM")
            {
                country2 = "Namibia";
            }
            else if(country === "PNG" || country === "ENG/PNG" || country.includes("PNG"))
            {
                country2 = "Papua New Guinea";
            }
            else if(country === "KENYA" || country.includes("KENYA") || country === "Afr/KENYA")
            {
                country2 = "Kenya";
            }
            else
            {
                country2 = country;
            }


            // Make new obj to be saved in DB
            const newBowler = new Bowler({
                name: name,
                country: country2,
                // wicket_keeper : To be fixed
                span: {starting_year : starting_year,
                    ending_year:ending_year },
                matches: matches,
                innings: innings2,
                wicket_keeper : false,
                balls_delivered:Balls_delivered2,
                runs_conceded: Runs_conceded2,
                wickets: Wickets2,
                best_figures: {
                    runs : best_bowling_figures_runs,
                    wickets:best_bowling_figures_wickets
                }
                ,
                bowling_average:Bowling_Average2,
                economy:Economy2,
                bowling_strikerate:Bowling_Strike_rate2,
                four_wickets:four_wickets2,
                five_wickets:five_wickets2
            });
            readable.pause();
            newBowler.save()
            .then(() =>
            {
                console.log("Bowler Added");
                readable.resume();
            })
            .catch(err => console.log("Error saving Bowlers  " + err));
    
        })
    readable.on('end', () => 
    {
        console.log('CSV file successfully processed');
        res.json("ALL Bowlers successfully added");   
    }
    )
    readable.on('error', () => 
    {
                res.status(400).json("Error processing CSV file");   
    }
    );

});

// Getting Bowlers by country name : 

router.post("/bowlers/ByCountry",(req,res) =>
{
    

    Bowler.find({country: req.body.name})
    .then(bowl => res.json(bowl))
    .catch(err => res.status(400).json("Error : "+err));


})

// Adding 1 bowler via form: 
router.post(("/bowlers/addone"),(req, res) =>
{
    var name =  req.body.name;
    var country = req.body.country;
    var wicket_keeper = req.body.wicket_keeper;
    // span
    var starting_year =  Number(req.body.span.starting_year);
    var ending_year = Number(req.body.span.ending_year);
    
    var matches = Number(req.body.matches);
    var innings = Number(req.body.innings);
    var Balls_delivered = Number(req.body.balls_delivered);
    var Runs_conceded = Number(req.body.runs_conceded);
    var Wickets = Number(req.body.wickets);
    // best figures
    var best_runs = Number(req.body.best_figures.best_runs);
    var best_wickets = Number(req.body.best_figures.best_wickets);
    
    var Bowling_Average = Number(req.body.bowling_average);
    var Economy = Number(req.body.economy);
    var Bowling_Strikerate = Number(req.body.bowling_strikerate);
    var four_wickets = Number(req.body.four_wickets);
    var five_wickets = Number(req.body.five_wickets);

// Make new obj to be saved in DB
const newBowler = new Bowler({
    name: name,
    country: country,
    wicket_keeper: wicket_keeper,
    
    span: {starting_year : starting_year,
        ending_year:ending_year },
    matches: matches,
    innings: innings,
    balls_delivered:Balls_delivered,
    runs_conceded: Runs_conceded,
    wickets: Wickets,
    best_figures: {
        runs : best_runs,
        wickets:best_wickets
    }
    ,
    bowling_average:Bowling_Average,
    economy:Economy,
    bowling_strikerate:Bowling_Strikerate,
    four_wickets:four_wickets,
    five_wickets:five_wickets
});
newBowler.save().then(() =>res.json("Bowler added"))
.catch(err => res.status(400).json("Error saving bowler  " + err));


});

// For deleting all bowler Data
router.delete("/bowlers/delete",(req, res) =>
{
    Bowler.remove({})
    .then(()=>
    {
        res.json("Data of All Bowlers has been removed");
    })
    .catch(err =>
        {
            res.status(400).json("Error Deleting bowlers : "+err);
        });
});


// For deleting One bowler's Data
router.post("/bowlers/deleteone",(req, res) =>
{
    Bowler.findOneAndRemove({name: req.body.name})
    .then((result) =>{res.json(`${req.body.name}  has been deleted !`)})
    .catch((err)=>{res.status(400).json("Failed to delete bowler : "+err)});
});

// Update one bowler
router.post("/bowlers/update",(req, res) =>
{
    var name =  req.body.name;
    var country = req.body.country;
    // span
    var starting_year =  Number(req.body.span.starting_year);
    var ending_year = Number(req.body.span.ending_year);
    
    var matches = Number(req.body.matches);
    var innings = Number(req.body.innings);
    var Balls_delivered = Number(req.body.balls_delivered);
    var Runs_conceded = Number(req.body.runs_conceded);
    var Wickets = Number(req.body.wickets);
    // best figures
    var best_runs = Number(req.body.best_figures.best_runs);
    var best_wickets = Number(req.body.best_figures.best_wickets);
    
    var Bowling_Average = Number(req.body.bowling_average);
    var Economy = Number(req.body.economy);
    var Bowling_Strikerate = Number(req.body.bowling_strikerate);
    var four_wickets = Number(req.body.four_wickets);
    var five_wickets = Number(req.body.five_wickets);

    Bowler.findOneAndUpdate({name: name}, {$set: 
        {
            name: name,
            country: country,
            // wicket_keeper : To be fixed
            span: {starting_year : starting_year,
                ending_year:ending_year },
            matches: matches,
            innings: innings,
            balls_delivered:Balls_delivered,
            runs_conceded: Runs_conceded,
            wickets: Wickets,
            best_figures: {
                runs : best_runs,
                wickets:best_wickets
            }
            ,
            bowling_average:Bowling_Average,
            economy:Economy,
            bowling_strikerate:Bowling_Strikerate,
            four_wickets:four_wickets,
            five_wickets:five_wickets
        }})
    .then(()=>{res.json(`${name} has been updated` )})
    .catch((err) =>{res.status(400).json(`Error updating  ${name}  details`)});
});

// All rounders routes

// Getting All All rounders
router.get(("/allrounders"),(req, res) =>
{
    Allrounder.find({})
    .then(rounder => res.json(rounder))
    .catch(err => res.status(400).json("Error : "+err));

});

// Getting Allrounders by country name : 

router.post("/allrounders/ByCountry",(req,res) =>
{
    Allrounder.find({country: req.body.name})
    .then(bowl => res.json(bowl))
    .catch(err => res.status(400).json("Error : "+err));


})


// Getting the countries of all allrounders
router.get(("/allroundersCountry"),(req, res) =>
{
    var country_list = []
    
    Allrounder.find({})
    .then(rounder => {
        for(let i =0; i < rounder.length ; i++)
        {
            country_list.push(rounder[i]["country"])
        }
        res.json(country_list)})
    .catch(err => res.status(400).json("Error : "+err));

});


// Getting all rounder by name
router.post(("/allrounders/one"),(req, res) =>
{
    Allrounder.find({name: req.body.name})
    .then(rounder => {
        
        return(res.json(rounder));
    })
    .catch(err => res.status(400).json("Error : "+err));

});

// Adding allrounder CSV record to DB   

router.post(("/allrounders/addFile"),(req, res) =>
{
    const file_name = req.body.name;
    const file_path = path.join(__dirname,"..","public","files",`${file_name}.csv`);


    // let stream = fs.createReadStream(file_path);
    let readable = fs.createReadStream(file_path).pipe(csv());

    // stream.pipe(csv())

    readable.on('data', (row) => {
                
            var name = (row['Name']);
            var country = (row["Country"]);
            var starting_year = (row['Starting Year']);
            var ending_year = (row['Ending Year']);
            var matches = (row["Matches"]);
            var Batting_Runs = (row['Batting Runs']);
            var highest_score = (row['Highest Score']);
            var Batting_Average = (row['Batting Average']);
            var Hundreds = (row["Hundreds"]);
            var Wickets = (row["Wickets"]);
            var best_bowling_figures_wickets = (row['Best Bowling Figures Wickets']);
            var best_bowling_figures_runs = (row['Best Bowling Figures Runs']);
            var Bowling_Average = (row['Bowling Average']);
            var five_Wickets = (row['5 Wickets']);
            // Difference between batting and bowling average. , if +ve then a better batsman, else bowler
            var Average_Difference = (row['Average Difference']);
            var wiks = (row["Wicketkeeper"]);
            
            let wickets2;
            // WIckets
            if(Wickets.includes("-"))
            {
                wickets2 = 0
            }
            else
            {
                wickets2 = Wickets
            }

            // Best FIgures 
            let best_bowling_figures_wickets2;
            let best_bowling_figures_runs2;
            if(best_bowling_figures_wickets.includes("-"))
            {
                best_bowling_figures_wickets2 = 0;
            }
            else
            {
                best_bowling_figures_wickets2 = best_bowling_figures_wickets
            }

            if(best_bowling_figures_runs.includes("-"))
            {
                best_bowling_figures_runs2 = 0;
            }
            else
            {
                best_bowling_figures_runs2 = best_bowling_figures_runs;
            }
            

            // Batting average
            let Batting_Average2; 

            
            if(Batting_Average.includes("-"))
            {
                Batting_Average2 = 0;
            }
            else
            {
                Batting_Average2 = Batting_Average;
            }

            // Hundreds
            
            let Hundreds2; 

            
            if(Hundreds.includes("-"))
            {
                Hundreds2 = 0;
            }
            else
            {
                Hundreds2 = Hundreds;
            }


            // Bowling average

            let Bowling_Average2;

            if(Bowling_Average.includes("-"))
            {
                Bowling_Average2 = 0;
            }
            else
            {
                Bowling_Average2 = Bowling_Average;
            }

            // Five wickets
            let five_Wickets2;
            if(five_Wickets.includes("-"))
            {
                five_Wickets2 = 0;
            }
            else
            {
                five_Wickets2 = five_Wickets;
            }
            // Batting Runs
            let Batting_Runs2;
            if(Batting_Runs.includes("-"))
            {
                Batting_Runs2 = 0;
            }
            else
            {
                Batting_Runs2 = Batting_Runs;
            }

            // Average difference

            let Average_Difference2;
            if(Average_Difference.includes("-"))
            {
                Average_Difference2 = 0;
            }
            else
            {
                Average_Difference2 = Average_Difference;
            }


            // highest score
            var out_status_for_highestscore;
            if(highest_score.includes("*"))
            {
                out_status_for_highestscore = false;
            }
            else
            {
                out_status_for_highestscore = true;
            }
            
            let temp_var_highestscore = highest_score.split("*");
            var highest_score_runs = temp_var_highestscore[0];

    // Highest score  
                
    let highest_score_runs2; 

                            
    if(highest_score_runs.includes("-"))
    {
        highest_score_runs2 = 0;
    }
    else
    {
        highest_score_runs2 = highest_score_runs;
    }

    let country2;
    if(country === "IRE" || country === "ENG/IRE" || country.includes("IRE"))
    {
        country2 = "Ireland";
    }
    else if(country === "EAf")
    {
        country2 = "East African Federation";
    }
    else if(country === "BMUDA")
    {
        country2 = "Bermuda";
    }
    else if(country === "NZ" || country === "AUS/NZ" || country.includes("NZ"))
    {
        country2 = "New Zealand";
    }
    else if(country === "WI" || country === "ICC/WI" || country.includes("WI") )
    {
        country2 = "West Indies";
    }
    else if(country === "ENG" || country === "ENG/ICC" || country.includes("ENG"))
    {
        country2 = "England";
    }
    else if(country === "BDESH" || country === "Asia/BDESH" || country.includes("BDESH"))
    {
        country2 = "Bangladesh";
    }
    else if(country === "NEPAL")
    {
        country2 = "Nepal";
    }
    else if(country === "CAN" || country === "CAN/WI" || country.includes("CAN"))
    {
        country2 = "Canada";
    }
    else if(country === "AFG")
    {
        country2 = "Afghanistan";
    }
    else if(country === "KENYA")
    {
        country2 = "Kenya";
    }
    else if(country === "INDIA" || country === "Asia/ICC/INDIA" || country.includes("INDIA"))
    {
        country2 = "India";
    }
    else if(country === "PAK" || country === "Asia/PAK" || country.includes("PAK") )
    {
        country2 = "Pakistan";
    }
    else if(country === "USA" || country === "SA/USA" || country.includes("USA"))
    {
        country2 = "United States of America";
    }
    else if(country === "AUS" || country === "AUS/ICC" || country.includes("AUS"))
    {
        country2 = "Australia";
    }
    else if(country === "HKG" || country === "HKG/NZ" || country.includes("HKG"))
    {
        country2 = "Hong Kong";
    }
    else if(country === "SCOT" || country === "ENG/SCOT" || country.includes("SCOT"))
    {
        country2 = "Scotland";
    }
    else if(country === "NL" || country === "NL/SA" || country.includes("NL"))
    {
        country2 = "Netherland";
    }
    else if(country === "ZIM" || country === "Afr/ZIM" || country.includes("ZIM"))
    {
        country2 = "Zimbabwe";
    }
    else if(country === "SL" || country === "Asia/ICC/SL" || country.includes("SL"))
    {
        country2 = "Sri Lanka";
    }
    else if(country === "UAE")
    {
        country2 = "United Arab Emirates";
    }
    else if(country === "OMAN")
    {
        country2 = "Oman";
    }
    else if(country === "SA" || country === "Afr/SA" || country.includes("SA") )
    {
        country2 = "South Africa";
    }
    else if(country === "NAM")
    {
        country2 = "Namibia";
    }
    else if(country === "PNG" || country === "ENG/PNG" || country.includes("PNG"))
    {
        country2 = "Papua New Guinea";
    }
    else if(country === "KENYA" || country.includes("KENYA") || country === "Afr/KENYA")
    {
        country2 = "Kenya";
    }
    else
    {
        country2 = country;
    }

    var wik_bool = false;
            if(wiks === "no")
            {
                wik_bool = false;
            }
            else
            {
                wik_bool = true;
            }
            
    // Make new obj to be saved in DB
            const newAllrounder = new Allrounder({
                name: name,
                country: country2,
                wicket_keeper : wik_bool,
                span: {starting_year : starting_year,
                    ending_year:ending_year },
                matches: matches,
                batting_runs:Batting_Runs2,
                highest_score:{
                    highest_runs : highest_score_runs2,
                    out: out_status_for_highestscore
                },
                batting_average: Batting_Average2,
                hundreds:Hundreds2,
                wickets:wickets2,
                best_figures:{
                    runs : best_bowling_figures_runs2,
                    wickets:best_bowling_figures_wickets2
                },
                bowling_average:Bowling_Average2,
                five_wickets:five_Wickets2,
                average_difference:Average_Difference2

            });

            readable.pause();
            newAllrounder.save()
            .then(results =>{
                console.log("Allround added");
                readable.resume();
            })
            .catch(err => res.status(400).json("Error saving All rounders  " + err));
    })
    readable.on('end', () => {
        console.log('CSV file successfully processed');
        res.json("ALL rounders added successfully");
        
    }
    )
    readable.on('error', () => {
        res.status(400).json("Error Processing the CSV file correctly");
    });

});

// Adding 1 allrounder via form: 
router.post(("/allrounders/addone"),(req, res) =>
{
    var name =  req.body.name;
    var country = req.body.country;
    // span
    var starting_year =  Number(req.body.span.starting_year);
    var ending_year = Number(req.body.span.ending_year);
    
    var wicket_keeper = Boolean(req.body.wicket_keeper);
    var matches = Number(req.body.matches);
    var Batting_Runs = Number(req.body.batting_runs);
    // highest score
    var highest_runs = Number(req.body.highest_score.highest_runs);
    var out_status_highest_runs = Boolean(req.body.highest_score.out);
    
    var Batting_Average = Number(req.body.batting_average);
    var Hundreds = Number(req.body.hundreds);
    var Wickets = Number(req.body.wickets);
    
    // best figures
    var best_runs = Number(req.body.best_figures.runs);
    var best_wickets = Number(req.body.best_figures.wickets);
    
    var Bowling_Average = Number(req.body.bowling_average);
    var five_wickets = Number(req.body.five_wickets);
    var Average_Difference = Number(req.body.average_difference);

    // Make new obj to be saved in DB
const newAllrounder = new Allrounder({
    name: name,
    country: country,
    wicket_keeper :wicket_keeper,
    span: {starting_year : starting_year,
        ending_year:ending_year },
    matches: matches,
    batting_runs:Batting_Runs,
    highest_score:{
        highest_runs : highest_runs,
        out: out_status_highest_runs
    },
    batting_average: Batting_Average,
    hundreds:Hundreds,
    wickets:Wickets,
    best_figures:{
        runs : best_runs,
        wickets:best_wickets
    },
    bowling_average:Bowling_Average,
    five_wickets:five_wickets,
    average_difference:Average_Difference

});
newAllrounder.save().then(() =>res.json("All rounder added"))
.catch(err => res.status(400).json("Error saving All rounder  " + err));

});

// For deleting all the allrounders Data
router.delete("/allrounders/delete",(req, res) =>
{
    Allrounder.remove({})
    .then(()=>
    {
        res.json("Data of All rounders has been removed");
    })
    .catch(err =>
        {
            res.status(400).json("Error Deleting All rounders : "+err);
        });
});


// For deleting One allrounder's Data
router.post("/allrounders/deleteone",(req, res) =>
{
    Allrounder.findOneAndRemove({name: req.body.name})
    .then((result) =>{res.json(`${req.body.name}  has been deleted !`)})
    .catch((err)=>{res.status(400).json("Failed to delete allrounder : "+err)});
});

// Update one allrounder
router.post("/allrounders/update",(req, res) =>
{
   
    var name =  req.body.name;
    var country = req.body.country;
    // span
    var starting_year =  Number(req.body.span.starting_year);
    var ending_year = Number(req.body.span.ending_year);
    
    var wicket_keeper = Boolean(req.body.wicket_keeper);
    var matches = Number(req.body.matches);
    var Batting_Runs = Number(req.body.batting_runs);
    // highest score
    var highest_runs = Number(req.body.highest_score.highest_runs);
    var out_status_highest_runs = Boolean(req.body.highest_score.out);
    
    var Batting_Average = Number(req.body.batting_average);
    var Hundreds = Number(req.body.hundreds);
    var Wickets = Number(req.body.wickets);
    
    // best figures
    var best_runs = Number(req.body.best_figures.runs);
    var best_wickets = Number(req.body.best_figures.wickets);
    
    var Bowling_Average = Number(req.body.bowling_average);
    var five_wickets = Number(req.body.five_wickets);
    var Average_Difference = Number(req.body.average_difference);

    // Make new obj to be saved in DB
const newAllrounder = new Allrounder({
    name: name,
    country: country,
    wicket_keeper :wicket_keeper,
    span: {starting_year : starting_year,
        ending_year:ending_year },
    matches: matches,
    batting_runs:Batting_Runs,
    highest_score:{
        highest_runs : highest_runs,
        out: out_status_highest_runs
    },
    batting_average: Batting_Average,
    hundreds:Hundreds,
    wickets:Wickets,
    best_figures:{
        runs : best_runs,
        wickets:best_wickets
    },
    bowling_average:Bowling_Average,
    five_wickets:five_wickets,
    average_difference:Average_Difference

});


Allrounder.findOneAndUpdate({name: name}, {$set: 
    {
        name: name,
    country: country,
    wicket_keeper :wicket_keeper,
    span: {starting_year : starting_year,
        ending_year:ending_year },
    matches: matches,
    batting_runs:Batting_Runs,
    highest_score:{
        highest_runs : highest_runs,
        out: out_status_highest_runs
    },
    batting_average: Batting_Average,
    hundreds:Hundreds,
    wickets:Wickets,
    best_figures:{
        runs : best_runs,
        wickets:best_wickets
    },
    bowling_average:Bowling_Average,
    five_wickets:five_wickets,
    average_difference:Average_Difference



}})
.then(()=>{res.json(`${name} has been updated` )})
.catch((err) =>{res.status(400).json(`Error updating  ${name}  details`)});




});


module.exports = router ;