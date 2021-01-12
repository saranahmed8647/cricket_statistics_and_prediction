
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { getFromStorage , setInStorage } from "../../utils/storage"; 
import { useHistory } from "react-router-dom";

import Toolbar from "../../Toolbar/Toolbar.component";
import SideDrawer from "../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../Backdrop/Backdrop.component";

import "./AddMultipleTeams.component.css";
const AddMultipleTeams = () =>  
{


    const history = useHistory();
    
    
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
    const [ teamDataErrors, setTeamDataErrors] = useState([]);
    const [sideDrawerOpen,setSideDrawer] = useState(false);


    const [name, setName] = useState("");
    

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
        e.preventDefault();
        
        if (name.trim() ==="") 
        {
            setTeamDataErrors([...teamDataErrors,"Please Fill the file name"]);
        }
        else if(name.length < 3)
        {
            setTeamDataErrors([...teamDataErrors,"File name should have atleast 3 characters"]);
        }
        else {
            const team_data = 
            {
                name: name
            }
            axios.post('http://localhost:5000/team/addFile', team_data)
            //   .then(res =>res.data.JSON())
                .then(json =>
                    {   
                        if(json.status == 200)
                        {
                            
                            setName("");
                            
                            alert("Teams added successfully !");
                            history.push("/mainmenu");
                        }
                    })
              .catch(function (error) {
                setTeamDataErrors([...teamDataErrors,error]);
              });
            }       
    };



    const changeName = (e) =>
    {
        
            var name_var = e.target.value;
            setName(name_var);
        
        
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
      Enter the File Name containing the Teams Data,<strong>without .csv</strong>
      </div>
    </h2>
    <form action="post" onSubmit={TeamHandler} class="ui large form">
      <div className="ui stacked secondary  segment">
        <div className="field">
          <div className="ui left icon input">
            <i className="user icon"></i>
            <input type="text" name="name" value={name}
                                                   aria-label="name"
                                                   title="Enter the File name with Team data"
                                                   placeholder="Enter the File's Name"
                                                   onChange={changeName}
                                                    required={true}/>
          </div>
        </div>
        
         <button
             type='submit'
             className='btn btn-primary btn-lg btn-block form-control'
          >
          Add Teams
          </button>
      
      </div>



    </form>
    <div class="ui error message">
    {
        
            (teamDataErrors.length > 0) ? (<p>{teamDataErrors.map((item, index) => (
         <p>{item}</p>
      ))}</p>) : (null)
        }
    
    </div>
    
  </div>
</div>


</div>

//         <div>
//         <form action="post" onSubmit={TeamHandler}>
//         <span>Enter the File Name containing the Teams Data, without .csv: </span>
//         <input type="text" name="name" value={name}
//                                                    aria-label="name"
//                                                    title="Enter the File name with Team data"
//                                                    placeholder="Enter the File's Name"
//                                                    onChange={changeName}
//                                                     required={true}/>
// <br />

        
// <button
//             type='submit'
//             className='btn btn-lg  form-control'
//             style={{background: '#A9A9A9', color: 'white', height: 35}}
//         >
//             Add Teams
//         </button>

//         </form>
        
      
    );
}

export default AddMultipleTeams; 
