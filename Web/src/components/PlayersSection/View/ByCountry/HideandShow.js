import React,{ useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { getFromStorage , setInStorage } from "../../../utils/storage"; 
import axios from "axios";
import Toolbar from "../../../Toolbar/Toolbar.component";
import SideDrawer from "../../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../../Backdrop/Backdrop.component";

export default function HideandShow(props){
    const players = ["Allrounders", "Batsmen", "Bowllers"];
    const [myPlayer, setMyPlayer] = useState("");

    const [sideDrawerOpen,setSideDrawer] = useState(false);
    const history = useHistory();
    


    const [loginStatus,setLoginStatus] = useState(0);
    const [BatsmenData,setBatsmenData] = useState([]);
    const [BowlerData,setBowlerData] = useState([]);
    const [AllrounderData,setAllrounderData] = useState([]);
    const [token, setToken] = useState("");
    const [torender , settoRender] = useState(false);
    
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

        const name = props.match.params.name;
        
      
    
        const body_data = {
            name:name
        }
        axios.post("http://localhost:5000/player/allrounders/ByCountry",body_data)
        .then(json =>
            {   
                if(json.status === 200)
                {
                    var fetched_data = json.data;
                    setAllrounderData(fetched_data);    
                    console.log(`allrounder saved`);
                    
                  }
            })
      .catch(function (error) {
        alert("Failed to get Players data, going to main menu");
        
        history.push("/mainmenu");
      });
    
    
      axios.post("http://localhost:5000/player/bowlers/ByCountry",body_data)
        .then(json =>
            {   
                if(json.status === 200)
                {
                    var fetched_data = json.data;
                    setBowlerData(fetched_data);    
                    console.log(`bowlers saved`);
                    
                  }
            })
      .catch(function (error) {
        alert("Failed to get Players data, going to main menu");
        
        history.push("/mainmenu");
      });
    
    
      axios.post("http://localhost:5000/player/batsmen/ByCountry",body_data)
        .then(json =>
            {   
                if(json.status === 200)
                {
                    var fetched_data = json.data;
                    setBatsmenData(fetched_data);    
                    console.log(`Batsmen saved`);
                    
                  }
            })
      .catch(function (error) {
        alert("Failed to get Players data, going to main menu");
        
        history.push("/mainmenu");
      });

      setTimeout(() => {
        settoRender(true); 
     }, 23000);
   
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
    
    if(torender)
    {
        
    return (  

        <div style={{height:"100%"}}>
        <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}
    <br />
    <br />
    <br />
    <br />

    <div style={{margin: 15}}>
            <div>
                <div className="btn-group" role="group" aria-label="Basic example">
                    {players.map(player => (
                        <button
                            type="button" 
                            class="btn btn-secondary btn-lg"
                            key={player}
                            onClick={() => setMyPlayer(player)}
                        >
                            {player}
                        </button>
                    ))}
                </div>
            </div>
            <br />

            <div>
                <p>
                    {myPlayer === "Allrounders" && (
                        <Allrounders Main ={AllrounderData} />

                    )}
                    {myPlayer === "Batsmen" && (
                        <Batsmen Main ={BatsmenData} />
                    )}
                    {myPlayer === "Bowllers" && (
                        <Bowllers Main ={BowlerData} />
                            

                    )}
                </p>
            </div>
        </div>

</div>
      
);
      
      
    
    }
    else
    {
    
        return(
            <div className="ui segment">
        <div className="ui active inverted dimmer">
          <div className="ui large text loader">Loading Player's Data</div>
        </div>
        <p></p>
        <p></p>   
        <p></p>
      </div>
    
        );
    
    }
    
        

}
 


const Allrounders = (props)=>{
    const history = useHistory();
    return(


        <div>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col"><h3>Allrounders :</h3></th>
                    <th scope="col"><h3></h3></th>
                    <th scope="col"><h3></h3></th>
                    </tr>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Playing span</th>
                    </tr>
                </thead>
                {props.Main.map((team,index) =>
    (
        <tbody>
                    <tr>
                    <th style={{background:'#f2f2f2',color:'black'}} scope="row">{index + 1}</th>
                    <td onClick={() =>{history.push(`/AllroundersDetails/${team.name}`)}}><strong>{team.name}</strong></td>
                    <td>{team.span.starting_year} - {team.span.ending_year} </td>
                    
                    </tr>
                    
                </tbody>
      
      
    ))}
            </table>
        </div>
    )
}

const Batsmen = (props)=>{
    const history = useHistory();
    return(


        <div>
            <table class="table table-striped">
                <thead class="thead-dark">
                <tr>
                    <th scope="col"><h3>Batsmen :</h3></th>
                    <th scope="col"><h3></h3></th>
                    <th scope="col"><h3></h3></th>
                    </tr>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Playing span</th>
                    </tr>
                </thead>
                {props.Main.map((team,index) =>
    (
        <tbody>
                    <tr>
                    <th style={{background:'#f2f2f2',color:'black'}} scope="row">{index + 1}</th>
                    <td onClick={() =>{history.push(`/batsmenDetails/${team.name}`)}}><strong>{team.name}</strong></td>
                    <td>{team.span.starting_year} - {team.span.ending_year} </td>
                    
                    </tr>
                    
                </tbody>
      
      
    ))}
            </table>
        </div>
    )

}

const Bowllers = (props)=>{
    const history = useHistory();
    return(


        <div>
            <table class="table table-striped">
                <thead class="thead-dark">
                <tr>
                    <th scope="col"><h3>Bowlers :</h3></th>
                    <th scope="col"><h3></h3></th>
                    <th scope="col"><h3></h3></th>
                    </tr>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Playing span</th>
                    </tr>
                </thead>
                {props.Main.map((team,index) =>
    (
        <tbody>
                    <tr>
                    <th style={{background:'#f2f2f2',color:'black'}} scope="row">{index + 1}</th>
                    <td onClick={() =>{history.push(`/bowlersDetails/${team.name}`)}}><strong>{team.name}</strong></td>
                    <td>{team.span.starting_year} - {team.span.ending_year} </td>
                    
                    </tr>
                    
                </tbody>
      
      
    ))}
            </table>
        </div>
    )
}