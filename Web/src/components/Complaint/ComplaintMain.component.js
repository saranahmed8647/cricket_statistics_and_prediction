import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Alert } from 'react-bootstrap';
// import { createBrowserHistory as history} from 'history';
import { useHistory } from "react-router-dom";
import { getFromStorage , setInStorage } from "../utils/storage"; 

import Toolbar from "../Toolbar/Toolbar.component";
import SideDrawer from "../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../Backdrop/Backdrop.component";




const ComplaintMain = () =>
{
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    const history = useHistory();
    
    useEffect(() =>
    {
        
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



return(
    <div style={{height:"100%"}}>
        <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}
        
        
        <button className="ui inverted violet button" onClick={() => history.push('/Allcomplaint')}>View Complaints</button>
        <button className="ui inverted violet button" onClick={() => history.push('#')}>Search for Complaint by user Email</button>

    </div>
);        


}
        


export default ComplaintMain;