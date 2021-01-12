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

const AddSingleAllrounder = () =>
{
    


    const history = useHistory();
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
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
        const token2 = getFromStorage("the_main_app");
        if(token2)
        {
            // verify token
            axios.get(`http://localhost:5000/admin/verify?token=${token2.token}`)
                .then(json =>
                    {
                        if(json.status == 200)
                        {
                            console.log("Token verification successful");
                            setToken(token2.token);
                        }
                        else
                        {
                            console.log("Token verification failed");
                            setLoginStatus(1);
                            
                        }
                    })
            
        }
        else
        {
            // no token
            setLoginStatus(2);
        }

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
        
        if (name.trim() ==="" || country.trim() ==="" 
        || matches == 0 || startingYear === 0 || endingYear === 0 || battingRuns === 0 ||
        highestRuns === 0 || battingAverage === 0 || hundreds === 0 || wickets === 0 || bestFigureRuns === 0 || bestFigureWickets === 0 || bowlingAverage === 0 || fiveWickets === 0
        || averageDifference === 0) 
        {
            setTeamDataErrors([...teamDataErrors,"All fields must be filled"]);
        } else if (name.length < 5) {
            setTeamDataErrors([...teamDataErrors,"Player name must be greater than 5 characters"]);
        }
        else {
            const team_data = 
            {
                name: name.trim(),
                country:country.trim(),
                wicket_keeper :wicketkeeper,
                span:{
                    starting_year : startingYear ,
                    ending_year: endingYear
                },

                
                matches:matches,
                batting_runs:battingRuns,
                highest_score:{
                    highest_runs :highestRuns,
                    out:outStatusForHighestScore
                }
                ,
                batting_average:battingAverage,
                hundreds:hundreds,
                wickets:wickets,
                best_figures:
                {
                    runs :bestFigureRuns,
                    wickets:bestFigureWickets
                },
                bowling_average:bowlingAverage,
                five_wickets:fiveWickets,
                average_difference:averageDifference
                
                
            }
            axios.post('http://localhost:5000/player/allrounders/addone', team_data)
                .then(json =>
                    {   
                        if(json.status == 200)
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
            setName(name_var);
        
        
    }
    const changeCountry = (e) =>
    {
        
            var co_var = e.target.value;
            setCountry(co_var);
        
        
    }
    const changeWicketkeeper = (e) =>
    {
        
            var wi_var = e.target.value;
            setwicketkeeper(wi_var);
        
        
    }
    const changeStartingYear = (e) =>
    {
        
            var st_var = Number(e.target.value);
            setstartingYear(st_var);
        
        
    }
    const changeEndingYear = (e) =>
    {
        
            var en_var = Number(e.target.value);
            setendingYear(en_var);
        
        
    }




    const changeMatches = (e) =>
    {
        
            var match_var = Number(e.target.value);
            setmatches(match_var);
        
        
    }
    const changeBattingRuns = (e) =>
    {
        
            var bat_var = Number(e.target.value);
            setbattingRuns(bat_var);
        
    }
    const changeHighestRuns = (e) =>
    {
        
            var hi_var = Number(e.target.value);
            sethighestRuns(hi_var);
        
    }
    const changeoutStatus = (e) =>
    {
        
            var ot_var = e.target.value;
            setoutStatusForHighestScore(ot_var);
        
    }

    const changeBattingAverage = (e) =>
    {
        
            var batav_var = Number(e.target.value);
            setbattingAverage(batav_var);

        
        
    }

    const changeHundreds = (e) =>
    {
        
            var hun_var = Number(e.target.value);
            sethundreds(hun_var);
            
        
    }

    const changeWicketsTaken = (e) =>
    {
        
            var wti_var = Number(e.target.value);
            setwickets(wti_var);
        
        
    }

    const changebestFIgureRuns = (e) =>
    {
        
            var runb_var = Number(e.target.value);
            setbestFigureRuns(runb_var);
        
        
    }

    const changeBestFIgureWickets = (e) =>
    {
        
            var befiw_var = Number(e.target.value);
            setbestFigureWickets(befiw_var);
        
        
    }
    const changeBowlingAverage = (e) =>
    {
        
            var bowav_var = Number(e.target.value);
            setbowlingAverage(bowav_var);
        
        
    }
    
    const changeFiveWIckets = (e) =>
    {
        
            var fiwv_var = Number(e.target.value);
            setfiveWickets(fiwv_var);
        
        
    }
    
    const changeAverageDIfference = (e) =>
    {
        
            var avdiv_var = Number(e.target.value);
            setaverageDifference(avdiv_var);
        
        
    }
    
// rendering add team page according to login status

if(loginStatus === 1)
{
    // Token not verified

return(

    <div className="ui grid middle aligned segment red inverted" style={{height: "100%", margin: "0"}}>
  <div className="ui column center aligned">
    <div className="ui inverted statistic">
      <div className="value">401</div>
      <div className="label">UnAuthorized Access</div>
    </div>

    <div className="ui message red inverted">
      <div class="header">Description : </div>
      <p>You can't add a team without being logged in, Please Log in</p>
    </div>
    <button className="fluid ui button"><a href='/login'>Log in</a></button>
    
  </div>
</div>
    
);
    
}
else if(loginStatus === 2)
{
    // Not logged in, directly accessing
    return(

        <div className="ui grid middle aligned segment red inverted" style={{height: "100%", margin: "0"}}>
      <div className="ui column center aligned">
        <div className="ui inverted statistic">
          <div className="value">401</div>
          <div className="label">UnAuthorized Access</div>
        </div>
    
        <div className="ui message red inverted">
          <div class="header">Description : </div>
          <p>This Page Cannot be accessed without being Logged in</p>
        </div>
        <button className="fluid ui button"><a href='/login'>Log in</a></button>
        
      </div>
    </div>
        
    );
}



// If user is properly logged in

    return (

        <div style={{height:"100%"}}>
        <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}

<br />
<br />
<br />
<br />
<br />


<div class="ui middle aligned center aligned grid" style={{width: "100%",height:'100%',position:'fixed',overflowY:'scroll'}}>
  <div class="column">
    <h2 class="ui image header">
      <div class="content">
        Add Single All-rounder
      </div>
    </h2>
    <form action="post" onSubmit={TeamHandler} class="ui large form">
      <div class="ui stacked secondary  segment">
        <div class="field">
          <div class="ui left icon input">
          <span>Enter Name </span>
            
            
         <span>&nbsp;</span>   
         <span>&nbsp;</span>   
         <span>&nbsp;</span>   
         <span>&nbsp;</span>   
         <span>&nbsp;</span>   
         <span>&nbsp;</span>   
         <span>&nbsp;</span>   
         <span>&nbsp;</span>   
         <input type="text" name="name" value={name} style ={{width : "50%"}}
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
           
           <span>&nbsp;</span>   
           <span>&nbsp;</span>   
           
          <input type="text" name="country" value={country} style ={{width : "50%"}}
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
    <input type="number" name="startingyear"   min="0" value={startingYear} style = {{width : "50%"}}
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
    <input type="number" name="endingyear"   min="0" value={endingYear} style = {{width : "50%"}}
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
    <input type="number" name="matches"   min="0" value={matches} style = {{width : "50%"}}
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
<input type="number" name="battingRuns"   min="0" value={battingRuns} style = {{width : "50%"}}
                                                   aria-label="battingRuns"
                                                   title="Enter the number of batting Runs"
                                                   placeholder="Enter the number of batting Runs scored"
                                                   onChange={changeBattingRuns}
                                                    required={true}/>
          </div>
        </div>
        
        <div class="field">
          <div class="ui left icon input">
          <p>The Player's Highest score : </p>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter his highest scored runs : </span>
    <input type="number" name="highestruns"   min="0" value={highestRuns} style = {{width : "50%"}}
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
<input type="number" name="battingaverage"   min="0" step="0.01" value={battingAverage} style ={{width : "50%"}}
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
<input type="number" name="Hundreds"   min="0" value={hundreds} style ={{width : "50%"}}
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
<input type="number" name="wickets"   min="0" value={wickets} style ={{width : "50%"}}
                                                   aria-label="wickets"
                                                   title="Enter the number of wickets taken"
                                                   placeholder="Enter the number of wickets taken"
                                                   onChange={changeWicketsTaken}
                                                    required={true}/>

          </div>
        </div>

        <div class="field">
          <div class="ui left icon input">
          <p>The Player's Best Bowling Figures : </p>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter his Runs given for the best figure</span>
    <input type="number" name="bestFigureRUns"   min="0" value={bestFigureRuns} style ={{width : "50%"}}
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
    <input type="number" name="bestfigureWickets"   min="0" value={bestFigureWickets} style ={{width : "50%"}}
                                                    aria-label="bestfigureWickets"
                                                    title="Enter the wickets taken for best figure"
                                                    placeholder="Enter the wickets taken for best figure"
                                                    onChange={changeBestFIgureWickets}
                                                        required={true}/>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter Bowling Average: </span>
    <input type="number" name="BowlingAverage"   min="0" step="0.01" value={bowlingAverage} style ={{width : "50%"}}
                                                    aria-label="BowlingAverage"
                                                    title="Enter Bowling Average"
                                                    placeholder="Enter Bowling Average"
                                                    onChange={changeBowlingAverage}
                                                        required={true}/>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter Number of five wickets taken: </span>
    <input type="number" name="fivewickets"   min="0" value={fiveWickets} style ={{width : "50%"}}
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
    <input type="number" name="averagedifference"  step = "0.01" value={averageDifference} style ={{width : "50%"}}
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
          Add All-rounder
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
    <br /><br /><br /><br /><br /><br /><br /><br />
    
  </div>
</div>
    
  </div>

    );
}
        


export default AddSingleAllrounder;