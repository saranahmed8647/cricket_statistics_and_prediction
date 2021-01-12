import React,{ useState, useEffect } from 'react';

import { useHistory } from "react-router-dom";
import axios from "axios";

import Toolbar from "../../Toolbar/Toolbar.component";
import SideDrawer from "../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../Backdrop/Backdrop.component";
import "./stylesTable.css"; 


const SinglePredictionResult = (props) => 
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
        let team_1_squad = props.location.team_data.Squad1;
        let team_2_squad = props.location.team_data.Squad2;
        setTeam1Name(team_1_temp);
        setTeam2Name(team_2_temp);
        setVenue(venue_temp);
        setToss(Toss_temp);
        setTeam1_squad(team_1_squad);
        setTeam2_squad(team_2_squad);


        const body_data = 
                            {
                                Team1_name: team_1_temp,
                                Team2_name: team_2_temp,
                                Venue : venue_temp,
                                Team1_list : team_1_squad,
                                Team2_list : team_2_squad,
                                Toss : Toss_temp
                            }

    
                        axios.post("http://localhost:5000/predict/SquadWin",body_data,{timeout : 40000})
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
                         }, 40000);
                       
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
        console.log("Team 1 Player Name : " + JSON.stringify(Team1_squad[0]));
        return ( 

            <div style={{height:"100%"}}>
        <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}
        <br/>
        <br/>
        <br/>
            <div class="card"
                    style={{width:'60rem',height:'40rem',marginLeft:'25%',marginTop:'5%', display:'flex',flex:1,alignItems:'center'}}
            >
                <p style={{fontWeight:'bold',fontSize:25,color:'#e60073'}}>Prediction Result</p>
                <table>
                    <tr>
                        <th>Model Name </th>
                        <th>Winner Team / Winning Percentage</th>
                    </tr>
                    <tr>
                        <td>Prediction 1 (via Decision Tree :) </td>
                        <td>{Teams_data_array[0].trim() == "1" ? (<span>{Team_1_name}</span>) : (<span>{Team_2_name}</span>)} <span> / {parseFloat(Teams_data_array[1]).toFixed(3)} %</span></td>
                    </tr>
                    <tr>
                        <td>Prediction 2  (via Guassian :) </td>
                        <td>{Teams_data_array[2].trim() == "1" ? (<span>{Team_1_name}</span>) : (<span>{Team_2_name}</span>)} <span> / {parseFloat(Teams_data_array[3]).toFixed(3)} %</span></td>
                    </tr>
                    <tr>
                        <td>Prediction 3 : (via Logistic Regression : )</td>
                        <td>{Teams_data_array[4].trim() == "1" ? (<span>{Team_1_name}</span>) : (<span>{Team_2_name}</span>)} <span> / {parseFloat(Teams_data_array[5]).toFixed(3)} %</span></td>
                    </tr>
                    <tr>
                        <td>Prediction 4 : (via SVM :) </td>
                        <td>{Teams_data_array[6].trim() == "1" ? (<span>{Team_1_name}</span>) : (<span>{Team_2_name}</span>)} <span> / {parseFloat(Teams_data_array[7]).toFixed(3)} %</span></td>
                    </tr>
                    <tr>
                        <td>Toss Winner : </td>
                        <td>{Toss === 1 ? (<span>{Team_1_name}</span>) : (<span>{Team_2_name}</span>)}</td>
                    </tr>
                    <tr>
                        <td>Ground for {Team_1_name}  : </td>
                        <td>{Venue === 0 ? (<span>Home</span>) : (Venue === 1 ? (<span>Away</span>) : (<span>Neutral</span>))}</td>
                    </tr>
                    <tr>
                        <td>Player Chosen for <strong>{Team_1_name}</strong>  : </td>
                        <td>{Team1_squad[0]["Name"]}</td>
                    </tr>
                    <tr>
                        <td>Player Chosen for <strong>{Team_2_name}</strong>  : </td>
                        <td>{Team2_squad[0]["Name"]}</td>
                    </tr>
                    
    
         
                </table>
    
    
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
 
export default SinglePredictionResult;