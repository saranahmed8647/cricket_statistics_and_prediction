import React,{ useState, useEffect }  from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar.component";
import SideDrawer from "../SideDrawer/SideDrawer.component";
import { getFromStorage , setInStorage } from "../utils/storage"; 

// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../Backdrop/Backdrop.component";
const UserDetail = (props) =>
{
    
    const history = useHistory();
    
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);



    const[TeamData, setTeamData] = useState({});

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
                            const email = props.match.params.email;
                            const body_data = {
                                email:email
                            }

                            
    axios.post("http://localhost:5000/account/singleUser",body_data)
    .then(json =>
        {   
            if(json.status === 200)
            {
                var fetched_data = json.data[0];
                setTeamData(fetched_data);
                }
            })
    .catch(function (error) {
        alert("Failed to get User Data, going to main menu");
        history.push("/mainmenu");
    });





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

    const DeletingUser =() =>
    {
        
        const admin = 
            {
                email : TeamData.email,
                password : TeamData.password
                
            }

            axios.post('http://localhost:5000/account/delete', admin)
                .then(user =>
                {
                    if(user.status === 200)
                    {
                        alert(`${TeamData.name} has been successfully deleted`);
                        history.push("/mainmenu");
                    }
                    
                    
                    
                })
                .catch(err =>
                    {
                        alert(`Error deleting ${TeamData.name}, going To Main Menu`);
                        history.push("/mainmenu");
                    });
                
    }

    
    let backdrop_var;

    if(sideDrawerOpen)
    {
        
        backdrop_var = <Backdrop click={backdropClickHandler}/>;
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
          <p>You can't View the User Details being logged in, Please Log in</p>
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
        
        <div style={{border: '2px solid #00bfff',padding:'5%', margin:'1%',width: '95%', textAlign:'center'}}>

<table id="customers">
  <tr>
  
    <th style={{textAlign:'center'}}>User Name </th>
    <th  style={{textAlign:'center'}}>{TeamData.name}</th>
  </tr>
  <tr>
    <td>Mongo ID</td>
    <td>{TeamData._id}</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>{TeamData.email}</td>
  </tr>
  <tr>
    <td>Phone</td>
    <td>{TeamData.phone}</td>
  </tr>
  


</table>
<br />
<br />
<br />

<button style={{width: "100%"}} className="ui inverted red button" onClick ={DeletingUser} ><strong>Delete this User</strong></button>

</div>    



        

        
        <p></p>
        <p></p>
        <p></p> 
    </div>
        );
    



}

export default UserDetail;