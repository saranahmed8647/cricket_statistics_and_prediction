import React,{ useState, useEffect }  from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import Toolbar from "../../Toolbar/Toolbar.component";
import SideDrawer from "../../SideDrawer/SideDrawer.component";
import {Line} from "react-chartjs-2";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../Backdrop/Backdrop.component";

// This component will show all the details of 1 selected Team
const TeamDetail = (props) =>
{
    const history = useHistory();
    
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    



    const[TeamData, setTeamData] = useState({});

    useEffect(() =>
    {

        
    const name = props.match.params.name;
    const body_data = {
        name:name
    }

    axios.post("http://localhost:5000/team/team",body_data)
    .then(json =>
        {   
            if(json.status == 200)
            {
                var fetched_data = json.data[0];
                setTeamData(fetched_data);

                
                
            }
        })
  .catch(function (error) {
    alert("Failed to get Teams Data, going to main menu");
    history.push("/mainmenu");
  });


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

    const data={
      labels:['total matches','won matches','lost matches','tied matches','matches with no reult','win percentage'],
      datasets:[
        {
          label:'team data graph',
          data:[TeamData.matches,TeamData.won,TeamData.lost,TeamData.tied,TeamData.no_result,TeamData.percentage],
          backgroundColor:['#66ff66'],
          borderColor:['#66ff66'],
          pointBackgroundColor:'#b8b894',
          pointBorderColor:'#b8b894'
        }
      ]
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
  
    <th style={{textAlign:'center'}}>Country Name</th>
    <th  style={{textAlign:'center'}}>{TeamData.name}</th>
  </tr>
  <tr>
    <td>Total Matches played</td>
    <td>{TeamData.matches}</td>
  </tr>
  
  <tr>
    <td>Matches Won</td>
    <td>{TeamData.won}</td>
  </tr>
  <tr>
    <td>Matches Lost</td>
    <td>{TeamData.lost}</td>
  </tr>
  <tr>
    <td>Matches Tied</td>
    <td>{TeamData.tied}</td>
  </tr>
  <tr>
    <td>Matches with No Result</td>
    <td>{TeamData.no_result}</td>
  </tr>
  <tr>
    <td>Match Winning Percentage %</td>
    <td>{TeamData.percentage}</td>
  </tr>


</table>

<div>
  <Line data={data}/>
</div>

</div>    
    </div>)
}

export default TeamDetail;