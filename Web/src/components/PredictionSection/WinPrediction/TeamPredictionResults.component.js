import React,{ useState, useEffect } from "react";
import axios from "axios";
import { getFromStorage , setInStorage } from "../../utils/storage"; 
import { useHistory } from "react-router-dom";

import Toolbar from "../../Toolbar/Toolbar.component";
import SideDrawer from "../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../Backdrop/Backdrop.component";



const TeamPredictionResult = (props) =>  
{


    const history = useHistory();
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    const[TeamData, setTeamData] = useState("");
    const[TeamData2, setTeamData2] = useState("");
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
    const [ teamDataErrors, setTeamDataErrors] = useState([]);


    const [Team_1_name, setTeam1Name] = useState("");
    const [Team_2_name, setTeam2Name] = useState("");
    const [Venue_name, setVenueName] = useState("");
    
    const [torender , settoRender] = useState(false);

    useEffect(() =>
    {
        const token2 = getFromStorage("the_main_app");
        if(token2)
        {
            // verify token
            axios.get(`http://localhost:5000/admin/verify?token=${token2.token}`)
            // .then(res =>res.json())
                .then(json =>
                    {
                        if(json.status === 200)
                        {
                            console.log("Token verification successful");
                            setToken(token2.token);

                            let team_1_temp = props.location.team_data.Team1;
                            let team_2_temp = props.location.team_data.Team2;
                            let venue_temp = props.location.team_data.Venue;
                            
                            setTeam1Name(team_1_temp);
                            setTeam2Name(team_2_temp);
                            setVenueName(venue_temp);

                            console.log(`Team 1 : ${team_1_temp}`);
                            console.log(`Team 2 : ${team_2_temp}`);
                            console.log(`Venue : ${venue_temp}`);

                            const body_data = 
                            {
                                Team1: team_1_temp,
                                Team2: team_2_temp,
                                Venue : venue_temp
                            }

    axios.post("http://localhost:5000/predict/team",body_data,{timeout : 55000})
    .then(json =>
        {   
            if(json.status === 200)
            {
                var fetched_data = json.data;
                setTeamData(json.data);    
                // console.log(`Gotten Data : ${JSON.stringify(json.data)}`);
                console.log(`Gotten Data : ${JSON.stringify(json)}`);
                axios.post("http://localhost:5000/predict/teamPercentage",body_data,{timeout : 50000})
                .then(json =>
                  {
                    if(json.status === 200)
                    {
                      setTeamData2((json.data * 100).toFixed(3));
                      
                      console.log(`Gotten Data : ${JSON.stringify(json)}`);    
                    }

                  })
                  .catch(function (error) {
                    alert("Failed to get Prediction results, going to main menu");
                    
                    history.push("/mainmenu");
                  })
            }
        })
  .catch(function (error) {
    alert("Failed to get Prediction results, going to main menu");
    
    history.push("/mainmenu");
  });

  setTimeout(() => {
     settoRender(true); 
  }, 52000);

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
 

// rendering  page according to login status

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
      <p>You can't View match predictions without being logged in, Please Log in</p>
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
else
{
    
// If user is properly logged in
if(torender)
{
  console.log(`Final Data : ${JSON.stringify(TeamData)}`);
    return (
        <div style={{height:"100%"}}>

        <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}
        <br />
        <br />
        <br />

        <div class='card' style={{padding:'5%', margin:'1%',width: '95%', textAlign:'center'}}>

<table id="customers">
  <tr>
  
        
    <th style={{textAlign:'center'}}>Match : </th>
    <th  style={{textAlign:'center'}}>{Team_1_name}  Vs . {Team_2_name}</th>
  </tr>
  <tr>
  
    <td>Venue : </td>
    <td>{Venue_name}</td>
  </tr>
  <tr>
  
    <td>Winner : </td>
    <td>{TeamData}</td>
  </tr>
  
  <tr>
  
    <td>Winning Percentage : </td>
    <td>{TeamData2}</td>
  </tr>
  


</table>

</div>    
      </div>
      )

}
else
{
    return(
        
        <div className="ui segment">
  <div className="ui active inverted dimmer">
    <div className="ui large text loader">Loading Match Prediction Results</div>
  </div>
  <p></p>
  <p></p>   
  <p></p>
</div>
    );
}
}

}

export default TeamPredictionResult; 
