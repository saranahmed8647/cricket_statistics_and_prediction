import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { getFromStorage , setInStorage, removeFromStorage } from "./utils/storage"; 


import Toolbar from "./Toolbar/Toolbar.component";
import SideDrawer from "./SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "./Backdrop/Backdrop.component";
const Logout = () =>
{
    const [token, setToken] = useState("");
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    
    const history = useHistory();


    useEffect(() =>
    {
        const token2 = getFromStorage("the_main_app");
        
        
        if(token2)
        {
            //Logout
            axios.get(`http://localhost:5000/admin/logout?token=${token2.token}`)
            
                .then(json =>
                    {
                        if(json.status === 200)
                        {
                            console.log("user logged out");
                            setToken(token2.token);
                            removeFromStorage("the_main_app");
                            
                        }
                        else
                        {
                            console.log("Fail to logout");
                            alert("you are not logged in");
                            history.push("/");
                            
                        }
                    })
            
        }
        else
        {
            // no token
            alert("you are not logged in");
            history.push("/");
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


if(token)
{
    return(
        

<div style={{height:"100%"}}>


        <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}

<br />
<br />
<br />
<br />




<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui image header">
      <div class="content">
      
      
      <p>Successfully logged out</p>
      </div>
    </h2>
    
      <div className="ui stacked secondary  segment">
        <div className="field">
          <div className="ui left icon input">
           
            
           
          </div>
        </div>
        
         <button
             
             className='btn btn-primary btn-lg btn-block  form-control'
             
          ><a style={{color:'#fff',textDecoration:'none'}} href="/">Return To Home Screen</a>
          </button>
  
      </div>



    
    
    
  </div>
</div>


</div>
    )
}

else
{
    return(
        <div style={{height:"100%"}}>


        <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}

<br />
<br />
<br />
<br />

        <div className="ui grid middle aligned segment red inverted" style={{height: "100%", margin: "0", display: 'flex',  justifyContent:'center', alignItems:'center'}}>
  <div className="ui column center aligned">
    <div className="ui inverted statistic">
      <div className="value">Logout</div>
      <div className="label">Error</div>
    </div>

    <div className="ui message red inverted">
      <div class="header">Description : </div>
      <p>Failed to log Admin out</p>
    </div>
    <button className="fluid ui button"><a href="/">Return To Home Screen</a></button>
    
  </div>
  </div>
</div>)   
}






}

export default Logout;