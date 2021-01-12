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

const ViewPlayerByCountry = () =>
{

    
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    const history = useHistory();
    
    
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
    const [name, setName] = useState("");
    const [TeamData, setTeamData] = useState({});

    const [ teamDataErrors, setTeamDataErrors] = useState([]);

    const Countries_List = ["Ireland","East African Federation","Bermuda","New Zealand","West Indies","England",
                            "Bangladesh","Nepal" , "Canada" , "Afghanistan" , "Kenya" , "India" ,
                            "Pakistan" , "United States of America" , "Australia" , "Hong Kong" , "Scotland",
                            "Netherland" ,"Zimbabwe","Sri Lanka","United Arab Emirates","Oman","South Africa",
                            "Namibia" , "Papua New Guinea" , "Kenya"]
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
      <p>You can't View players by country without being logged in, Please Log in</p>
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


// Getting teams

const changeName = (e) =>
{
    var temp_name = e.target.value;
    setName(temp_name);
    setTeamDataErrors([]);
}

const TeamHandler = (e) =>
{


    e.preventDefault();
        
    if (name ==="") 
    {
        setTeamDataErrors([...teamDataErrors,"Please Fill the Country's name"]);
    }
    else if (name.length < 4 ) 
    {
        setTeamDataErrors([...teamDataErrors,"Name should be atleast 4 characters long"]);
    }
    else if (!Countries_List.includes(name.trim())) 
    {
        setTeamDataErrors([...teamDataErrors,"Wrong country name entered, please check again"]);
    }
    else {
        history.push(`/Hideandshow/${name.trim()}`)
}
}

    return(
        <div style={{height:"100%"}}>
        <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}
    <br />
    <br />
    <br />
    <br />
    <br />

    <div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui image header">
      <div class="content">
        Searching for Players by Country Name
      </div>
    </h2>
    <form action="post" onSubmit={TeamHandler} class="ui large form">
      <div class="ui stacked secondary  segment">
        <div class="field">
          <div class="ui left icon input">
          <span style={{fontSize:13}}>Enter the country's name whose players you'd like to see : </span>
          
          <input type="text" name="name" value={name}
                                                   aria-label="name"
                                                   title="Enter the Country's name"
                                                   placeholder="Enter Country's Name"
                                                   onChange={changeName}
                                                    required={true}/>
          </div>
        </div>
        
         <button
             type='submit'
             className='btn btn-primary btn-lg btn-block  form-control'
          >Search for Players
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

export default ViewPlayerByCountry;