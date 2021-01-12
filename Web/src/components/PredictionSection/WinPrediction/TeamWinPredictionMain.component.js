import React,{ useState, useEffect } from "react";
import axios from "axios";
import { getFromStorage , setInStorage } from "../../utils/storage"; 
import { useHistory } from "react-router-dom";

import Toolbar from "../../Toolbar/Toolbar.component";
import SideDrawer from "../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../Backdrop/Backdrop.component";



const TeamWinPredictionMain = () =>  
{


    const history = useHistory();
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
    const [ teamDataErrors, setTeamDataErrors] = useState([]);


    const [Team_1_name, setTeam1Name] = useState("");
    const [Team_2_name, setTeam2Name] = useState("");
    const [Venue_name, setVenueName] = useState("");
         
    const [PlayerCategory, setPlayerCategory] = useState("");
    
    var worldcup_teams = ['England', 'South Africa', 'India', 'West Indies', 
            'Pakistan', 'New Zealand', 'Sri Lanka', 'Afghanistan', 
            'Australia', 'Bangladesh', 'India','Bermuda','Canada', 'Hong Kong',
            'Ireland','Kenya','Namibia','Netherlands','Oman','P.N.G.','Scotland',
            'U.A.E.','U.S.A.','Zimbabwe']


var venues = ["Dambulla","Colombo (RPS)" , "Colombo (SSC)","Birmingham",
"Bristol","Lord's","Manchester","Leeds", "The Oval","Harare","Bulawayo",
"Kolkata","Cuttack","Chennai","Kanpur","Delhi","Mumbai","Christchurch","Wellington","Napier",
"Auckland","Dunedin","Nottingham","Chester-le-Street","Sydney","Melbourne",
"Brisbane","Perth","Hobart","Adelaide","East London","Port Elizabeth","Cape Town","Durban","Chattogram","Dhaka",
"Dambulla","Georgetown","Port of Spain","St George's","Gros Islet","Bridgetown","Southampton",
"Johannesburg","Bloemfontein","Centurion","Lahore","Karachi","Rawalpindi",'Faridabad',"Margao",
"Kochi","Guwahati","Jamshedpur","Indore","Belfast","Cardiff","Jaipur","Ahmedabad","Providence",
"North Sound","Hamilton","Edinburgh","Rajkot","Bengaluru","Nagpur","Dublin","Hyderabad (Deccan)","Mohali",
"Abu Dhabi","Dubai (DSC)","Ranchi","Dharamsala","Dublin (Malahide)","Aberdeen","Hambantota",
"Pallekele","Sharjah","Pune","Mount Maunganui","Visakhapatnam","Potchefstroom","Melbourne (Docklands)",
"Nairobi (Gym)","Kingston","Cairns","Darwin","Gwalior","Amstelveen","Canterbury",
"Fatullah","Kuala Lumpur","Mumbai (BS)","Basseterre","Chandigarh","Vadodara","Kingstown",
"Canberra","Benoni",'Taunton',"Paarl","St John's","Kimberley","Tangier","Faisalabad","Multan",
"Roseau","Lucknow","Nairobi","Kandy","Jodhpur","Vijayawada","Queenstown","King City (NW)",
"Khulna","Nelson","Whangarei","Thiruvananthapuram","Sylhet","Taupo","Pietermaritzburg","Peshawar",
"Glasgow","Hyderabad (Sind)","Sheikhupura","Bogra","Colombo (PSS)","Galle","Kwekwe","Mombasa","Deventer",
"Bready","Toronto","Nairobi (Jaff)","Nairobi (Ruaraka)","Rotterdam","Ayr","The Hague","Lincoln","Windhoek","Schiedam","ICCA Dubai","Lauderhill","Al Amerat","Greater Noida",
"Dehradun","Mong Kok","Port Moresby"]


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

    },[]);



    const TeamHandler = (e) => 
    {
        e.preventDefault();
        setTeamDataErrors([]);
        if (Team_1_name ===Team_2_name) 
        {
            setTeamDataErrors([...teamDataErrors,"You must select 2 different Teams"]);
        }
        
        else if ((Team_1_name === "") || (Team_2_name === "")) 
        {
            setTeamDataErrors([...teamDataErrors,"You must select both Teams"]);
        }
        else if(Venue_name === "")
        {
          setTeamDataErrors([...teamDataErrors,"You must select a Venue for the Match"]);
        }
        else 
        {
            
            const team_data = 
            {
                Team1: Team_1_name,
                Team2: Team_2_name,
                Venue: Venue_name   
            }
            

                // history.push(`/TeamPredictionResults/${team_data}`);

                history.push({
                    pathname : '/TeamPredictionResults',
                    team_data :{
                        Team1: Team_1_name,
                        Team2: Team_2_name,
                        Venue: Venue_name   
                    }
                    } 
                  );
            
            
            }       
    };

    const changeTeam1Name = (e) =>
    {
        
        let name_var2 = e.target.value;
        setTeam1Name(name_var2);
        console.log(`Team name : ${name_var2}`);

    }

    const changeTeam2Name = (e) =>
    {
        
        let name_var3 = e.target.value;
        setTeam2Name(name_var3);

    }

    const changeVenueName = (e) =>
    {
        
        let name_var4 = e.target.value;
        setVenueName(name_var4);

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
        Please choose 2 Teams and a venue for this Match
      </div>
    </h2>
    <form action="post" onSubmit={TeamHandler} class="ui large form">
      <div class="ui stacked secondary  segment">
        <div class="field">
          <div class="ui left icon input">
          <span style={{fontSize:13}}>Select the First Team for Match prediction: </span>
            
            <select onChange={changeTeam1Name} value={Team_1_name} style={{width: "50%",fontSize:13}}>
            {worldcup_teams.map(key => (
              <option key={key} value = {key}  >{key}</option>
            ))}
            </select>
            
            
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
          <span style={{fontSize:13}}>Select the Second Team for Match prediction: </span>
            
            <select onChange={changeTeam2Name} value={Team_2_name} style={{width: "50%",fontSize:13}}>
            {worldcup_teams.map(key => (
              <option key={key} value = {key}  >{key}</option>
            ))}
            </select>


          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">

          <span style={{fontSize:15}}>Select the Venue for this match: </span>

        <select onChange={changeVenueName} value={Venue_name} style={{width: "50%",fontSize:13}}>
        {venues.map(key => (
        <option key={key} value = {key}  >{key}</option>
        ))}
        </select>

          </div>
        </div>
         <button
             type='submit'
             className='btn btn-primary btn-lg btn-block  form-control'
          >See Match Prediction
          </button>
      
      </div>

      

    </form>

    <div className="ui error message" style={{fontSize:13}}>
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

export default TeamWinPredictionMain; 
