import React,{ useState, useEffect } from "react";
import axios from "axios";
import { getFromStorage , setInStorage } from "../../../utils/storage"; 
import { useHistory } from "react-router-dom";

import Toolbar from "../../../Toolbar/Toolbar.component";
import SideDrawer from "../../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../../Backdrop/Backdrop.component";



const UpdateByNameMain = () =>  
{


    const history = useHistory();
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
    const [ teamDataErrors, setTeamDataErrors] = useState([]);


    const [name, setName] = useState("");
    const [PlayerCategory, setPlayerCategory] = useState("");
    

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



    const TeamHandler = (e) => 
    {
        e.preventDefault();
        
        if (name ==="") 
        {
            setTeamDataErrors([...teamDataErrors,"Player's name must be filled"]);
        } else if (name.length < 5) {
            setTeamDataErrors([...teamDataErrors,"Player name must be greater than 5 characters"]);
        }
        
        else {
            const team_data = 
            {
                name: name.trim()   
            }
            

            if(PlayerCategory === "batsmen")
            {
                history.push(`/UpdateOneBatsman/${name}`);
            }
            else if(PlayerCategory === "bowlers")
            {
                history.push(`/UpdateOneBowler/${name}`);
            }
            else
            {
                history.push(`/UpdateOneAllrounder/${name}`);
            }
            
            
            }       
    };



    const changeName = (e) =>
    {
        
            let name_var = e.target.value;
            setName(name_var);
        
        
    }
    const changeCategory = (e) =>
    {
        
        let name_var2 = e.target.value;
           setPlayerCategory(name_var2);

        
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
 

// rendering  page according to login status

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
        <div style={{height:"100%"}}>
        <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}
        
        
<br />
<br />
<br />
<br/>
<br/>

<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui image header">
      <div class="content">
      Enter the Player's information that you'd like to Update 
      </div>
    </h2>
    <form action="post" onSubmit={TeamHandler} class="ui large form">
      <div class="ui stacked secondary  segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="name" value={name}
                                                   aria-label="name"
                                                   title="Enter the Player's Name"
                                                   placeholder="Enter the Player's Name"
                                                   onChange={changeName}
                                                    required={true}/>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            
<span style={{fontSize:13}}>Choose the Player's category: </span>
<select style={{fontSize:13}} value={PlayerCategory} onChange={changeCategory}>
  <option key="A" value = {"batsmen"}  >Batsmen</option>
  <option key="B" value = {"bowlers"}  >Bowlers</option>
  <option key="C" value = {"allrounders"}>All rounders</option>
</select>

          </div>
        </div>
         <button
             type='submit'
             className='btn btn-primary btn-lg btn-block  form-control'
          >Update Player
          </button>
      </div>

      <div class="ui error message"></div>

    </form>

    <div class="ui message">
      Enter Player Name and select category to move to Update Screen
    </div>
  </div>
</div>
        </div>
    );
}

export default UpdateByNameMain; 
