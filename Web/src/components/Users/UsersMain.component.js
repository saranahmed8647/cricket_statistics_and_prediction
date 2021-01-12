import React,{ useState, useEffect } from "react";
import axios from "axios";
import { getFromStorage , setInStorage } from "../utils/storage"; 
import { useHistory } from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar.component";
import SideDrawer from "../SideDrawer/SideDrawer.component";
import Backdrop from "../Backdrop/Backdrop.component";
const UserMain = () =>
{

    
    const history = useHistory();
    
    const [sideDrawerOpen,setSideDrawer] = useState(false);
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
                        if(json.status === 200)
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

// Getting All Users
    axios.get('http://localhost:5000/account/allUsers')
            //   .then(res =>res.data.JSON())
                .then(json =>
                    {   
                        if(json.status === 200)
                        {
                            let fetched_data = json.data;
                            setTeamsData(json.data);
                            
                        }
                    })
              .catch(function (error) {
                alert("Failed to get User's data, going to main menu");
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
          <p>You can't View the Users without being logged in, Please Log in</p>
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
    
        return(<div>
            {/* {TeamsData.map(team =>
            (
              <div style={{display : "flex" , justifyContent : "space-around" , flexDirection : "column", alignItems:'center'}}>
                
                <button style={{width: "100%"}} className="ui inverted primary button" onClick={() =>{history.push(`/UserDetail/${team.email}`)}}><strong>{team.name}</strong></button>
                <br />
                </div>
            ))} */}
            <div style={{height:"100%"}}>

<Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}
        
        <br />
        <br />
        <br />
        <br />

      <div style={{display:"flex",flexDirection : "column",alignItems:'center'}}>
      {TeamsData.map(team =>
      (                        
          <div>
              <button style={{fontSize:15,color:'#00b36b',outline:'none',backgroundColor:'Transparent'}} onClick={() =>{history.push(`/UserDetail/${team.email}`)}}><strong>{team.name}</strong></button>
              <hr />
          </div>
      ))}
      </div>




      </div>
        </div>);
    




}

export default UserMain; 