import React,{ useState, useEffect } from 'react';

import { useHistory } from "react-router-dom";
import Toolbar from "../../Toolbar/Toolbar.component";
import SideDrawer from "../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../Backdrop/Backdrop.component";


const SingleRecommendationMain = () => 
{

    
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    const history = useHistory();
   
    const [Team_1_name, setTeam1Name] = useState("");
    const [Team_2_name, setTeam2Name] = useState("");
    const [Venue, setVenue] = useState(2);
    const [Toss, setToss] = useState(0);

    const [ teamDataErrors, setTeamDataErrors] = useState([]);

    const worldcup_teams = ["India", "Pakistan", "Australia" , "New Zealand" , 
    "Sri Lanka", "South Africa", "England" , "West Indies" , "Bangladesh"]
           

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

    const changeTeam1Name = (e) =>
    {
        setTeam1Name(e.target.value.trim());
        console.log(e.target.value.trim());
    }
    const changeTeam2Name = (e) =>
    {
        setTeam2Name(e.target.value.trim());
        console.log(e.target.value.trim());
    }
    const changeVenue = (e) =>
    {
        setVenue(Number(e.target.value));
        console.log(Number(e.target.value));
    }
    const changeToss = (e) =>
    {
        setToss(Number(e.target.value));
        console.log(Number(e.target.value));
    }


    const TeamHandler = (e) => 
    {
        e.preventDefault();

        if(Team_1_name === Team_2_name)
        {
        
            setTeamDataErrors([...teamDataErrors,"You must select 2 different Teams"]);
        
        }
        else if ((Team_1_name === "") || (Team_2_name === "")) 
        {
            setTeamDataErrors([...teamDataErrors,"You must select both Teams"]);
        }
        else
        {
            
                history.push({
                    pathname : '/TeamAPlayer',
                    team_data :{
                        Team1: Team_1_name,
                        Team2: Team_2_name,
                        Venue: Venue,
                        Toss : Toss   
                    }
                    } 
                  );
            

        }
    
    }
    return ( 

        <div style={{height:"100%"}}>
        <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}
        <br /><br /><br /><br /><br />

        <div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui image header">
      <div class="content">
        Please choose 2 teams, venue and toss for this Match
      </div>
    </h2>
    <form action="post" onSubmit={TeamHandler} class="ui large form">
      <div class="ui stacked secondary  segment">



        <div class="field">
          <div class="ui left icon input">
          <span style={{fontSize:13}}>Team - A : </span>
            
            <select onChange={changeTeam1Name} value={Team_1_name} style={{width: "50%",fontSize:12,marginLeft:100,outline:'none'}}>
            {worldcup_teams.map(key => (
              <option key={key} value = {key}  >{key}</option>
            ))}
            </select>
            
            
          </div>
        </div>





        <div class="field">
          <div class="ui left icon input">
          <span style={{fontSize:13}}>Team - B : </span>
            <select onChange={changeTeam2Name} value={Team_2_name} style={{width: "50%",fontSize:12,marginLeft:100,outline:'none'}}>
            {worldcup_teams.map(key => (
              <option key={key} value = {key}  >{key}</option>
            ))}
            </select>


          </div>
        </div>







        <div class="field">
          <div class="ui left icon input">
          <span style={{fontSize:13}}>Select Ground Type :</span>
            <select  onChange={changeVenue} value={Venue} style={{width: "50%",fontSize:12,marginLeft:38,outline:'none'}}>
                
                <option value="0">Home</option>
                <option value="1">Away</option>
                <option value="2">Neutral</option>

            </select>


          </div>
        </div>






        <div class="field">
          <div class="ui left icon input">
          <span style={{fontSize:13}}>Select Toss Result :</span>
            <select  onChange={changeToss} value={Toss} style={{width: "50%",fontSize:12,marginLeft:50,outline:'none'}}>
                
                <option value="1">Team A</option>
                <option value="0">Team B</option>
                

            </select>


          </div>
        </div>




         <button
             type='submit'
             className='btn btn-primary btn-lg btn-block  form-control'
          >Select Team-A Squad
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
 
export default SingleRecommendationMain;