import React, { useState ,useEffect } from 'react';
import { SafeAreaView,View, FlatList,ActivityIndicator, Text, StatusBar,ScrollView, Button, TextInput, TouchableOpacity  } from 'react-native';
import Batsmen_List from "../batsmen.json";
import Bowlers_List from "../bowler.json";

export default function TeamA( {route,navigation})
{
  const [Team_1_name, setTeam1Name] = useState("");
  const [Team_2_name, setTeam2Name] = useState("");
  const [Venue, setVenue] = useState(2);
  const [Toss, setToss] = useState(0);
  const [selectedSquad,setselectedSquad] = useState([]);
  const [torender , settoRender] = useState(false);

  useEffect(()=>
  {
    // const name = (props.route.params.user);
    const name = (route.params.user);
    setTeam1Name(name.Team1);            
    setTeam2Name(name.Team2);
    setVenue(name.Venue);            
    setToss(name.Toss); 
    
    let timer1=setTimeout(() => {
      settoRender(true); 
   }, 3000);
   return () => {
    clearTimeout(timer1)
  }
  
  },[])

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


  const SubmittedFunc = () =>
    {

      if(selectedSquad.length < 11)
      {
        alert("You need to select 11 players to Continue");
        console.log("You need to select 11 players to Continue");
      }
      else if(selectedSquad.length > 11)
      {
        alert("You need to only 11 players to Continue");
        console.log("You need to only 11 players to Continue")
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

        if(count < 5)
        {
          alert("You need to select A minimum of 5 Bowlers");
          console.log("You need to select A minimum of 5 Bowlers")
        }
        else
        {
          // Move to Team B
          const team_data = 
            {
            
                Team1: Team_1_name,
                Team2: Team_2_name,
                Venue: Venue,
                Toss : Toss,
                Squad1 : selectedSquad   
            
            }
                    
            navigation.navigate('TeamB',{ user: team_data  });

        }
      }
    }

  const AddPlayers = (Name, player_type) =>
    {
      
      
      if(selectedSquad.length < 11)
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
          // Do nothing
          console.log();
        
        } 
        else 
        {
          setselectedSquad([...selectedSquad ,{"Name" : Name, "Type" :player_type}]);
          // add item
        }
        

      }
      else if(selectedSquad.length === 11)
      {
        // Add this Alert here  alert("Cant add more than 11 Players");
        console.log("Cant add more than 11 Players");
        alert('Unable to add more than 11 Players')
      }
      
    }



    const renderedBatsmen =  Batsmen_List.filter(name => name["Country"] === Team_1_name).map((batsman,index) =>  {
      return (
        <TouchableOpacity 
          style={{
            marginTop:10,
            backgroundColor:'#009387',
            padding:15,
            borderRadius:15
          }} 
          key={index} 
          onPress={() =>AddPlayers(batsman.Name , "Batsman")}>
          
            <Text style={{color: '#fff'}}>{batsman.Name}</Text>
            
        </TouchableOpacity>
      );
    });


    const renderedBowlers =  Bowlers_List.filter(name => name["Country"] === Team_1_name).map((bowler,index) => {
      return( 
        <TouchableOpacity
          style={{
            marginTop:10,
            backgroundColor:'#009387',
            padding:15,
            borderRadius:15
          }} 
          key={index}  
          onPress={() =>AddPlayers(bowler.Name , "Bowler")}>

            <Text style={{color: '#fff'}}>{bowler.Name}</Text>
        </TouchableOpacity>
      );
    });

    if(torender){
    return (
      <View style={{flex:1,backgroundColor:'#fff',alignItems:'center'}}>
        <Text style={{marginTop:20, fontSize:18,fontWeight:'bold'}}>Team - A : {Team_1_name}</Text>

        <View style={{flex:2, flexDirection:"row"}}>
          <View style={{flex: 1, alignItems:'center', height:'95%'}}>
            <Text style={{marginTop:25, marginBottom:15}}>Batsmen</Text>

            <ScrollView showsVerticalScrollIndicator={false}>{renderedBatsmen}</ScrollView>
          </View>
          <View style={{flex: 1, alignItems:'center',height:'95%'}}>
            <Text style={{marginTop:25, marginBottom:15}}>Bowlers</Text>

            <ScrollView showsVerticalScrollIndicator={false}>{renderedBowlers}</ScrollView>
          </View>
        </View>
        <Text style={{fontWeight:'bold',color:'black',fontSize:20}}>Selected Players</Text>
        <Text style={{fontWeight:'bold'}}>Batsman = Blue --- Bowler = Green</Text>
        <View style={{width:'90%',height:'20%', borderWidth:2,borderColor:"#009387",borderRadius:10,alignItems:'center'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginTop:10,marginBottom:10}}>

    {
        
        (selectedSquad.length > 0) ? (<View>{selectedSquad.map((item, index) => (item.Type === "Batsman") ?(
     <TouchableOpacity   onPress= {() => DeletePlayer(item.Name)} key={index} ><Text style = {{"color" : "blue"}} >{item.Name}</Text></TouchableOpacity>
  ) : (<TouchableOpacity   onPress= {() => DeletePlayer(item.Name)} key={index} ><Text style = {{"color" : "green"}}>{item.Name}</Text></TouchableOpacity>))}</View>) : (null)
    }       

            </View>

          </ScrollView>

        </View>
        <View style={{marginTop:25,marginBottom:25}}>
          <TouchableOpacity
            style={{
              marginTop:10,
              backgroundColor:'#009387',
              padding:15,
              borderRadius:15
            }} 
            onPress={SubmittedFunc}
          >
            <Text style={{color: '#fff'}}>
              Select Team - B Players
            </Text>
          </TouchableOpacity>

        </View>
      </View>

    );
  }
  else
  {
    return(
<View style={{ alignItems:'center',justifyContent: 'center',flex: 1,backgroundColor: '#009387'}}>
    <ActivityIndicator size="large" color="#fff" />
</View>
    );

  }
}