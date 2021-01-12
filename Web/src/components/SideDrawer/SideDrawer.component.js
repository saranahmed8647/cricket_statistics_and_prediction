import React from 'react';
import "./SideDrawer.css";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
const SideDrawer = (props) =>
{
    let drawerClasses = "side-drawer";
    // prop comes from firstscreen
    if(props.show)
    {
        // Open when sidedrawer is clicked
        drawerClasses = "side-drawer open";
    }

    return(
        <nav className={drawerClasses}>
            <ul>
                <div style={{display:'flex',flex:2,flexDirection:'row', marginTop:50}}>
                    <AccountCircleOutlinedIcon 
                        style={{color:'white', marginTop:15,height:40,width:40}}
                    />
                    <li style={{marginTop:20,marginLeft:10}}><a href="/profile">Profile</a></li>
                </div>

                <div style={{display:'flex',flex:2,flexDirection:'row'}}>
                    <GroupOutlinedIcon style={{color:'white', marginTop:15,height:40,width:40}}/>
                    <li style={{marginTop:20,marginLeft:10}}><a href="/userMain">Users</a></li>
                </div>
                <div style={{display:'flex',flex:2,flexDirection:'row'}}>
                    <ReportOutlinedIcon style={{color:'white', marginTop:15,height:40,width:40}}/>
                    <li style={{marginTop:20,marginLeft:10}}><a href="/Allcomplaint">Complaints</a></li>
                </div>
        
                
            </ul>
        </nav>
    );

};

export default SideDrawer;