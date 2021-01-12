import React,{ useState, useEffect } from "react";

import axios from "axios";
import { Table } from 'react-bootstrap';

// import { createBrowserHistory as history} from 'history';
import { useHistory } from "react-router-dom";
import { getFromStorage , setInStorage } from "../../../utils/storage"; 

import Toolbar from "../../../Toolbar/Toolbar.component";
import SideDrawer from "../../../SideDrawer/SideDrawer.component";

import {Line,Doughnut} from "react-chartjs-2";

// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../../Backdrop/Backdrop.component";

import "./AllrounderDetails.component.css";

const AllrounderDetails = (props) =>
{
    
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    
    const history = useHistory();

    const[TeamData, setTeamData] = useState({});
    const [torender , settoRender] = useState(false);
    useEffect(() =>
    {

        
    const name = props.match.params.name;
    const body_data = {
        name:name
    }

    axios.post("http://localhost:5000/player/allrounders/one",body_data)
    .then(json =>
        {   
            if(json.status === 200)
            {
                var fetched_data = json.data[0];
                setTeamData(fetched_data);    
                console.dir(`Gotten Data 2 : ${json.data[0]}`);
            }
        })
  .catch(function (error) {
    alert("Failed to get allrounders Data, going to main menu");
    
    history.push("/mainmenu");
  });

  setTimeout(() => {
     settoRender(true);
      
  }, 18000);

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


// console.log("Team data : ");
// console.log(TeamData);
if(torender)
{

  const data={
    labels:['total matches','batting average','bowling average'],
    datasets:[
      {
        label:'allrounder data graph',
        data:[TeamData.matches,TeamData.batting_average,TeamData.bowling_average],
        backgroundColor:[
          '#bf4080',
          '#9fbfdf',
          '#cc8800'
        ]
      }
    ]
  }
  const options={
    title:{
      display:true,
      text:'Doughnut Chart'
    }
  }

    
    return (
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
    <th style={{textAlign:'center'}}>Name</th>
    <th  style={{textAlign:'center'}}>{TeamData.name}</th>
  </tr>
  <tr>
    <td>Country</td>
    <td>{TeamData.country}</td>
  </tr>
  <tr>
    <td>Matches</td>
    <td>{TeamData.matches}</td>
  
  </tr>
  <tr>
    <td>Batting Runs</td>
    <td>{TeamData.batting_runs}</td>
  
  </tr>
  <tr>
    <td>Debut Year</td>
    <td>{TeamData.span.starting_year}</td>
    
  </tr>
  <tr>
    <td>Final Year played in</td>
    <td>{TeamData.span.ending_year}</td>

  </tr>
  <tr>
    <td>Batting Average</td>
    <td>{TeamData.batting_average}</td>
    
  </tr>
  <tr>
    <td>Hundreds</td>
    <td>{TeamData.hundreds}</td>
    
  </tr>
  <tr>
    <td>Wickets</td>
    <td>{TeamData.wickets}</td>
    
  </tr>
  <tr>
    <td>Highest Runs</td>
    {
            (TeamData.highest_score.out) ? (<td>{TeamData.highest_score.highest_runs}</td>) : (<td>{TeamData.highest_score.highest_runs}  * </td>)
        }
  
  </tr>
  <tr>
    <td>Wicket Keeper</td>
    <td>{String(TeamData.wicket_keeper)}</td>
    
  </tr>
  

  <tr>
    <td>Best Bowling Figure : (Runs / Wickets)</td>
    <td>{TeamData.best_figures.runs}  /  {TeamData.best_figures.wickets}</td>
    
  </tr>

  <tr>
    <td>Bowling Average</td>
    <td>{TeamData.bowling_average}</td>
    
  </tr>

  <tr>
    <td>Five Wickets</td>
    <td>{TeamData.five_wickets}</td>
    
  </tr>

  <tr>
    <td>Average Difference</td>
    <td>{TeamData.average_difference}</td>
        
  </tr>


</table>
<div>
  <Doughnut data={data} options={options}/>
</div>

</div>    

     </div>);


}
else
{
    return(
        
        <div className="ui segment">
  <div className="ui active inverted dimmer">
    <div className="ui large text loader">Loading All rounder's Data</div>
  </div>
  <p></p>
  <p></p>   
  <p></p>
</div>
    );
}
    
}
        


export default AllrounderDetails;