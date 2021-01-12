import React,{ useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Toolbar from "../Toolbar/Toolbar.component";
import SideDrawer from "../SideDrawer/SideDrawer.component";
import { getFromStorage , setInStorage } from "../utils/storage"; 

// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../Backdrop/Backdrop.component";

import "./ProfileMain.component.css";

const ProfileMain = () =>
{
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    const history = useHistory();

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
          <p>You can't Access Profile page without being logged in, Please Log in</p>
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
    <br />
    <br />
    <br />

<div className="body">
    <div className="container">
        <div className="vertical-center">

            <div><img style={{height:150,width:150}} src={require('../../images/profile.png')} /></div>
            <div><button style={{background:"blue",fontSize:20}} className="ui blue basic button" onClick={() => history.push('/ProfileUpdate')} ><strong>Update Account Details</strong></button></div>
            <br />
            <br />
            
            <div><button style={{background:"purple",fontSize:20}} className="ui purple basic button" onClick={() => history.push('/ProfileDelete')} ><strong>Delete Account !</strong></button></div>
            <br />
            <br />
            <div><button style={{background:"green",fontSize:20}} className="ui green basic button" onClick={() => history.push('/AddAdminAccount')} ><strong>Add New Admin Account</strong></button></div>
            <br />
            
         
        </div> 
    </div>

</div>
        </div>
    );

}

export default ProfileMain;