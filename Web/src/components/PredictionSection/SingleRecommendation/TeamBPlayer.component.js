import React,{ useState, useEffect } from 'react';

import Batsmen_List from "../../batsmen.json";
import Bowlers_List from "../../bowler.json";
import { useHistory } from "react-router-dom";

import Toolbar from "../../Toolbar/Toolbar.component";
import SideDrawer from "../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../Backdrop/Backdrop.component";


const TeamBPlayer = (props) => 
{  
  const [sideDrawerOpen,setSideDrawer] = useState(false);
  const [Team_1_name, setTeam1Name] = useState("");
  const [Team_2_name, setTeam2Name] = useState("");
  const [Venue, setVenue] = useState(2);
  const [Toss, setToss] = useState(0);
  const [Team1_squad, setTeam1_squad] = useState([]);
  const history = useHistory();
  const [selectedSquad,setselectedSquad] = useState([]);
  const [torender , settoRender] = useState(false);
  useEffect(() =>
    {
      
      let team_1_temp = props.location.team_data.Team1;
      let team_2_temp = props.location.team_data.Team2;
      let venue_temp = props.location.team_data.Venue;
      let Toss_temp = props.location.team_data.Toss;
      let team_1_squad = props.location.team_data.Squad1;
      setTeam1Name(team_1_temp);
      setTeam2Name(team_2_temp);
      setVenue(venue_temp);
      setToss(Toss_temp);
      setTeam1_squad(team_1_squad);
      setTimeout(() => {
        settoRender(true); 
     }, 3000);
   
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


    const SubmittedFunc = () =>
    {
      if(selectedSquad.length < 1)
      {
        alert("You need to select 1 player to Continue");
      }
      else if(selectedSquad.length > 1)
      {
        alert("You need to select only 1 player to Continue");
      }
      else
      {
        var count = 0;
        selectedSquad.map((item,index) =>
        {
          if(item.Type === "Bowler")
          {
            count ++;
          }
          else
          {
            console.log();
          }
        })

        var final_team_squad = [];
          // Move to Team B
        for(let i =0; i <11; i++)
        {
            final_team_squad.push(selectedSquad[0]);
            
        }

        console.log("Selected Squad : ");
        for(let v =0; v <final_team_squad.length; v++)
        {
            console.log(JSON.stringify(final_team_squad[v]));
        }
          // Move to Team B

          history.push({
            pathname : '/SinglePredictionResult',
            team_data :{
                Team1: Team_1_name,
                Team2: Team_2_name,
                Venue: Venue,
                Toss : Toss,
                Squad1 : Team1_squad,
                Squad2 : final_team_squad   
            }
            } 
          );
    
        
      }
    }

    const AddPlayers = (Name, player_type) =>
    {
      console.log(JSON.stringify(selectedSquad));
      
      if(selectedSquad.length < 1)
      {
        
        var found = false;
        for(var i = 0; i < selectedSquad.length; i++) 
        {
            if (selectedSquad[i].Name == Name) {
                found = true;
                break;
            }
        }

        if (found) 
        {
          console.log();
        
        } 
        else 
        {
          setselectedSquad([...selectedSquad ,{"Name" : Name, "Type" :player_type}]);
          // add item
        }
        

      }
      else if(selectedSquad.length === 1)
      {
        alert("Cant add more than 1 Player");
      }
      
    }
    

    const DeletePlayer = (Name) =>
    {
      var index = -1;
      for(let i =0; i<selectedSquad.length; i++)
      {
        if(selectedSquad[i]["Name"] === Name)
        {
          index = i;
        }
      }
      
      var new_squad = selectedSquad;
      new_squad.splice(index,1);
      
      setselectedSquad(new_squad);
    }

      if(torender)
      {
        
        const rendered_Bowlers_Buttons =  Bowlers_List.filter(name => name["Country"] === Team_2_name).map(b => {
          return(
              <button type="button" onClick={() =>AddPlayers(b.Name , "Bowler")} class="btn btn-outline-success" style={{width:'15rem',marginTop:10,fontSize:15}}>
                  {b.Name}
              </button>
              );
        });
  
        const rendered_Batsmen_Buttons =  Batsmen_List.filter(name => name["Country"] === Team_2_name).map(b => {
          return(
              <button type="button" onClick={() =>AddPlayers(b.Name , "Batsman")} class="btn btn-outline-success" style={{width:'15rem',marginTop:10,fontSize:15}}>
                  {b.Name}
              </button>
              );
        });

      
    return ( 
<div>
        <div style={{height:"100%"}}>
        {/* <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/> */}
        {backdrop_var}
<div style={{height:"100%",overflowY:'scroll'}}>

{backdrop_var}

<div class="card" style={{marginLeft:'30%',width:'60rem',marginTop:'5%',marginBottom:'5%',display:'flex',flex:1,alignItems:'center',height:'100%'}}>
      
      <p style={{marginTop : '5%', marginBottom:'5%', color:'#e60073',fontSize:25,fontWeight:'bold'}}>Team - B Selection : {Team_2_name}</p>
      <p style={{color:'#b30059',fontSize:15,fontWeight:'bold'}}>Select 1 Player to continue...</p>
      <div style={{display:'flex',flex:2, flexDirection:"row",alignItems:'center'}}>
          <div style={{display:'flex',flex:1, flexDirection:'column',alignItems:'center'}}>
              <p style={{marginTop : '5%', marginBottom:'5%', color:'#009387',fontSize:30}}>Batsmen</p>
              <div style={{marginLeft:'25%',height: '20rem', overflowY: 'scroll'}}>{rendered_Batsmen_Buttons}</div>
          </div>

          <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'center'}}>
              <p style={{marginTop : '5%', marginBottom:'5%', color:'#009387',fontSize:30}}>Bowlers</p>
              <div style={{marginLeft:'25%',height: '20rem', overflowY: 'scroll'}}>{rendered_Bowlers_Buttons}</div>
          </div>
      </div>
      <p style={{fontSize:18,fontWeight:'bold'}}>Selected Players</p>
      <p style={{fontSize:18,fontWeight:'bold'}}>Batsman = Blue ---- Bowler = Green</p>
      {
      (selectedSquad.length > 0) ? (<p>{selectedSquad.map((item, index) => (item.Type === "Batsman") ?(
      <p style = {{"color":"blue",fontSize:13}} onClick= {() => DeletePlayer(item.Name)}>{index + 1} : {item.Name}</p>): (<p style = {{"color" : "green",fontSize:13}} onClick= {() => DeletePlayer(item.Name)} >{index + 1} : {item.Name}</p>))}</p>) : (null)
      }    
    
      <button type="button" onClick={SubmittedFunc} class="btn btn-primary" style={{width:'20rem',marginBottom:'5%',marginTop:'5%',fontSize:20}}>
        Calculate Results
      </button>

  </div>
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
  <div className="ui large text loader">Loading Squad 2's Data</div>
</div>
<p></p>
<p></p>   
<p></p>
</div>

);

}
}


export default TeamBPlayer;