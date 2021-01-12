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

const AddSingleBowler = () =>
{
    


    const history = useHistory();
    
    
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
    const [ teamDataErrors, setTeamDataErrors] = useState([]);
    const [sideDrawerOpen,setSideDrawer] = useState(false);

    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [wicketkeeper, setwicketkeeper] = useState(false);
    // Span
    const [startingYear, setstartingYear] = useState(0);
    const [endingYear, setendingYear] = useState(0);
    
    const [matches, setmatches] = useState(0);
    const [innings, setinnings] = useState(0);
    const [ballsDelivered, setballsDelivered] = useState(0);
    const [runsConceded, setrunsConceded] = useState(0);
    
    const [wickets, setwickets] = useState(0);

    // Best Figures
    const [bestRuns, setbestRuns] = useState(0);
    const [bestWickets, setbestWickets] = useState(0);
    
    const [bowlingAverage, setbowlingAverage] = useState(0);
    const [economy, seteconomy] = useState(0);
    const [bowlingStrikerate, setbowlingStrikerate] = useState(0);
    const [fourWickets, setfourWickets] = useState(0);
    const [fiveWickets, setfiveWickets] = useState(0);
    
    
    
    

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
        || matches === 0 || startingYear === 0 || endingYear === 0 ||  innings === 0  
        || ballsDelivered === 0 || runsConceded === 0 || wickets === 0  || bestRuns === 0 || bestWickets === 0 || bowlingAverage === 0 
        || economy === 0 || bowlingStrikerate === 0 || fourWickets === 0 || fiveWickets === 0) 
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
                balls_delivered : ballsDelivered,
                runs_conceded: runsConceded,
                wickets: wickets,
                best_figures:{
                    best_runs: bestRuns,
                    best_wickets: bestWickets
                },
                bowling_average : bowlingAverage,
                economy: economy,
                bowling_strikerate: bowlingStrikerate,
                four_wickets: fourWickets,
                five_wickets: fiveWickets

            }
            axios.post('http://localhost:5000/player/bowlers/addone', team_data)
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
                            setballsDelivered(0);
                            setrunsConceded(0);
                            setwickets(0);
                            setbestRuns(0);
                            setbestWickets(0);
                            setbowlingAverage(0);
                            seteconomy(0);
                            setbowlingStrikerate(0);
                            setfourWickets(0);
                            setfiveWickets(0);
                            alert("bowler added successfully !");
                            history.push("/mainmenu");
                        }
                    })
              .catch( error => {
                setTeamDataErrors([...teamDataErrors,"Error Adding the Bowler to the database"]);
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
    const changeBallsDelivered = (e) =>
    {
        
            var bd_var = Number(e.target.value);
            setballsDelivered(bd_var);
        
        
    }
    const changeRUnsConceded = (e) =>
    {
        
            var rc_var = Number(e.target.value);
            setrunsConceded(rc_var);

        
    }
    const changeWickets = (e) =>
    {
        
            var wk_var = Number(e.target.value);
            setwickets(wk_var);
        
    }

    const changeBestRuns = (e) =>
    {
        
            var brt_var = e.target.value;
            setbestRuns(brt_var);
        
    }

    const changeBestWickets = (e) =>
    {
        
            var wtk_var = Number(e.target.value);
            setbestWickets(wtk_var);


        
        
    }

    const changeBowlingAverage = (e) =>
    {
        
            var bww_var = Number(e.target.value);
            setbowlingAverage(bww_var);

            
        
    }

    const changeEconomy = (e) =>
    {
        
            var eco_var = Number(e.target.value);
            seteconomy(eco_var);
        
        
    }

    

    
    const changeBowlingStrikeRate = (e) =>
    {
        
            var bstkr_var = Number(e.target.value);
            setbowlingStrikerate(bstkr_var);
        
        
    }
    
    const changeFOurwickets = (e) =>
    {
        
            var fov_var = Number(e.target.value);
            setfourWickets(fov_var);
        
        
    }
    
    const changeFiveWIckets = (e) =>
    {
        
            var fiv_var = Number(e.target.value);
            setfiveWickets(fiv_var);
        
        
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









<div class="ui middle aligned center aligned grid" style={{width: "100%",height:'100%',position:'fixed',overflowY:'scroll'}}>
  <div class="column">
    <h2 class="ui image header">
      <div class="content">
        Add Single Bowler
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
          <span>Enter total number of balls delivered : </span>
    <input type="number" name="ballsdelivered"   min="0" value={ballsDelivered} style = {{width : "50%"}}
                                                    aria-label="ballsdelivered"
                                                    title="Enter the Total balls delivered"
                                                    placeholder="Enter the Total number of balls delivered"
                                                    onChange={changeBallsDelivered}
                                                        required={true}/>

          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter the total Runs conceded : </span>
<input type="number" name="Runsconceded"   min="0" value={runsConceded} style = {{width : "50%"}}
                                                   aria-label="Runs conceded"
                                                   title="Enter the number of Runs conceded"
                                                   placeholder="Enter the number of Runs conceded"
                                                   onChange={changeRUnsConceded}
                                                    required={true}/>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter the total Wickets Taken : </span>
<input type="number" name="WicketsTaken"   min="0" value={wickets} style = {{width : "50%"}}
                                                   aria-label="Wickets Taken"
                                                   title="Enter the number of Wickets Taken"
                                                   placeholder="Enter the number of Wickets Taken"
                                                   onChange={changeWickets}
                                                    required={true}/>
                                                    
                                                              </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <p>The Player's Best bowling figures : </p>                                                    
                                                              
                                                              </div>

        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter the runs taken for the best figures : </span>
    <input type="number" name="bestfiguresruns"   min="0" value={bestRuns} style = {{width : "50%"}}
                                                    aria-label="best figures"
                                                    title="Enter the runs for the best figures"
                                                    placeholder="Enter the runs for the best figures"
                                                    onChange={changeBestRuns}
                                                        required={true}/>

                                                              
                                                              </div>

        </div>
        
        <div class="field">
          <div class="ui left icon input">

          <span>Enter the number of wickets taken for the best figures : </span>
<br />
<input type="number" name="bestfigureswickets"   min="0" value={bestWickets} style = {{width : "50%"}}
                                                    aria-label="best figures wickets"
                                                    title="Enter the wickets taken for the best figures"
                                                    placeholder="Enter the wickets taken for the best figures"
                                                    onChange={changeBestWickets}
                                                        required={true}/>
                                                              
                                                              </div>

        </div>
        
        
        <div class="field">
          <div class="ui left icon input">

          <span>Enter the Player's bowling average : </span>
<input type="number" name="bowlingaverage"   min="0" step="0.01" value={bowlingAverage} style ={{width : "50%"}}
                                                   aria-label="bowling average"
                                                   title="Enter the bowling average of player"
                                                   placeholder="Enter the bowling average of player"
                                                   onChange={changeBowlingAverage}
                                                    required={true}/>
                                                              
                                                              </div>

        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter the Player's economy : </span>
<input type="number" name="economy"   min="0" step="0.01" value={economy} style ={{width : "50%"}}
                                                   aria-label="economy"
                                                   title="Enter the Palyer's economy"
                                                   placeholder="Enter the Palyer's economy"
                                                   onChange={changeEconomy}
                                                    required={true}/>                                                              
                            </div>

        </div>
        
        <div class="field">
          <div class="ui left icon input">
          <span>Enter the bowling strike rate : </span>
<input type="number" name="bowlingstrikerate"   min="0" value={bowlingStrikerate} style ={{width : "50%"}}
                                                   aria-label="bowling strike rate"
                                                   title="Enter the bowling strike rate"
                                                   placeholder="Enter the bowling strike rate"
                                                   onChange={changeBowlingStrikeRate}
                                                    required={true}/>

                            </div>

        </div>
        <div class="field">
          <div class="ui left icon input">
          <span>Enter Number of four wickets taken: </span>
    <input type="number" name="fourwickets"   min="0"  value={fourWickets} style ={{width : "50%"}}
                                                    aria-label="four wickets"
                                                    title="Enter number of four wickets taken"
                                                    placeholder="Enter number of four wickets taken"
                                                    onChange={changeFOurwickets}
                                                        required={true}/>

                            </div>

        </div>
        
        <div class="field">
          <div class="ui left icon input">
          <span>Enter Number of five wickets taken: </span>
    <input type="number" name="fivewickets"   min="0" value={fiveWickets} style ={{width : "50%"}}
                                                    aria-label="five wickets"
                                                    title="Enter number of five wickets taken"
                                                    placeholder="Enter number of five wickets taken"
                                                    onChange={changeFiveWIckets}
                                                        required={true}/>

                            </div>

        </div>
        
        
  


         <button
             type='submit'
             className='btn btn-primary btn-lg btn-block  form-control'
          >
            Add Bowler
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
    <br /><br /><br /><br />
    
  </div>
</div>

        </div>
    );
}
        


export default AddSingleBowler;