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

const UpdateAllroundersMain = () =>
{
 
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    
    
    const history = useHistory();
    
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
    const [TeamsData,setTeamsData] = useState([]);


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

// Getting allrounders
    axios.get('http://localhost:5000/player/allrounders')
            
                .then(json =>
                    {   
                        if(json.status == 200)
                        {
                            let fetched_data = json.data;
                            setTeamsData(fetched_data);
                            
                        }
                    })
              .catch(function (error) {
                alert("Failed to get allrounders Data, going to main menu");
                history.push("/mainmenu");
              });




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
      <p>You can't Update an Allrounder without being logged in, Please Log in</p>
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

    return(
    <div style={{height:"100%"}} >
        
        <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}
        <br />
        <br />
        <br />

        <div style={{display:"flex",flexDirection : "column",alignItems:'center'}}>
            {TeamsData.map(team =>
            (                        
                <div>
                    <button style={{fontSize:15,color:'#00b36b',outline:'none',backgroundColor:'Transparent'}} onClick={() =>{history.push(`/UpdateOneAllrounder/${team.name}`)}}><strong>{team.name}</strong></button>
                    <hr />
                </div>
            ))}
            </div>
        </div>
    );

}

export default UpdateAllroundersMain;