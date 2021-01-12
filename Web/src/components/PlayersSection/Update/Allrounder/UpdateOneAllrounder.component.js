import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Alert } from 'react-bootstrap';
// import { createBrowserHistory as history} from 'history';
import { useHistory } from "react-router-dom";
import { getFromStorage , setInStorage } from "../../../utils/storage"; 

import Toolbar from "../../../Toolbar/Toolbar.component";
import SideDrawer from "../../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../../Backdrop/Backdrop.component";

const UpdateOneAllrounder = (props) =>
{
    const [sideDrawerOpen,setSideDrawer] = useState(false);

    const history = useHistory();

    const[TeamData, setTeamData] = useState({});
    const [torender , settoRender] = useState(false);

    const [ teamDataErrors, setTeamDataErrors] = useState([]);

    
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [wicketkeeper, setwicketkeeper] = useState(false);
    // Span
    const [startingYear, setstartingYear] = useState(0);
    const [endingYear, setendingYear] = useState(0);
    
    const [matches, setmatches] = useState(0);
    const [battingRuns, setbattingRuns] = useState(0);
    // Highest score
    const [highestRuns, sethighestRuns] = useState(0);
    const [outStatusForHighestScore, setoutStatusForHighestScore] = useState(true);
    
    const [battingAverage, setbattingAverage] = useState(0);
    const [hundreds, sethundreds] = useState(0);
    const [wickets, setwickets] = useState(0);
    // Best bowling figures
    const [bestFigureRuns, setbestFigureRuns] = useState(0);
    const [bestFigureWickets, setbestFigureWickets] = useState(0);
    
    const [bowlingAverage, setbowlingAverage] = useState(0);
    const [fiveWickets, setfiveWickets] = useState(0);
    const [averageDifference, setaverageDifference] = useState(0);


    useEffect(() =>
    {

        
    const name = props.match.params.name;
    const body_data = {
        name:name
    }

    axios.post("http://localhost:5000/player/allrounders/one",body_data)
    .then(json =>
        {   
            if(json.status === 200)
            {
                var fetched_data = json.data[0];
                setTeamData(fetched_data);    
                
            }
        })
  .catch(function (error) {
    alert("Failed to get allrounders Data, going to main menu");
    
    history.push("/mainmenu");
  });

  setTimeout(() => {
     settoRender(true); 
  }, 12000);

    },[]);




    const drawerToggleClickHandler = () =>
    {
        setSideDrawer((prev) =>
        {
            return !prev;
        })
    };

    const backdropClickHandler =() =>
    {
        setSideDrawer(false);
    };
    
    let backdrop_var;

    if(sideDrawerOpen)
    {
        
        backdrop_var = <Backdrop click={backdropClickHandler}/>;
    }



    const TeamHandler = (e) => 
    {
        e.preventDefault();
        
        if (TeamData.name.trim() ==="" || TeamData.country.trim() ==="" 
        || TeamData.matches === 0 || TeamData.span.startingYear === 0 || TeamData.span.endingYear === 0) 
        {
            setTeamDataErrors([...teamDataErrors,"All fields must be filled"]);
        } else if (TeamData.name.length < 6) {
            setTeamDataErrors([...teamDataErrors,"Player name must be greater than 6 characters"]);
        }
        else {
            const team_data = 
            {
                name: TeamData.name.trim(),
                country:TeamData.country.trim(),
                wicket_keeper :wicketkeeper,
                span:{
                    starting_year : TeamData.span.starting_year ,
                    ending_year: TeamData.span.ending_year
                },

                
                matches:TeamData.matches,
                batting_runs:TeamData.batting_runs,
                
                highest_score:{
                    highest_runs :TeamData.highest_score.highest_runs,
                    out:outStatusForHighestScore
                }
                ,
                batting_average:TeamData.batting_average,
                hundreds:TeamData.hundreds,
                wickets:TeamData.wickets,
                best_figures:
                {
                    runs :TeamData.best_figures.runs,
                    wickets:TeamData.best_figures.wickets
                },
                bowling_average:TeamData.bowling_average,
                five_wickets:TeamData.five_wickets,
                average_difference:TeamData.average_difference
                
                
            }
            axios.post('http://localhost:5000/player/allrounders/update', team_data)
                .then(json =>

                    {   
                        if(json.status === 200)
                        {
                            
                            setName("");
                            setmatches(0);
                            setCountry("");
                            setstartingYear(0);
                            setendingYear(0);
                            setbattingRuns(0);
                            sethighestRuns(0);
                            setbattingAverage(0);
                            sethundreds(0);
                            setwickets(0);
                            setbestFigureRuns(0);
                            setbestFigureWickets(0);
                            setbowlingAverage(0);
                            setfiveWickets(0);
                            setaverageDifference(0);

                            alert("Allrounder added successfully !");
                            history.push("/mainmenu");
                        }
                    })
              .catch( error => {
                setTeamDataErrors([...teamDataErrors,"Error Adding the Allrounders to the database"]);
              });
            }       
    };


    const changeName = (e) =>
    {
        
            var name_var = e.target.value;
             let temp_name = {...TeamData};
             temp_name.name =  name_var;
            setTeamData(temp_name);
            
        
    }
    const changeCountry = (e) =>
    {
        
            let co_var = e.target.value;
            let temp_name = {...TeamData};
            temp_name.country =  co_var;
            setTeamData(temp_name);
       
    }
    const changeWicketkeeper = (e) =>
    {
        
            var wi_var = e.target.value;
            setwicketkeeper(wi_var);
        
        
    }
    const changeStartingYear = (e) =>
    {
        
            let st_var = Number(e.target.value);
            let temp_name = {...TeamData};
            temp_name.span.starting_year =  st_var;
            setTeamData(temp_name);
        
    }
    const changeEndingYear = (e) =>
    {
        
            let en_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.span.ending_year =  en_var;
            setTeamData(temp_name);
        
    }

    



    const changeMatches = (e) =>
    {
        
            let match_var = Number(e.target.value);
            let temp_name = {...TeamData};
            temp_name.matches =  match_var;
            setTeamData(temp_name);
        
        
    }
    const changeBattingRuns = (e) =>
    {
        
            let bat_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.batting_runs =  bat_var;
            setTeamData(temp_name);
        
    }
    const changeHighestRuns = (e) =>
    {
        
            let hi_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.highest_score.highest_runs =  hi_var;
            setTeamData(temp_name);
        
    }
    const changeoutStatus = (e) =>
    {
        
            var ot_var = e.target.value;
            setoutStatusForHighestScore(ot_var);
        
    }

    const changeBattingAverage = (e) =>
    {
           
            let batav_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.batting_average =  batav_var;
            setTeamData(temp_name);
        
        
        
    }

    const changeHundreds = (e) =>
    {
        
            let hun_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.hundreds =  hun_var;
            setTeamData(temp_name);
        
        
        
    }

    const changeWicketsTaken = (e) =>
    {
        
        
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.wickets =  wti_var;
            setTeamData(temp_name);
        
        
    }

    const changebestFIgureRuns = (e) =>
    {
        
            let runb_var = Number(e.target.value);
            
            
            let temp_name = {...TeamData};
            temp_name.best_figures.runs =  runb_var;
            setTeamData(temp_name);
        
        
        
    }

    const changeBestFIgureWickets = (e) =>
    {
        
            let befiw_var = Number(e.target.value);
        
            let temp_name = {...TeamData};
            temp_name.best_figures.wickets =  befiw_var;
            setTeamData(temp_name);
        
        
    }
    const changeBowlingAverage = (e) =>
    {
        
            let bowav_var = Number(e.target.value);
        
            let temp_name = {...TeamData};
            temp_name.bowling_average =  bowav_var;
            setTeamData(temp_name);

        
        
    }
    
    const changeFiveWIckets = (e) =>
    {
        
            let fiwv_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.five_wickets =  fiwv_var;
            setTeamData(temp_name);
            
        
        
    }
    
    const changeAverageDIfference = (e) =>
    {
        
            let avdiv_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.average_difference =  avdiv_var;
            setTeamData(temp_name);
            
        
    }
    




// console.log("Team data : ");
// console.log(TeamData);
if(torender)
{
    return (<div style={{height:"100%"}}>
    

    <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}
        <br />
        <br />
        <br />
        <br />
        <br />



        <div class="ui middle aligned center aligned grid" style={{width: "100%",height:'100%', position:'fixed',overflowY:'scroll'}}>
  <div class="column">
    <h2 class="ui image header">
      <div class="content">
        Updating Single Allrounder
      </div>
    </h2>
    <form action="post" onSubmit={TeamHandler} class="ui large form">
      <div class="ui stacked secondary  segment">
        <div class="field">
          <div class="ui left icon input">
          <span>Enter the Player's Name : </span>
        <input type="text" name="name" value={TeamData.name} style ={{width : "50%"}}
                                                   aria-label="name"
                                                   title="Enter the player's Name"
                                                   placeholder="Enter the Player's Name"
                                                   onChange={changeName}
                                                    required={true}/>
          </div>
        </div>
        
        <div class="field">
          <div class="ui left icon input">
          <span>Enter the Player's Country : </span>
        <input type="text" name="country" value={TeamData.country} style ={{width : "50%"}}
                                                   aria-label="country"
                                                   title="Enter the player's country"
                                                   placeholder="Enter the Player's country"
                                                   onChange={changeCountry}
                                                    required={true}/>
          </div>
        </div>
        
        <div class="field">
          <div class="ui left icon input">
          <span>Is the Player a wicketkeeper ? </span>
        <br />
        <div onChange={changeWicketkeeper}  >
        <input type="radio" value="true"  name="wicketkeeper" required/> <strong>Yes</strong>
        <br />
        <input type="radio" value="false" name="wicketkeeper" /> <strong>No</strong>
        <br />
      </div>
          </div>
        </div>
        
        <div class="field">
          <div class="ui left icon input">
          <span>Enter his starting year</span>
    <input type="number" name="startingyear"   min="0" value={TeamData.span.starting_year} style = {{width : "50%"}}
                                                    aria-label="startingYear"
                                                    title="Enter the starting Year of this player"
                                                    placeholder="Enter the starting Year of this player"
                                                    onChange={changeStartingYear}
                                                        required={true}/>

          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter his retirement year</span>
    <input type="number" name="endingyear"   min="0" value={TeamData.span.ending_year} style = {{width : "50%"}}
                                                    aria-label="endingyear"
                                                    title="Enter the ending year of this player"
                                                    placeholder="Enter the ending year of this player"
                                                    onChange={changeEndingYear}
                                                        required={true}/>

          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter total matches played : </span>
    <input type="number" name="matches"   min="0" value={TeamData.matches} style = {{width : "50%"}}
                                                    aria-label="matches"
                                                    title="Enter the Total Matches Played by this player"
                                                    placeholder="Enter the Total Matches Played by this player"
                                                    onChange={changeMatches}
                                                        required={true}/>

          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter the total Batting Runs scored : </span>
<input type="number" name="battingRuns"   min="0" value={TeamData.batting_runs} style = {{width : "50%"}}
                                                   aria-label="battingRuns"
                                                   title="Enter the number of batting Runs"
                                                   placeholder="Enter the number of batting Runs scored"
                                                   onChange={changeBattingRuns}
                                                    required={true}/>

          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter his highest scored runs : </span>
    <input type="number" name="highestruns"   min="0" value={TeamData.highest_score.highest_runs} style = {{width : "50%"}}
                                                    aria-label="highestruns"
                                                    title="Enter the highest runs scored"
                                                    placeholder="Enter the highest runs scored"
                                                    onChange={changeHighestRuns}
                                                        required={true}/>

          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Was the player Out or not Out when he achieved this score ?</span>
<br />
<div onChange={changeoutStatus} >
        <input type="radio" value="true" name="outstatus" required/> <strong>Out</strong>
        <br />
        <input type="radio" value="false" name="outstatus" /> <strong>Not Out</strong>
        <br />
      </div>

          </div>
        </div>
        

        <div class="field">
          <div class="ui left icon input">
          <span>Enter the Player's batting average : </span>
<input type="number" name="battingaverage"   min="0" step="0.01" value={TeamData.batting_average} style ={{width : "50%"}}
                                                   aria-label="battingaverage"
                                                   title="Enter the batting average of player"
                                                   placeholder="Enter the batting average of player"
                                                   onChange={changeBattingAverage}
                                                    required={true}/>          
          </div>
        </div>

        <div class="field">
          <div class="ui left icon input">
          <span>Enter the total Hundreds scored : </span>
<input type="number" name="Hundreds"   min="0" value={TeamData.hundreds} style ={{width : "50%"}}
                                                   aria-label="Hundreds"
                                                   title="Enter the number of Hundreds scored"
                                                   placeholder="Enter the number of Hundreds scored"
                                                   onChange={changeHundreds}
                                                    required={true}/>


          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter the total number of wickets taken : </span>
<input type="number" name="wickets"   min="0" value={TeamData.wickets} style ={{width : "50%"}}
                                                   aria-label="wickets"
                                                   title="Enter the number of wickets taken"
                                                   placeholder="Enter the number of wickets taken"
                                                   onChange={changeWicketsTaken}
                                                    required={true}/>


          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
     
<span>Enter his Runs given for the best figure</span>
    <input type="number" name="bestFigureRUns"   min="0" value={TeamData.best_figures.runs} style ={{width : "50%"}}
                                                    aria-label="bestFigureRUns"
                                                    title="Enter the best Figure Runs"
                                                    placeholder="Enter the best Figure Runs"
                                                    onChange={changebestFIgureRuns}
                                                        required={true}/>

          </div>
        </div>

        <div class="field">
          <div class="ui left icon input">
          <span>Enter the wickets he took for the best figure: </span> 
    <input type="number" name="bestfigureWickets"   min="0" value={TeamData.best_figures.wickets} style ={{width : "50%"}}
                                                    aria-label="bestfigureWickets"
                                                    title="Enter the wickets taken for best figure"
                                                    placeholder="Enter the wickets taken for best figure"
                                                    onChange={changeBestFIgureWickets}
                                                        required={true}/>

          </div>
        </div>

        <div class="field">
          <div class="ui left icon input">
          <span>Enter Number of five wickets taken: </span>
    <input type="number" name="fivewickets"   min="0" value={TeamData.five_wickets} style ={{width : "50%"}}
                                                    aria-label="five wickets"
                                                    title="Enter number of five wickets"
                                                    placeholder="Enter number of five wickets"
                                                    onChange={changeFiveWIckets}
                                                        required={true}/>


          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter Average difference: Batting - Bowling </span>
    <input type="number" name="averagedifference"  step = "0.01" value={TeamData.average_difference} style ={{width : "50%"}}
                                                    aria-label="averagedifference"
                                                    title="Enter the average difference"
                                                    placeholder="Enter the average difference"
                                                    onChange={changeAverageDIfference}
                                                        required={true}/>


          </div>
        </div>


         <button
             type='submit'
             className='btn btn-primary btn-lg btn-block  form-control'
          >
                      Update Allrounder
          </button>
        
      </div>

      

    </form>
    <div class="ui error message">
    {
        
        (teamDataErrors.length > 0) ? (<p>{teamDataErrors.map((item, index) => (
     <p>{item}</p>
  ))}</p>) : (null)
    }
    </div>
    <br/><br/><br/><br/><br/><br/>
    
  </div>
</div>
   </div>);
}

else
{
    return(
        
        <div className="ui segment">
  <div className="ui active inverted dimmer">
    <div className="ui large text loader">Loading All rounder's Data</div>
  </div>
  <p></p>
  <p></p>   
  <p></p>
</div>
    );
}




        
    }

    


export default UpdateOneAllrounder;