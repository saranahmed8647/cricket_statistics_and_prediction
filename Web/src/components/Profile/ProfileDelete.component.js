import React,{ useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Toolbar from "../Toolbar/Toolbar.component";
import SideDrawer from "../SideDrawer/SideDrawer.component";
import { getFromStorage , setInStorage, removeFromStorage  } from "../utils/storage"; 

// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../Backdrop/Backdrop.component";

import "./ProfileMain.component.css";

const ProfileDelete = () =>
{
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    const history = useHistory();
    const [Email1, setEmail1] = useState("");
    const [Password1, setPassword1] = useState("");
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
                        if(json.status === 200)
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

  
  axios.get("http://localhost:5000/admin/getAllAdmin")
  .then(json =>
    {
      if(json.data.length > 1)
      {
        console.log("Multiple Admins Exist");
      }
      else if(json.data.length === 1)
      {
        alert("There is only 1 Admin in DB right now, Add another admin if you want to delete this one, Going Back to Main Menu");
        history.push("/mainmenu");
      }
    })
    .catch(err =>
      {
        console.log(`Error occured getting Admin details : ${err}`);
      })
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

    const changeEmail1 = (e) =>
    {
        let value = e.target.value;
        value = value.toLowerCase();

        setEmail1(value);

    }

    const changePassword1 = (e) =>
    {
        let value = e.target.value;
        

        setPassword1(value);

    }


    const LoginHandler = (e) =>
    {
        e.preventDefault();

        const admin = 
            {
                email : Email1.trim(),
                password : Password1.trim()
                
            }

            axios.post('http://localhost:5000/admin/checklogin', admin)
            .then(user =>
            {
                console.log("Log in verified");
                axios.post('http://localhost:5000/admin/delete', admin)
                .then(user =>
                {
                    alert("Your account has been successfully deleted");
                    removeFromStorage("the_main_app");
                    history.push("/mainmenu");
                })
                .catch(err =>
                    {
                        alert("Error deleting Account, going To Main Menu");
                        history.push("/mainmenu");
                    });
                


            })
            .catch(err =>
                {
                    alert("Wrong credentials, can't delete account");
                    history.push("/mainmenu");
                })


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
          <p>You can't Access Profile Deletion page without being logged in, Please Log in</p>
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
    

else
{
  
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
  
  
          <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui image header">
        <div class="content">
          Welcome Admin, Please Enter your Credentials to delete your Account, 
          <strong>This act is irreversible !!!!!!!!!</strong>
        </div>
      </h2>
      <form action="post" onSubmit={LoginHandler} class="ui large form">
        <div class="ui stacked secondary  segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
                       <input type="email" name="email1" value={Email1}
                                                      aria-label="email"
                                                      title="Enter your Current Email"
                                                      placeholder = "Enter your Current Email"
                                                      onChange={changeEmail1}
                                                       required={true}/>
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password1" value={Password1}
                                                      onChange={changePassword1}
                                                      pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
                                                      title="Password must contain UpperCase, LowerCase, Number/SpecialChar and min 8 Chars"
                                                      placeholder = "Enter your Current Password"
                                                      aria-label="password"
                                                      required={true}/>
  
            </div>
          </div>
           <button
               type='submit'
               className='btn btn-primary btn-lg btn-block  form-control'
            >Delete Account
            </button>
        </div>
  
        
  
      </form>
  
      
    </div>
  </div>
  
  </div>
      );
  

}

  
}

export default ProfileDelete;