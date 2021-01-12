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

const UpdateOneBatsman = (props) =>
{
    const [sideDrawerOpen,setSideDrawer] = useState(false);

    const history = useHistory();

    const[TeamData, setTeamData] = useState({});
    const [torender , settoRender] = useState(false);

    const [ teamDataErrors, setTeamDataErrors] = useState([]);

    
    const [wicketkeeper, setwicketkeeper] = useState(false);
    const [outStatusForHighestScore, setoutStatusForHighestScore] = useState(true);
    
    

    useEffect(() =>
    {

        
    const name = props.match.params.name;
    const body_data = {
        name:name
    }

    axios.post("http://localhost:5000/player/batsmen/one",body_data)
    .then(json =>
        {   
            if(json.status == 200)
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
  }, 13000);

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
        || TeamData.matches == 0 || TeamData.span.startingYear === 0 || TeamData.span.endingYear === 0) 
        {
            setTeamDataErrors([...teamDataErrors,"All fields must be filled"]);
        } else if (TeamData.name.length < 5) {
            setTeamDataErrors([...teamDataErrors,"Player name must be greater than 5 characters"]);
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
                innings: TeamData.innings,
                not_outs: TeamData.not_outs,
                runs:TeamData.runs,
                highest_score:{
                    highest_runs :TeamData.highest_score.highest_runs,
                    out:outStatusForHighestScore
                }
                ,
                average:TeamData.average,
                balls_faced: TeamData.balls_faced,
                strike_rate:TeamData.strike_rate,
                hundreds:TeamData.hundreds,
                fiftys:TeamData.fiftys,
                ducks:TeamData.ducks
                
            }
            axios.post('http://localhost:5000/player/batsmen/update', team_data)
                .then(json =>

                    {   
                        if(json.status === 200)
                        {
                            
                            alert("Batsman Updated successfully !");
                            history.push("/mainmenu");
                        }
                    })
              .catch( error => {
                setTeamDataErrors([...teamDataErrors,"Error Updating the Batsman to the database"]);
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
            temp_name.runs =  bat_var;
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
        
            let ot_var = e.target.value;
            setoutStatusForHighestScore(ot_var);
        
    }
    const changeWicketkeeper = (e) =>
    {
        
            let ot_var = e.target.value;
            setwicketkeeper(ot_var);
        
    }

    const changeBattingAverage = (e) =>
    {
           
            let batav_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.average =  batav_var;
            setTeamData(temp_name);
        
        
        
    }

    const changeHundreds = (e) =>
    {
        
            let hun_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.hundreds =  hun_var;
            setTeamData(temp_name);
        
        
        
    }

    const changeBallsFaced = (e) =>
    {
        
            let hun_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.balls_faced =  hun_var;
            setTeamData(temp_name);
        
        
        
    }

    const changeStrikeRate = (e) =>
    {
        
            let hun_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.strike_rate =  hun_var;
            setTeamData(temp_name);
        
        
        
    }

    const changefiftys = (e) =>
    {
        
            let hun_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.fiftys =  hun_var;
            setTeamData(temp_name);
        
        
        
    }

    const changeDucks = (e) =>
    {
        
            let hun_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.ducks =  hun_var;
            setTeamData(temp_name);
        
        
        
    }

    const changeInnings = (e) =>
    {
        
        
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.innings =  wti_var;
            setTeamData(temp_name);
        
        
    }

    const changeNotOuts = (e) =>
    {
        
        
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.not_outs =  wti_var;
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
        Updating Single Batsman
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


          <span>Enter Player's total innings : </span>
    <input type="number" name="innings"   min="0" value={TeamData.innings} style = {{width : "50%"}}
                                                    aria-label="innings"
                                                    title="Enter the Total innings"
                                                    placeholder="Enter the Total innings"
                                                    onChange={changeInnings}
                                                        required={true}/>

          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">


          <span>Enter total number of notOuts : </span>
    <input type="number" name="notOuts"   min="0" value={TeamData.not_outs} style = {{width : "50%"}}
                                                    aria-label="notOuts"
                                                    title="Enter the Total notOuts"
                                                    placeholder="Enter the Total number of notOuts"
                                                    onChange={changeNotOuts}
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


          <span>Enter the total Batting Runs scored : </span>
<input type="number" name="battingRuns"   min="0" value={TeamData.runs} style = {{width : "50%"}}
                                                   aria-label="battingRuns"
                                                   title="Enter the number of batting Runs"
                                                   placeholder="Enter the number of batting Runs scored"
                                                   onChange={changeBattingRuns}
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
<input type="number" name="battingaverage"   min="0" step="0.01" value={TeamData.average} style ={{width : "50%"}}
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
          <span>Enter the total number of balls faced : </span>
<input type="number" name="ballsfaced"   min="0" value={TeamData.balls_faced} style ={{width : "50%"}}
                                                   aria-label="ballsfaced"
                                                   title="Enter the number of balls faced"
                                                   placeholder="Enter the number of balls faced"
                                                   onChange={changeBallsFaced}
                                                    required={true}/>

          
          </div>
        </div>

        <div class="field">
          <div class="ui left icon input">
          <span>Enter Strike Rate: </span>
    <input type="number" name="StrikeRate"   min="0"  value={TeamData.strike_rate} style ={{width : "50%"}}
                                                    aria-label="Strike Rate"
                                                    title="Enter Strike Rate"
                                                    placeholder="Enter Strike Rate"
                                                    onChange={changeStrikeRate}
                                                        required={true}/>

          
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter Number of Fiftys completed: </span>
    <input type="number" name="Fiftys"   min="0" value={TeamData.fiftys} style ={{width : "50%"}}
                                                    aria-label="Fiftys"
                                                    title="Enter number of Fiftys"
                                                    placeholder="Enter number of Fiftys"
                                                    onChange={changefiftys}
                                                        required={true}/>

          
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter Number of Ducks </span>
    <input type="number" name="Ducks"   value={TeamData.ducks} style ={{width : "50%"}}
                                                    aria-label="Ducks"
                                                    title="Enter the number of ducks"
                                                    placeholder="Enter the number of ducks"
                                                    onChange={changeDucks}
                                                        required={true}/>


          
          </div>
        </div>

        
         <button
             type='submit'
             className='btn btn-primary btn-lg btn-block  form-control'
          >
                                  Update Batsman
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
    <div className="ui large text loader">Loading Batsman's Data</div>
  </div>
  <p></p>
  <p></p>   
  <p></p>
</div>
    );
}




        
    }

export default UpdateOneBatsman;