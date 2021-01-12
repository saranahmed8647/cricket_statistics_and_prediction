import React,{ useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Toolbar from "../Toolbar/Toolbar.component";
import SideDrawer from "../SideDrawer/SideDrawer.component";
import { getFromStorage , setInStorage, removeFromStorage  } from "../utils/storage"; 

// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../Backdrop/Backdrop.component";

import "./ProfileMain.component.css";

const AddAdminAccount = () =>
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

            axios.post('http://localhost:5000/admin/getAdminbyEmail', Email1.trim())
            .then(user =>
            {
                // console.log(user.data);
                if(user.data.length < 1)
                {
                    console.log("No admin account exists");
                    // Adding new Admin
                    axios.post('http://localhost:5000/admin/register', admin)
                    .then(json =>{
                        if(json.status === 200)
                        {
                            alert("New Admin successfully added, now Going to Main Menu");
                            history.push("/mainmenu");
                        }
                    })
                    .catch(err =>
                        {
                            alert("Error adding Admin to the DB, Going back to Main Menu");
                            history.push("/mainmenu");
                        })
                }
                else
                {
                    console.log(user.data.length);
                    alert("Admin Already exists , going to Main Menu");
                    history.push("/mainmenu");
                }
            }
            )
                .catch(err =>
                    {
                        alert("Error deleting Account details, going To Main Menu");
                        history.push("/mainmenu");
                    });
            

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
        Welcome Admin, Please Enter The Credentials for the new Admin Account
      </div>
    </h2>
    <form action="post" onSubmit={LoginHandler} class="ui large form">
      <div class="ui stacked secondary  segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
                     <input type="email" name="email1" value={Email1}
                                                    aria-label="email"
                                                    title="Enter The Admin's Email"
                                                    placeholder = "Enter The Admin's Email"
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
                                                    placeholder = "Enter The Admin's Password"
                                                    aria-label="password"
                                                    required={true}/>

          </div>
        </div>
         <button
             type='submit'
             className='btn btn-primary btn-lg btn-block  form-control'
          >Add New Admin
          </button>
      </div>

      

    </form>

    
  </div>
</div>

</div>
    );

}

export default AddAdminAccount;