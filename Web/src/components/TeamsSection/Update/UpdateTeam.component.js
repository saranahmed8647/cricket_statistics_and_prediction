
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { getFromStorage , setInStorage } from "../../utils/storage"; 
import { useHistory } from "react-router-dom";

import "./UpdateTeam.component.css";

import Toolbar from "../../Toolbar/Toolbar.component";
import SideDrawer from "../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../Backdrop/Backdrop.component";

const UpdateTeam = () =>  
{

    const [sideDrawerOpen,setSideDrawer] = useState(false);
    const history = useHistory();

    
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
    const [ teamDataErrors, setTeamDataErrors] = useState([]);
    const [TeamsData,setTeamsData] = useState([]);


    const [name, setName] = useState("");
    const [matches, setMatches] = useState(0);
    const [won, setWon] = useState(0);
    const [lost, setLost] = useState(0);
    const [tied, setTied] = useState(0);
    const [no_result, setNoResult] = useState(0);
    const [percentage, setPercentage] = useState(0);
    

    useEffect(() =>
    {
        const token2 = getFromStorage("the_main_app");
        if(token2)
        {
            // verify token
            axios.get(`http://localhost:5000/account/verify?token=${token2.token}`)
            // .then(res =>res.json())
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


        // Getting teams
    axios.get('http://localhost:5000/team')
    //   .then(res =>res.data.JSON())
        .then(json =>
            {   
                if(json.status === 200)
                {
                    let fetched_data = json.data;
                    setTeamsData(fetched_data);
                    
                }
            })
      .catch(function (error) {
        alert("Failed to get Teams Data, going to main menu");
        history.push("/mainmenu");
      });






    },[]);



    const TeamHandler = (e) => 
    {
        e.preventDefault();
        
        console.log(`The final name is ${name}`);
        if (name.trim() ==="" 
        || matches == 0 || won ==0 || lost ==0 || tied ==0 || no_result ==0 || percentage ==0) 
        {
            setTeamDataErrors([...teamDataErrors,"All fields must be filled"]);
        } else if (name.length < 3) {
            setTeamDataErrors([...teamDataErrors,"Team name must be greater than 3 characters"]);
        }
        else if(won + lost + tied + no_result > matches)
        {
            setTeamDataErrors([...teamDataErrors,"The matches won/lost/tied/noResult can't be more than the total matches played"]);
        }
        else {
            const team_data = 
            {
                name: name,
                matches :matches,
                won: won,
                lost:lost,
                tied:tied,
                no_result:no_result,
                percentage:percentage
                
            }
            axios.post('http://localhost:5000/team/update', team_data)
                .then(json =>
                    {   
                        if(json.status === 200)
                        {
                            
                            setName("");
                            setMatches(0);
                            setLost(0);
                            setWon(0);
                            setTied(0);
                            setNoResult(0);
                            setPercentage(0);
                            alert("Team Updated successfully !");
                            history.push("/mainmenu");
                        }
                    })
              .catch(function (error) {
                setTeamDataErrors([...teamDataErrors,error]);
              });
            }       
    };



    const changeName = (e) =>
    {
        
            var name_var = e.target.value;
           setName(name_var);

           console.log(`The name is : ${name_var}`);
        
        
    }


    const changeMatches = (e) =>
    {
        
            var match_var = Number(e.target.value);
            setMatches(match_var);
        
        
    }

    const changeWon = (e) =>
    {
        
            var won_var = Number(e.target.value);
            setWon(won_var);

        
        
    }

    const changeLost = (e) =>
    {
        
            var lost_var = Number(e.target.value);
            setLost(lost_var);
            
        
    }

    const changeTied = (e) =>
    {
        
            var tied_var = Number(e.target.value);
            setTied(tied_var);
        
        
    }

    const changeNoResult = (e) =>
    {
        
            var noresult_var = Number(e.target.value);
            setNoResult(noresult_var);
        
        
    }

    const changePercentage = (e) =>
    {
        
            var percentage_var = Number(e.target.value);
            setPercentage(percentage_var);
        
        
    }


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
        
        
        <div>
        <div style={{height:"100%"}}>
                <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
                <SideDrawer show={sideDrawerOpen}/>
                {backdrop_var}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        
        
        
        
        <div class="ui middle aligned center aligned grid">
          <div class="column">
            <h2 class="ui image header">
              <div class="content">
              Please Update a Team's Data
              </div>
            </h2>
            <form action="post" onSubmit={TeamHandler} class="ui large form">
              <div className="ui stacked secondary  segment">
                <div className="field">
                  <div className="ui left icon input">
                  
                       
    <select onChange={changeName} value={name}>
    {TeamsData.map(key => (
      <option key={key.name} value = {key.name}  >{key.name}</option>
    ))}
    </select>


                  </div>
                  <br />
                  <br />
                  <div className="ui left icon input">
                  
                  <span>Enter total matches played : </span>
                   
                 <span>&nbsp;</span>   
                 <span>&nbsp;</span>   
                 
            <input type="number" name="matches"   min="0" value={matches}
                                                            aria-label="matches"
                                                            title="Enter the Total Matches Played by this Team"
                                                            placeholder="Enter the Total Matches Played by this Team"
                                                            onChange={changeMatches}
                                                                required={true}/>
        
        
                  </div>
                  <br />
                  <br />
                  <div className="ui left icon input">
                  
                  <span>Enter the total matches won : </span>          
                   
            
                  <span>&nbsp;</span>   
                 
                 
        <input type="number" name="won"   min="0" value={won}
                                                           aria-label="won"
                                                           title="Enter the number of matches this Team has won"
                                                           placeholder="Enter the number of matches this Team has won"
                                                           onChange={changeWon}
                                                            required={true}/>
        
        
        
        
                  </div>
                  
                  <br />
                  <br />
                  <div className="ui left icon input">
                  
                  <span>Enter the total matches lost : </span>
                   
                  <span>&nbsp;</span>   
              
                  
        <input type="number" name="lost"   min="0" value={lost}
                                                           aria-label="lost"
                                                           title="Enter the number of matches that this Team has lost"
                                                           placeholder="Enter the number of matches that this Team has lost"
                                                           onChange={changeLost}
                                                            required={true}/>
        
        
        
                  </div>
                  <br />
                  <br />
                  <div className="ui left icon input">
                  <span>Enter the total matches tied : </span>          
                   
                  <span>&nbsp;</span>   
        
        <input type="number" name="tied"   min="0" value={tied}
                                                           aria-label="tied"
                                                           title="Enter the number of matches that this Team has tied"
                                                           placeholder="Enter the number of matches that this Team has tied"
                                                           onChange={changeTied}
                                                            required={true}/>
        
        
                  </div>
                  <br />
                  <br />
                  <div className="ui left icon input">
        
                  <span>Enter the total matches without any results : </span>          
                   
        
        <input type="number" name="no_result"   min="0" value={no_result}
                                                           aria-label="no_result"
                                                           title="Enter the number of matches without any results that this Team has played"
                                                           placeholder="Enter the number of matches without any results that this Team has played"
                                                           onChange={changeNoResult}
                                                            required={true}/>
        
        
        
                  </div>
                  <br />
                  <br />
                  <div className="ui left icon input">
        
                  <span>Enter the team's winning percentage : </span>
        
                   
        
        
        <input type="number" name="percentage"  step="0.01" min="0" value={percentage}
                                                           aria-label="percentage"
                                                           title="Enter the winning percentage of this team"
                                                           placeholder="Enter the winning percentage of this team"
                                                           onChange={changePercentage}
                                                            required={true}/>
        
        
                  </div>
                  <br />
                  <br />
                </div>
                
                
                 <button
                     type='submit'
                     className='btn btn-primary btn-lg btn-block  form-control'
                  >
                  Update Team
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
            
          </div>
        </div>
        
        
        </div>
                
    );
}

export default UpdateTeam; 
