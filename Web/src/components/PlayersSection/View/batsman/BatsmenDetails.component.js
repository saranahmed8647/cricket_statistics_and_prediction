import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Alert } from 'react-bootstrap';
// import { createBrowserHistory as history} from 'history';
import { useHistory } from "react-router-dom";
import { getFromStorage , setInStorage } from "../../../utils/storage"; 
import { Table } from 'react-bootstrap';

import Toolbar from "../../../Toolbar/Toolbar.component";
import SideDrawer from "../../../SideDrawer/SideDrawer.component";
import {Line,Doughnut} from "react-chartjs-2";



// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../../Backdrop/Backdrop.component";

import "./BatsmenDetails.component.css";

const BatsmenDetails = (props) =>
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

    axios.post("http://localhost:5000/player/batsmen/one",body_data)
    .then(json =>
        {   
            if(json.status == 200)
            {
                var fetched_data = json.data[0];
                setTeamData(fetched_data);    
                console.log(`Gotten Data : ${fetched_data}`);
            }
        })
  .catch(function (error) {
    alert("Failed to get batsmen Data, going to main menu");
    
    history.push("/mainmenu");
  });

  setTimeout(() => {
     settoRender(true); 
  }, 12000);

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
    labels:['total matches','average','total ducks','total fiftys','total hundreds','total innings','total innings not-out','strike rate'],
    datasets:[
      {
        label:'batsmen data graph',
        data:[TeamData.matches,TeamData.average,TeamData.ducks,TeamData.fiftys,TeamData.hundreds,TeamData.innings,TeamData.not_outs,TeamData.strike_rate],
        backgroundColor:['#cc00ff'],
        borderColor:['#cc00ff'],
        pointBackgroundColor:' #b8b894',
        pointBorderColor:'#b8b894'
      }
    ]
  }



  const dataDoughnut={
    labels:['batting runs','balls faced'],
    datasets:[
      {
        label:'batsmen data graph',
        data:[TeamData.runs,TeamData.balls_faced],
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
    <td>{TeamData.runs}</td>
  
  </tr>
  <tr>
    <td>Average</td>
    <td>{TeamData.average}</td>
    
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
    <td>Balls Faced</td>
    <td>{TeamData.balls_faced}</td>
    
  </tr>
  <tr>
    <td>Total Ducks</td>
    <td>{TeamData.ducks}</td>
    
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
    <td>Total fiftys scored</td>
    <td>{TeamData.fiftys}</td>
    
  </tr>

  <tr>
    <td>Total hundreds scored</td>
    <td> {TeamData.hundreds} </td>
    
  </tr>

  <tr>
    <td>Total Innings played</td>
    <td>{TeamData.innings}</td>
    
  </tr>
  <tr>
    <td>Total inning played as not out</td>
    <td>{TeamData.not_outs}</td>
    
  </tr>

  <tr>
    <td>strike rate</td>
    <td>{TeamData.strike_rate}</td>
        
  </tr>


</table>
<div>
  <Line data={data}/>
</div>
<div>
  <Doughnut data={dataDoughnut} options={options}/>
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
      <div className="ui large text loader">Loading batsman's Data</div>
    </div>
    <p></p>
    <p></p>   
    <p></p>
  </div>

    );

}


}
        


export default BatsmenDetails;