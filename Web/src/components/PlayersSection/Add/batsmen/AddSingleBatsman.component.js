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

const AddSingleBatsman = () =>
{
    


    const history = useHistory();
    
    
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
    const [innings, setinnings] = useState(0);
    const [notOuts, setnotOuts] = useState(0);
    const [battingRuns, setbattingRuns] = useState(0);
    // Highest score
    const [highestRuns, sethighestRuns] = useState(0);
    const [outStatusForHighestScore, setoutStatusForHighestScore] = useState(true);
    
    const [battingAverage, setbattingAverage] = useState(0);
    const [ballsFaced, setballsFaced] = useState(0);
    const [strikeRate, setstrikeRate] = useState(0);
    const [hundreds, sethundreds] = useState(0);
    const [fiftys, setfiftys] = useState(0);
    const [ducks, setducks] = useState(0);
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    
    
    

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



    const TeamHandler = (e) => 
    {
        e.preventDefault();
        
        if (name.trim() ==="" || country.trim() ==="" 
        || matches == 0 || startingYear === 0 || endingYear === 0 || battingRuns === 0 || innings === 0 ||
        notOuts === 0 || ballsFaced === 0 || strikeRate === 0  ||
        highestRuns === 0 || battingAverage === 0 ) 
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
                innings: innings,
                not_outs: notOuts,
                runs:battingRuns,
                highest_score:{
                    highest_runs :highestRuns,
                    out:outStatusForHighestScore
                }
                ,
                average:battingAverage,
                balls_faced: ballsFaced,
                strike_rate:strikeRate,
                hundreds:hundreds,
                fiftys:fiftys,
                ducks:ducks
                
            }
            axios.post('http://localhost:5000/player/batsmen/addone', team_data)
                .then(json =>
                    {   
                        if(json.status == 200)
                        {
                            
                            setName("");
                            setmatches(0);
                            setCountry("");
                            setstartingYear(0);
                            setendingYear(0);
                            setinnings(0);
                            setnotOuts(0);
                            setbattingRuns(0);
                            sethighestRuns(0);
                            setbattingAverage(0);
                            setballsFaced(0);
                            setstrikeRate(0);
                            sethundreds(0);
                            setfiftys(0);
                            setducks(0);
                            alert("batsman added successfully !");
                            history.push("/mainmenu");
                        }
                    })
              .catch( error => {
                setTeamDataErrors([...teamDataErrors,"Error Adding the batsman to the database"]);
              });
            }       
    };


    
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
    const changeInnings = (e) =>
    {
        
            var in_var = Number(e.target.value);
            setinnings(in_var);
        
        
    }
    const changeNotOuts = (e) =>
    {
        
            var nt_var = Number(e.target.value);
            setnotOuts(nt_var);
        
        
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

    const changeBallsFaced = (e) =>
    {
        
            var bfi_var = Number(e.target.value);
            setballsFaced(bfi_var);
        
        
    }

    

    
    const changeStrikeRate = (e) =>
    {
        
            var stkr_var = Number(e.target.value);
            setstrikeRate(stkr_var);
        
        
    }
    
    const changefiftys = (e) =>
    {
        
            var fif_var = Number(e.target.value);
            setfiftys(fif_var);
        
        
    }
    
    const changeDucks = (e) =>
    {
        
            var duk_var = Number(e.target.value);
            setducks(duk_var);
        
        
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
        Adding Single Batsman
      </div>
    </h2>
    <form action="post" onSubmit={TeamHandler} class="ui large form">
      <div class="ui stacked secondary  segment">
        <div class="field">
          <div class="ui left icon input">
          <span>Enter the Player's Name : </span>
        
            
            
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
        
           <span>&nbsp;</span>   
           <span>&nbsp;</span>   
           
           
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
          <p>The Player's playing span : </p>
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
          <span>Enter Player's total innings : </span>
    <input type="number" name="innings"   min="0" value={innings} style = {{width : "50%"}}
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
    <input type="number" name="notOuts"   min="0" value={notOuts} style = {{width : "50%"}}
                                                    aria-label="notOuts"
                                                    title="Enter the Total notOuts"
                                                    placeholder="Enter the Total number of notOuts"
                                                    onChange={changeNotOuts}
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
          <span>Enter the total number of balls faced : </span>
<input type="number" name="ballsfaced"   min="0" value={ballsFaced} style ={{width : "50%"}}
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
    <input type="number" name="StrikeRate"   min="0"  value={strikeRate} style ={{width : "50%"}}
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
    <input type="number" name="Fiftys"   min="0" value={fiftys} style ={{width : "50%"}}
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
    <input type="number" name="Ducks"   value={ducks} style ={{width : "50%"}}
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
            Add Batsman
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

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    
  </div>
</div>

</div>
    );
}
        


export default AddSingleBatsman;