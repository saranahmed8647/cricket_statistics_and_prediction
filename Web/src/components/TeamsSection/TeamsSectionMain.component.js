import React,{ useState, useEffect } from "react";
// import { createBrowserHistory as history} from 'history';
import { useHistory } from "react-router-dom";
import { getFromStorage , setInStorage } from "../utils/storage"; 

import Toolbar from "../Toolbar/Toolbar.component";
import SideDrawer from "../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../Backdrop/Backdrop.component";
import { colors } from "@material-ui/core";




const TeamSectionMain = () =>
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
        
 
        <div style={{marginTop:100,marginLeft:'30%',width:'40%',display:'flex',flex:1,alignItems:'center',position:'fixed',flexDirection:'column',border:'1.5px solid #e6e6e6'}}>
            <div> <img style={{height:50,width:100,marginTop:10,marginBottom:10}} src={require('../../images/team.png')} /></div>
            <button style={{background:"purple",marginBottom:10,fontSize:15,fontWeight:'bold',width:'70%'}} className="ui purple basic button" onClick={() => history.push('/addTeams')}>Add Teams</button>
            <button style={{background:"purple",marginBottom:10,fontSize:15,fontWeight:'bold',width:'70%'}} className="ui purple basic button" onClick={() => history.push('/viewTeams')}>View Teams</button>
            <button style={{background:"purple",marginBottom:10,fontSize:15,fontWeight:'bold',width:'70%'}} className="ui purple basic button" onClick={() => history.push('/UpdateTeams')}>Update Team</button>
            <button style={{background:"purple",marginBottom:30,fontSize:15,fontWeight:'bold',width:'70%'}} className="ui purple basic button" onClick={() => history.push('/removeTeams')} >Remove Teams</button>
        </div>
        
    </div>
);        


}
        
export default TeamSectionMain;