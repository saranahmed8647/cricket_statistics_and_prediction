import React,{ useState, useEffect } from "react";
// import { createBrowserHistory as history} from 'history';
import { useHistory } from "react-router-dom";
import { getFromStorage , setInStorage } from "../../../utils/storage"; 

import Toolbar from "../../../Toolbar/Toolbar.component";
import SideDrawer from "../../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../../Backdrop/Backdrop.component";




const ViewbatsmenMain = () =>
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
        
        <div style={{flexDirection:'column',border:'1.5px solid #e6e6e6',marginTop:100,marginLeft:'30%',width:'40%',display:'flex',flex:1,alignItems:'center',position:'fixed'}}>
            <p style={{marginTop:20, color:'#b3003b',fontSize:18}}>Would you like to see Single Batsman or  Multiple?</p>   
            <button style={{background:"purple",marginBottom:10,fontSize:15,fontWeight:'bold',width:'70%'}} className="ui purple basic button" onClick={() => history.push('/viewSingleBatsman') }>View Single Batsman</button>
            <button style={{background:"purple",marginBottom:30,fontSize:15,fontWeight:'bold',width:'70%'}} className="ui purple basic button" onClick={() => history.push('/viewMultiplebatsmen') }>View Multiple Batsmen</button>
        </div>
    </div>
);        


}
        


export default ViewbatsmenMain;