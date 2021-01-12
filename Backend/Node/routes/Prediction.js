const router = require("express").Router();
var path = require('path');
// const pynode = require('@fridgerator/pynode');
const {spawn} = require('child_process');
// const exec = require('child_process').exec;
// const pynode = require('@fridgerator/pynode');

const {PythonShell}  = require('python-shell');
const execa = require('execa');
const _ = require('lodash');
const util = require('util');
const testFolder = './';
const fs = require('fs');

router.post(("/team"),(req, res) =>
{

  
let team_1 = req.body.Team1;
let team_2 = req.body.Team2;
let venue = req.body.Venue;
// console.log(util.inspect(req.body, {depth: null}));



  const subprocess = execa('python ../Python_Model/Team_Match_Prediction/team_match_prediction3.py', [team_1,team_2,venue]);
  subprocess.stdout.pipe(process.stdout);
  var winning_team_name = "";
  (async () => {
    const {stdout} = await subprocess;
    // Returning Result: 
    res.send(stdout);
    console.log('child output:', stdout);
})();


});
// Team win prediction percentage
router.post(("/teamPercentage"),(req, res) =>
{

  
let team_1 = req.body.Team1;
let team_2 = req.body.Team2;
let venue = req.body.Venue;

// console.log(util.inspect(req.body, {depth: null}));



  const subprocess = execa('python ../Python_Model/Team_Match_Prediction/team_match_prediction4.py', [team_1,team_2,venue]);
  subprocess.stdout.pipe(process.stdout);
  
  (async () => {
    const {stdout} = await subprocess;
    // Returning Result: 
    res.send(stdout);
    console.log('child output:', stdout);
})();

});


// Player Based Team Win Prediction : Name

router.post(("/SquadWin"), (req,res) =>
{
    
let team_1_name = req.body.Team1_name;
let team_2_name = req.body.Team2_name;

let team_1_list = req.body.Team1_list;
let team_2_list = req.body.Team2_list;
let venue = req.body.Venue;
let toss = req.body.Toss;


for(i = 0 ; i< team_1_list.length; i++)
{
  team_1_list[i]["Country"] = team_1_name.trim();
}
for(i = 0 ; i< team_2_list.length; i++)
{
  team_2_list[i]["Country"] = team_2_name.trim();
}



const subprocess = execa('python ../Python_Model/Squad_based/Score_calculator.py', [JSON.stringify(team_1_list),JSON.stringify(team_2_list), venue , toss]);
subprocess.stdout.pipe(process.stdout);
var winning_team_name = "";
(async () => {
  const {stdout} = await subprocess;
  // Returning Result: 
  // const temp_res = stdout.split("\n");
  // res.send(stdout);
  res.send(stdout);
  console.log('child output:', stdout);
})();



})

// Squad Recommendation Route :

router.post(("/SquadRecommendation"), (req,res) =>
{
    console.log("This one ran");
let team_1_name = req.body.Team1_name;
let team_2_name = req.body.Team2_name;

let team_1_list = req.body.Team1_list;
let team_2_list = req.body.Team2_list;
let venue = req.body.Venue;
let toss = req.body.Toss;



for(i = 0 ; i< team_2_list.length; i++)
{
  team_2_list[i]["Country"] = team_2_name.trim();
}


const subprocess = execa('python ../Python_Model/Squad_Recommendation/Test.py', [JSON.stringify(team_1_list),JSON.stringify(team_2_list), venue , toss]);
subprocess.stdout.pipe(process.stdout);
var winning_team_name = "";
(async () => {
  const {stdout} = await subprocess;
  
  res.send(stdout);
  console.log('child output:', stdout);
})();



})



module.exports = router ;
