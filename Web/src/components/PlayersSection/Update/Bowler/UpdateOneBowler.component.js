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

const UpdateOneBowler = (props) =>
{
    const [sideDrawerOpen,setSideDrawer] = useState(false);

    const history = useHistory();

    const[TeamData, setTeamData] = useState({});
    const [torender , settoRender] = useState(false);

    const [ teamDataErrors, setTeamDataErrors] = useState([]);

    
    const [wicketkeeper, setwicketkeeper] = useState(false);
    
    
    

    useEffect(() =>
    {

        
    const name = props.match.params.name;
    const body_data = {
        name:name
    }

    axios.post("http://localhost:5000/player/bowlers/one",body_data)
    .then(json =>
        {   
            if(json.status === 200)
            {
                var fetched_data = json.data[0];
                setTeamData(fetched_data);    
                
            }
        })
  .catch(function (error) {
    alert("Failed to get Bowler's Data, going to main menu");
    
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
        || TeamData.matches === 0 || TeamData.span.startingYear === 0 || TeamData.span.endingYear === 0) 
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
                balls_delivered : TeamData.balls_delivered,
                runs_conceded: TeamData.runs_conceded,
                wickets: TeamData.wickets,
                best_figures:{
                    best_runs: TeamData.best_figures.runs,
                    best_wickets: TeamData.best_figures.wickets
                },
                bowling_average : TeamData.bowling_average,
                economy: TeamData.economy,
                bowling_strikerate: TeamData.bowling_strikerate,
                four_wickets: TeamData.four_wickets,
                five_wickets: TeamData.five_wickets

            }

            axios.post('http://localhost:5000/player/bowlers/update', team_data)
                .then(json =>
                    {   
                        if(json.status === 200)
                        {
                            
                            alert("Bowler Updated successfully !");
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
        
            let name_var = e.target.value;
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
    const changeWicketkeeper = (e) =>
    {
        
            let ot_var = e.target.value;
            setwicketkeeper(ot_var);
        
    }
    const changeInnings = (e) =>
    {
        
        
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.innings =  wti_var;
            setTeamData(temp_name);
        
        
    }
    
    const changeBallsDelivered = (e) =>
    {
        
        
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.balls_delivered =  wti_var;
            setTeamData(temp_name);
        
        
    }

    const changeRUnsConceded = (e) =>
    {
        
        
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.runs_conceded =  wti_var;
            setTeamData(temp_name);
        
        
    }

    const changeWickets = (e) =>
    {
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.wickets =  wti_var;
            setTeamData(temp_name);
        
    }

    const changeBestRuns = (e) =>
    {
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.best_figures.runs =  wti_var;
            setTeamData(temp_name);
        
    }

    const changeBestWickets = (e) =>
    {
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.best_figures.wickets =  wti_var;
            setTeamData(temp_name);
        
    }

    const changeBowlingAverage = (e) =>
    {
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.bowling_average =  wti_var;
            setTeamData(temp_name);
        
    }

    const changeEconomy = (e) =>
    {
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.economy =  wti_var;
            setTeamData(temp_name);   
    }

    const changeBowlingStrikeRate = (e) =>
    {
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.bowling_strikerate =  wti_var;
            setTeamData(temp_name);   
    }

    const changeFOurwickets = (e) =>
    {
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.four_wickets =  wti_var;
            setTeamData(temp_name);   
    }

    const changeFiveWIckets = (e) =>
    {
            let wti_var = Number(e.target.value);
            
            let temp_name = {...TeamData};
            temp_name.five_wickets =  wti_var;
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
        Updating Single Bowler
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

          <span>Enter total number of balls delivered : </span>
    <input type="number" name="ballsdelivered"   min="0" value={TeamData.balls_delivered} style = {{width : "50%"}}
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
<input type="number" name="Runsconceded"   min="0" value={TeamData.runs_conceded} style = {{width : "50%"}}
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
<input type="number" name="WicketsTaken"   min="0" value={TeamData.wickets} style = {{width : "50%"}}
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
          
<br/>
<span>Enter the runs taken for the best figures : </span>
    <input type="number" name="bestfiguresruns"   min="0" value={TeamData.best_figures.runs} style = {{width : "50%"}}
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

<input type="number" name="bestfigureswickets"   min="0" value={TeamData.best_figures.wickets} style = {{width : "50%"}}
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
<input type="number" name="bowlingaverage"   min="0" step="0.01" value={TeamData.bowling_average} style ={{width : "50%"}}
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
<input type="number" name="economy"   min="0" step="0.01" value={TeamData.economy} style ={{width : "50%"}}
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
<input type="number" name="bowlingstrikerate"   min="0" value={TeamData.bowling_strikerate} style ={{width : "50%"}}
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
    <input type="number" name="fourwickets"   min="0"  value={TeamData.four_wickets} style ={{width : "50%"}}
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
    <input type="number" name="fivewickets"   min="0" value={TeamData.five_wickets} style ={{width : "50%"}}
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
            Update Bowler
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

    <br/><br/><br/><br/><br/><br/><br/>
    
  </div>
</div>

   </div>);
}

else
{
    return(
        
        <div className="ui segment">
  <div className="ui active inverted dimmer">
    <div className="ui large text loader">Loading Bowler's Data</div>
  </div>
  <p></p>
  <p></p>   
  <p></p>
</div>
    );
}

    }

export default UpdateOneBowler;