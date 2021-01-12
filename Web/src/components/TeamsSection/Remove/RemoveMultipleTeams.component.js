
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { getFromStorage , setInStorage } from "../../utils/storage"; 
import { useHistory } from "react-router-dom";


import Toolbar from "../../Toolbar/Toolbar.component";
import SideDrawer from "../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../Backdrop/Backdrop.component";

const RemoveMultipleTeams = () =>  
{


    const history = useHistory();
    
    
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    

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

    },[]);

const TeamHandler = (e) =>
{
    axios.delete('http://localhost:5000/team/delete')
                .then(json =>
                    {   
                        if(json.status == 200)
                        {
                            
                            alert("All Teams removed successfully !");
                            history.push("/mainmenu");
                            
                        }
                    })
              .catch(function (error) {
                alert("Failed to delete Teams !");
                history.push("/mainmenu");
              });
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
      
      <span>Are you sure you want to delete data of all Teams ? <br /> </span>
        <span><strong>This action cannot be undone.</strong>  </span>
        
      </div>
    </h2>
        
         <button
             type='submit'
             onClick={TeamHandler}
             className='btn btn-primary btn-lg btn-block  form-control'
          >
          Delete All Teams
          </button>

    
</div>
</div>
        </div>
    );
}

export default RemoveMultipleTeams; 
