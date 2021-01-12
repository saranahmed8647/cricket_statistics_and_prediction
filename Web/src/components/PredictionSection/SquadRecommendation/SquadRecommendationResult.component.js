import React,{ useState, useEffect } from 'react';

import { useHistory } from "react-router-dom";
import axios from "axios";

import Toolbar from "../../Toolbar/Toolbar.component";
import SideDrawer from "../../SideDrawer/SideDrawer.component";

import Players_List from "../../Players.json";

// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../Backdrop/Backdrop.component";

import "./Styles2.css";

const SquadRecommendationResult = (props) => 
{
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    const [Team_1_name, setTeam1Name] = useState("");
    const [Team_2_name, setTeam2Name] = useState("");
    const [Venue, setVenue] = useState(2);
    const [Toss, setToss] = useState(0);
    const [Team1_squad, setTeam1_squad] = useState([]);
    const history = useHistory();
    const [Team2_squad,setTeam2_squad] = useState([]);
    const [torender , settoRender] = useState(false);
    
    const [TeamData , setTeamData] = useState("");

    useEffect(() =>
    {
        let team_1_temp = props.location.team_data.Team1;
        let team_2_temp = props.location.team_data.Team2;
        let venue_temp = props.location.team_data.Venue;
        let Toss_temp = props.location.team_data.Toss;
        
        let team_2_squad = props.location.team_data.Squad2;
        setTeam1Name(team_1_temp);
        setTeam2Name(team_2_temp);
        setVenue(venue_temp);
        setToss(Toss_temp);
        
        setTeam2_squad(team_2_squad);
        
        let filtered_players_List = Players_List.filter(name => name["Country"] === team_1_temp);
        
        

        setTeam1_squad(filtered_players_List);

        
        const body_data = 
                            {
                                Team1_name: team_1_temp,
                                Team2_name: team_2_temp,
                                Venue : venue_temp,
                                Team1_list : filtered_players_List,
                                Team2_list : team_2_squad,
                                Toss : Toss_temp
                            }

    
                        axios.post("http://localhost:5000/predict/SquadRecommendation",body_data,{timeout : 45000})
                        .then(json =>
                            {   
                                if(json.status === 200)
                                {
                                    var fetched_data = json.data;
                                    setTeamData(json.data);    
                                    
                                }
                            })
                        .catch(function (error) {
                        alert("Failed to get Prediction results, going to main menu");
                        
                        history.push("/mainmenu");
                        });
                    
                        setTimeout(() => {
                            settoRender(true); 
                         }, 45000);
                       
    },[])

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


    if(torender)
    {
        let Teams_data_array = TeamData.split("\n");

        let winning_perc = Teams_data_array[0].split(":")[1];
        
        return ( 
            <div style={{height:"100%"}}>
            <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
            <SideDrawer show={sideDrawerOpen}/>
            {backdrop_var}
            
            
            <div class="card"
                    style={{width:'60rem',marginLeft:'28%',marginTop:'5%', display:'flex',flex:1,alignItems:'center',position:'fixed'}}
            >
                <p style={{fontWeight:'bold',fontSize:25,color:'#e60073'}}>System's Prediction Result</p>
    
    
            
                <table>
                    <tr>
                        <th>Winning Percentage for : {Team_1_name}</th>
                        <th>{winning_perc}</th>
                    </tr>
                    <tr>
                        <td>Toss Winner : </td>
                        <td>{Toss === 1 ? (<span>{Team_1_name}</span>) : (<span>{Team_2_name}</span>)}</td>
                    </tr>
                    <tr>
                        <td>Ground for {Team_1_name}  : </td>
                        <td>{Venue === 0 ? (<span>Home</span>) : (Venue === 1 ? (<span>Away</span>) : (<span>Neutral</span>))}</td>
                    </tr>
                    
                </table>
                <p style={{marginTop:10,marginBottom:10,color:'#003300', fontWeight:'bold',fontSize:18}}>Squad Picked by System for this match : </p>
                <p style={{color:'purple',fontSize:15}}>{Teams_data_array[1]}</p>    
                <p style={{color:'purple',fontSize:15}}>{Teams_data_array[2]}</p>    
                <p style={{color:'purple',fontSize:15}}>{Teams_data_array[3]}</p>    
                <p style={{color:'purple',fontSize:15}}>{Teams_data_array[4]}</p>    
                <p style={{color:'purple',fontSize:15}}>{Teams_data_array[5]}</p>    
                <p style={{color:'purple',fontSize:15}}>{Teams_data_array[6]}</p>    
                <p style={{color:'purple',fontSize:15}}>{Teams_data_array[7]}</p>    
                <p style={{color:'purple',fontSize:15}}>{Teams_data_array[8]}</p>    
                <p style={{color:'purple',fontSize:15}}>{Teams_data_array[9]}</p>    
                <p style={{color:'purple',fontSize:15}}>{Teams_data_array[10]}</p>    
                <p style={{color:'purple',fontSize:15}}>{Teams_data_array[11]}</p>        
    
            </div>
            </div>
    
         );
        
        
    }
    else
    {
        return(
        
            <div className="ui segment">
      <div className="ui active inverted dimmer">
        <div className="ui large text loader">Sending Data to ML Models and retrieving Results ....</div>
      </div>
      <p></p>
      <p></p>   
      <p></p>
    </div>
        );
    }
    
}
 
export default SquadRecommendationResult;