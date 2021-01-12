import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Alert } from 'react-bootstrap';
// import { createBrowserHistory as history} from 'history';
import { useHistory } from "react-router-dom";
import { getFromStorage , setInStorage } from "./utils/storage"; 
import FirstScreen from "../components/FirstScreen.components";

// This is the screen that will appear after home screen
// This will take user to first screen if they're logged in, else
// They'll be taken to login page

import Login from "./login.components";

const MainMenu = () =>
{
    const [isLoading, setLoading] = useState(true);
    
    const [token, setToken] = useState("");
    
    const history = useHistory();
    // var attempt;
    // attempt = getFromStorage("the_main_app_login_attempt");
    useEffect(() =>
    {
        const token2 = getFromStorage("the_main_app");
        const loading_variable = getFromStorage("the_main_app_loading");
        
        setLoading(loading_variable.loading_variable);
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
                            setLoading(false);
                        }
                        else
                        {
                            console.log("Token verification failed");
                            setLoading(false);
                        }
                    })
            
        }
        else
        {
            // no token
            setLoading(false);
        }

    },[]);

    
    
    
    if(isLoading && token.length > 1)
    {
        
        return(
        
        <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'center',marginTop:'15%'}}>
            <div class="card" style={{display:'flex',flex:1,flexDirection:'column',alignItems:'center',width:'70%'}}>
                <p style={{marginTop:50, color:'#b3003b',fontSize:30}}>WAIT!!!. You must be logged in to the application to access this page.</p>
                <form style={{marginBottom:50}}>
                    <Button style={{width:'25rem',fontSize:18}} class="btn btn-primary btn-lg btn-block" onClick={() => history.push('/login')}>Log in</Button>
                </form>        
            </div>
        </div>

        
        
        
        );
    }
    if(!token)
    {
        return(

            <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'center',marginTop:'15%'}}>
                <div style={{display:'flex',flex:1,flexDirection:'column',border:'1.5px solid #e6e6e6',alignItems:'center',width:'70%'}}>
                    <p style={{marginTop:50, color:'#b3003b',fontSize:30}}>Welcome to CRICTELLIGENCE. Please Log-in to application.</p>
                    <form style={{marginBottom:50}}>
                        <Button style={{width:'25rem',fontSize:18}} class="btn btn-primary btn-lg btn-block" onClick={() => history.push('/login')}>Log in</Button>
                    </form>        
                </div>
            </div>
        
        );
    }
    // If user logged in, take him to the first screen
    return(
            <div>
                <FirstScreen />
            </div>);

    

}

export default MainMenu;