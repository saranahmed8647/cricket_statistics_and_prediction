import React,{ useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getFromStorage , setInStorage } from "../../../utils/storage"; 

import Toolbar from "../../../Toolbar/Toolbar.component";
import SideDrawer from "../../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../../Backdrop/Backdrop.component";

const PlayersByCountryList = (props) =>
{
 
  const [sideDrawerOpen,setSideDrawer] = useState(false);
    const history = useHistory();
    
    
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
    const [BatsmenData,setBatsmenData] = useState([]);
    const [BowlerData,setBowlerData] = useState([]);
    const [AllrounderData,setAllrounderData] = useState([]);
    const [TeamsData,setTeamsData] = useState([]);

    const [torender , settoRender] = useState(false);

    var BowlerData2 = [];
    var BatsmanData2 = [];
    var AllrounderData2 = [];
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

        const name = props.match.params.name;
        
      
    
        const body_data = {
            name:name
        }
        axios.post("http://localhost:5000/team/team",body_data)
        .then(json =>
          {
            if(json.status === 200)
            {
              if(json.data.length < 1)
              {
                alert("Wrong Country Name entered, going back to Main Menu");
                history.push("/mainmenu");

              }
              else
              {
                axios.post("http://localhost:5000/player/allrounders/ByCountry",body_data)
        .then(json =>
            {   
                if(json.status == 200)
                {
                    var fetched_data = json.data;
                    setAllrounderData(fetched_data);    
                    console.log(`allrounder saved`);
                    AllrounderData2 = json.data;
                  }
            })
      .catch(function (error) {
        alert("Failed to get Players data, going to main menu");
        
        history.push("/mainmenu");
      });
    
    
      axios.post("http://localhost:5000/player/bowlers/ByCountry",body_data)
        .then(json =>
            {   
                if(json.status == 200)
                {
                    var fetched_data = json.data;
                    setBowlerData(fetched_data);    
                    console.log(`bowlers saved`);
                    BowlerData2 = json.data;
                  }
            })
      .catch(function (error) {
        alert("Failed to get Players data, going to main menu");
        
        history.push("/mainmenu");
      });
    
    
      axios.post("http://localhost:5000/player/batsmen/ByCountry",body_data)
        .then(json =>
            {   
                if(json.status == 200)
                {
                    var fetched_data = json.data;
                    setBatsmenData(fetched_data);    
                    console.log(`Batsmen saved`);
                    BatsmanData2 = json.data;
                  }
            })
      .catch(function (error) {
        alert("Failed to get Players data, going to main menu");
        
        history.push("/mainmenu");
      });
    

              }
            }
          })
          .catch(function (error) {
            alert("Failed to get Teams Data, going to main menu");
            history.push("/mainmenu");
          });
        
    
      
    // TO DO FROM HERE
    
    
    // BowlerData2.map(item =>
    //   {
    //     item.category = "Bowler";
    //   });
    
    //   BatsmanData2.map(item =>
    //   {
    //     item.category = "Batsman";
    //   });
    
    // AllrounderData2.map(item =>
    //   {
    //     item.category = "Allrounder";
    //   });
    
    //   setTeamsData(AllrounderData2.concat(BatsmanData2,BowlerData2));

      setTimeout(() => {
        settoRender(true); 
     }, 23000);
   
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
if(torender)
{
  
  return(
    <div style={{height:"100%"}}>
    
        <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}
    <br />
    <br />
    <div>
  <h1>Batsmen : </h1>
    {BatsmenData.map(team =>
    (
      <div style={{display : "flex" , justifyContent : "space-around" , flexDirection : "column", alignItems:'center'}}>
        
        
        <button  style={{width: "100%"}} className="ui inverted primary button" onClick={() =>{history.push(`/batsmenDetails/${team.name}`)}}><strong>{team.name}</strong></button>
        <br/>
        <br/>
        </div>
    ))}
  </div>
  <br />
  <div>
  <h1>Bowlers : </h1>
    {BowlerData.map(team =>
    (
      <div style={{display : "flex" , justifyContent : "space-around" , flexDirection : "column", alignItems:'center'}}>
        
        
        <button  style={{width: "100%"}} className="ui inverted primary button" onClick={() =>{history.push(`/bowlersDetails/${team.name}`)}}><strong>{team.name}</strong></button>
        <br/>
        <br/>
        </div>
    ))}
  </div>
  <br />
  <br />
  <br />
  <div>
  <h1>Allrounders : </h1>
    {AllrounderData.map(team =>
    (
      <div style={{display : "flex" , justifyContent : "space-around" , flexDirection : "column", alignItems:'center'}}>
        
        
        <button  style={{width: "100%"}} className="ui inverted primary button" onClick={() =>{history.push(`/AllroundersDetails/${team.name}`)}}><strong>{team.name}</strong></button>
        <br/>
        <br/>
        </div>
    ))}
  </div>  <br />

  
</div>);


}
else
{

    return(
        <div className="ui segment">
    <div className="ui active inverted dimmer">
      <div className="ui large text loader">Loading Player's Data</div>
    </div>
    <p></p>
    <p></p>   
    <p></p>
  </div>

    );

}

    
    }
    
export default PlayersByCountryList;