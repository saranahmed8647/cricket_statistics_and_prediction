import React,{ useState, useEffect } from 'react';

import axios from "axios";
import { useHistory } from "react-router-dom";
import { getFromStorage , setInStorage, removeFromStorage  } from "../utils/storage"; 


import Backdrop from "../Backdrop/Backdrop.component";
import Toolbar from "../Toolbar/Toolbar.component";
import SideDrawer from "../SideDrawer/SideDrawer.component";

const ProfileUpdate = () =>
{
    const [sideDrawerOpen,setSideDrawer] = useState(false);

    const history = useHistory();

    
    const [torender , settoRender] = useState(false);
    const [loginStatus,setLoginStatus] = useState(0);
    const [ teamDataErrors, setTeamDataErrors] = useState([]);
    const[TeamData, setTeamData] = useState({});
    const[CorrectLogin, setCorrectLogin] = useState(false);

    const [Email1, setEmail1] = useState("");
    const [Password1, setPassword1] = useState("");
    const [Email2, setEmail2] = useState("");
    const [Password2, setPassword2] = useState("");
    const [Password3, setPassword3] = useState("");
    
    useEffect(() =>
    {
        const token2 = getFromStorage("the_main_app");
        if(token2)
        {
            
            axios.get(`http://localhost:5000/admin/verify?token=${token2.token}`)
            
                .then(json =>
                    {
                        if(json.status == 200)
                        {
                            console.log("Token verification successful");
                            
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

    const changeEmail2 = (e) =>
    {
        let value = e.target.value;
        value = value.toLowerCase();

        setEmail2(value);

    }

    const changePassword2 = (e) =>
    {
        let value = e.target.value;
        

        setPassword2(value);

    }
    const changePassword3 = (e) =>
    {
        let value = e.target.value;
        

        setPassword3(value);

    }

    const LoginHandler =(e)=>
    {
        console.log("Function running");
        e.preventDefault();
        if (Email1.trim() ==="" 
        || Email2.trim() ==="" || Password1.trim() === "" || Password2.trim() === "" || Password3.trim() === "" ) 
        {
            setTeamDataErrors([...teamDataErrors,"All fields must be filled"]);
        }
        else if (Password1.length < 8 || Password2.length < 8 || Password3.length < 8) {
            setTeamDataErrors([...teamDataErrors,"Password entered was too short, minimum length can be 8 characters"]);
        }
        else if (Password2 !== Password3) {
            setTeamDataErrors([...teamDataErrors,"New Password and Confirm password must be same "]);
        }else
        {

        console.log("Else ran");
        const admin = 
            {
                email : Email1.trim(),
                password : Password1.trim()
                
            }

            axios.post('http://localhost:5000/admin/checklogin', admin)            
                .then(json =>
                    {   if(json.status === 200)
                      {
                          console.log("Logged in correctly, now changing credentials");
                      const token2 = getFromStorage("the_main_app");
                      const admin2 = 
                      {
                          email : Email2.trim(),
                          password : Password3.trim(),
                      }
                      
                      axios.post('http://localhost:5000/admin/delete', admin)
                      .then(user =>
                      {
                      if(user.status === 200)
                      {
                        axios.get(`https://cricktelligence.herokuapp.com/admin/logout?token=${token2.token}`)
                        .then(json =>
                            {
                                if(json.status === 200)
                                {
                                    console.log("user logged out");
                                    removeFromStorage("the_main_app");

                                    

axios.post('http://localhost:5000/admin/register', admin2)
.then(json =>
{   
if(json.status === 200)
{
alert("Account details changed");
console.log("New account created");

setEmail1("");
setPassword1("");
setEmail2("");
setPassword2("");
setPassword3("");                
history.push("/");
}
})
.catch(err =>
    {
        alert("Error Adding New Details to DB");
        history.push("/");
    })
                                }})
                      }}).catch(err =>
                          {
                          alert("Error Deleting Previous account details");
                          history.push("/");
                          })

                      

                      }
                      
                      else
                      {
                      
                      alert("Wrong current credentials");
                      console.log("Failed to login");
                      history.push("/mainmenu");
                      }
                      
                     
                    })
              .catch(function (error) {
                alert("Wrong credentials Provided for current account");
                history.push("/mainmenu");
                console.log(`Catch ran : ${error}`);
              });
        
            }
            
        
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
          <p>You can't Access Profile Update Page without being logged in, Please Log in</p>
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
        Welcome Admin, Please Enter your previous and new Account Info
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

        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
                     <input type="email" name="email2" value={Email2}
                                                    aria-label="email"
                                                    title="Enter your New Email"
                                                    placeholder = "Enter your New Email"
                                                    onChange={changeEmail2}
                                                     required={true}/>
          </div>
        </div>

        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password2" value={Password2}
                                                    onChange={changePassword2}
                                                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
                                                    title="Password must contain UpperCase, LowerCase, Number/SpecialChar and min 8 Chars"
                                                    placeholder = "Enter your New Password"
                                                    aria-label="password"
                                                    required={true}/>

          </div>
        </div>

        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password3" value={Password3}
                                                    onChange={changePassword3}
                                                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
                                                    title="Password must contain UpperCase, LowerCase, Number/SpecialChar and min 8 Chars"
                                                    placeholder = "Confirm New Password"
                                                    aria-label="password"
                                                    required={true}/>

          </div>
        </div>

         <button
             type='submit'
             className='btn btn-primary btn-lg btn-block  form-control'
          >Update
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
);

    
    

}

export default ProfileUpdate;


