import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Alert } from 'react-bootstrap';
// import { createBrowserHistory as history} from 'history';
import { useHistory } from "react-router-dom";
import { getFromStorage , setInStorage } from "../../../utils/storage"; 

import Toolbar from "../../../Toolbar/Toolbar.component";
import SideDrawer from "../../../SideDrawer/SideDrawer.component";

import {Line,Doughnut} from "react-chartjs-2";

// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../../Backdrop/Backdrop.component";

const BowlersDetails = (props) =>
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

    axios.post("http://localhost:5000/player/bowlers/one",body_data)
    .then(json =>
        {   
            if(json.status == 200)
            {
                var fetched_data = json.data[0];
                setTeamData(fetched_data);    
                
            }
        })
  .catch(function (error) {
    alert("Failed to get Bowler's Data, going to main menu");
    
    history.push("/mainmenu");
  });

  setTimeout(() => {
     settoRender(true);
      
  }, 14000);

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




if(torender)
{


  const data={
    labels:['total matches','bowling strikerate','total wickets','bowling average','economy','total innings'],
    datasets:[
      {
        label:'bowler data graph',
        data:[TeamData.matches,TeamData.bowling_strikerate,TeamData.wickets,TeamData.bowling_average,TeamData.economy,TeamData.innings],
        backgroundColor:['#b3ffb3'],
        borderColor:['#b3ffb3'],
        pointBackgroundColor:'#b8b894',
        pointBorderColor:'#b3ffb3'
      }
    ]
  }



  const dataDoughnut={
    labels:['total balls delivered','total runs conceded'],
    datasets:[
      {
        label:'bowler data graph',
        data:[TeamData.balls_delivered,TeamData.runs_conceded],
        backgroundColor:[
          '#bf4080',
          '#9fbfdf'
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
        <br/>
        <br/>
        <br/>
        <br/>
        

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
    <td>Debut Year</td>
    <td>{TeamData.span.starting_year}</td>
  </tr>
  
  
  <tr>
    <td>Final Year played in</td>
    <td>{TeamData.span.ending_year}</td>
  </tr>
  
  <tr>
    <td>Total Innings Played</td>
    <td>{TeamData.innings}</td>
  </tr>
  
  <tr>
    <td>Is the Player a Wicketkeeper ?</td>
    <td>{String(TeamData.wicket_keeper)}</td>
  </tr>
  
  
  <tr>
    <td>Total balls delivered</td>
    <td>{TeamData.balls_delivered}</td>
  </tr>
  
  
  <tr>
    <td>Total runs conceded</td>
    <td>{TeamData.runs_conceded}</td>
  </tr>
  
  
  <tr>
    <td>Total wickets</td>
    <td>{TeamData.wickets}</td>
  </tr>
  
  
  <tr>
    <td>Best Bowling figures : Wickets  /  Runs</td>
    <td>{TeamData.best_figures.wickets}  / {TeamData.best_figures.runs}</td>
  </tr>
  
  
  <tr>
    <td>bowling average</td>
    <td>{TeamData.bowling_average}</td>
  </tr>
  
  
  <tr>
    <td>Economy</td>
    <td>{TeamData.economy}</td>
  </tr>
  
  <tr>
    <td>Bowling Strikerate</td>
    <td>{TeamData.bowling_strikerate}</td>
  </tr>
  
  
  <tr>
    <td>Four Wickets</td>
    <td> {TeamData.four_wickets}</td>
  </tr>
  
  
  <tr>
    <td>Five Wickets</td>
    <td> {TeamData.five_wickets}</td>
  </tr>
  

</table>

<div>
  <Line data={data}/>
</div>
<div>
  <Doughnut data={dataDoughnut} options={options}/>
</div>

</div>    




        {/* <p>Name : {TeamData.name}</p>
        <p>Country : {TeamData.country}</p> */}
       

       {/* <p>matches : {TeamData.matches}</p> */}
{/*        
       <p>Span - - </p>
       <span>Debut Year : </span>
       <p>Debut Year : {TeamData.span.starting_year}</p>
       <br /> */}
       {/* <span>Final Year played in: </span>
       <p>Final Year played in{TeamData.span.ending_year}</p>
       <br /> */}
       {/* <p>Total Innings Played : {TeamData.innings}</p> */}
       {/* <p>Is the Player a Wicketkeeper ?  : {String(TeamData.wicket_keeper)}</p> */}
       {/* <p>Total balls delivered  : {TeamData.balls_delivered}</p> */}
       {/* <p>Total runs conceded  : {TeamData.runs_conceded}</p> */}
       {/* <p>Total wickets  : {TeamData.wickets}</p> */}
       
        
       {/* <p>Best Bowling figures - - </p> */}
       {/* <span>Best Bowling figures : Wickets  /  Runs : </span> */}
       {/* <p>Best Bowling figures : Wickets  /  Runs {TeamData.best_figures.wickets}  / {TeamData.best_figures.runs}</p> */}
       {/* <br /> */}

       {/* <p>bowling average   : {TeamData.bowling_average}</p> */}
       {/* <p>Economy   : {TeamData.economy}</p> */}
       {/* <p>Bowling Strikerate   : {TeamData.bowling_strikerate}</p> */}
       {/* <p>Four Wickets   : {TeamData.four_wickets}</p> */}
       {/* <p>Five Wickets   : {TeamData.five_wickets}</p> */}


   </div>);


}
else
{

    return(
        <div className="ui segment">
    <div className="ui active inverted dimmer">
      <div className="ui large text loader">Loading Bowler's Data</div>
    </div>
    <p></p>
    <p></p>   
    <p></p>
  </div>

    );

}


}
        


export default BowlersDetails;