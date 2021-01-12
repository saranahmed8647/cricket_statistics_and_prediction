import React,{ useState, useEffect } from 'react';
import "./Toolbar.css";
import axios from "axios";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import { getFromStorage , setInStorage } from "../utils/storage"; 


const Toolbar = (props) =>
{
    const [SenderEmail, setSenderEmail ] = useState("");
    useEffect(() => 
    {
        const token2 = getFromStorage("the_main_app");

        if(token2)
    {
        const admin_session = {
            AdminSessionToken : token2.token
        }
        axios.post("http://localhost:5000/admin/getAdminFromSession",admin_session)
        .then(json =>
            {
                if(json.status === 200)
                {
                    const admin_id = {
                        AdminIDToken : json.data
                    }
                    axios.post("http://localhost:5000/admin/getAdminEmailFromId",admin_id)
                    .then(json =>
                        {
                            if(json.status === 200) 
                            {
                                setSenderEmail(json.data);
                            }
                        })
                        .catch(err =>
                            {
                                console.log(`Error getting Admin email : ${err}`);
                                
                            })
                }
            })
            .catch(err =>
                {
                    console.log(`Error getting Admin Session details : ${err}`);
                
                })
    

    }
},[])
console.log(`Sender EMail : ${SenderEmail}`);
    return(
        
    <header className="toolbar">
    <nav className="toolbar_navigation">
        <div>
            <DrawerToggleButton click={props.drawerClickHandler}/>
        </div>
            <div className="toolbar_logo" style={{marginTop:5}}>
                <a href="/" style={{fontSize:20}}>Crick App</a>
                
            </div>
            <div className="spacer" />
            <div className="toolbar_navigation-items">
                <ul>
                <li style={{fontSize:12}} ><a >{SenderEmail}</a></li>                
                    <li><a href="/mainmenu" style={{fontSize:12}}>Main Menu</a></li>
                    <li><a href="/logout" style={{fontSize:12}}>Logout</a></li>
                </ul>
            </div>
        
    </nav>
</header>
    );
}
// {(SenderEmail === "") ? (<li><a href="" style={{fontSize:12}}>{SenderEmail}</a></li>) : (null)}
export default Toolbar;