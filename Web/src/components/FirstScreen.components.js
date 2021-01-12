import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";


// import { createBrowserHistory as history} from 'history';
import { useHistory } from "react-router-dom";


import Toolbar from "./Toolbar/Toolbar.component";
import SideDrawer from "./SideDrawer/SideDrawer.component";
// The screen to be shown after login in FirstScreen
import FirstOption from "./FirstScreen/FirstOptions.component";

// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "./Backdrop/Backdrop.component";
import { Prev } from "react-bootstrap/esm/PageItem";



const FirstScreen = () =>
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
        
        <div>
        <FirstOption />
        </div>
    </div>
);        


}
        


export default FirstScreen;