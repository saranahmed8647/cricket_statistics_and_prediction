import React, { useState ,useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import { SafeAreaView,View, FlatList,ActivityIndicator, Text, StatusBar,ScrollView, Button, TextInput, TouchableOpacity  } from 'react-native';
import axios from "axios";
import Players_List from "../Players.json";

export default function SystemPredictionResult({route,navigation})
{
    const [Team_1_name, setTeam1Name] = useState("");
    const [Team_2_name, setTeam2Name] = useState("");
    const [Venue, setVenue] = useState(2);
    const [Toss, setToss] = useState(0);
    const [Team1_squad, setTeam1_squad] = useState([]);    
    const [Team2_squad,setTeam2_squad] = useState([]);
    const [TeamData , setTeamData] = useState("");
    const [torender , settoRender] = useState(false);
    
    useEffect(() =>
    {
        
        const name = (route.params.user);
        setTeam1Name(name.Team1);            
        setTeam2Name(name.Team2);
        setVenue(name.Venue);            
        setToss(name.Toss); 
        setTeam2_squad(name.Squad2);
        console.log(`Team : ${name.Team1}`);
        let filtered_players_List = []
              
        
        if(name.Team1 =="India")
        {
            filtered_players_List = Players_List.filter(name => name["Country"] == "India");    
        }
        else if(name.Team1 =="Pakistan")
        {
            filtered_players_List = Players_List.filter(name => name["Country"] == "Pakistan");    
        }
        else if(name.Team1 =="Australia")
        {
            filtered_players_List = Players_List.filter(name => name["Country"] == "Australia");    
        }
        else if(name.Team1 =="New Zealand")
        {
            filtered_players_List = Players_List.filter(name => name["Country"] == "New Zealand");    
        }
        else if(name.Team1 =="Sri Lanka")
        {
            filtered_players_List = Players_List.filter(name => name["Country"] == "Sri Lanka");    
        }
        
        else if(name.Team1 =="South Africa")
        {
            filtered_players_List = Players_List.filter(name => name["Country"] == "South Africa");    
        }
        
        else if(name.Team1 =="England")
        {
            filtered_players_List = Players_List.filter(name => name["Country"] == "England");    
        }
        else if(name.Team1 =="West Indies")
        {
            filtered_players_List = Players_List.filter(name => name["Country"] == "West Indies");    
        }
        else if(name.Team1 =="Bangladesh")
        {
            filtered_players_List = Players_List.filter(name => name["Country"] == "Bangladesh");    
        }

        
        // let filtered_players_List = Players_List.filter(name => name["Country"] == name.Team1);
        const body_data = 
                         {
                             Team1_name: name.Team1,
                             Team2_name: name.Team2,
                             Venue : name.Venue,
                             Team1_list : filtered_players_List,
                             Team2_list : name.Squad2,
                             Toss : name.Toss
                         }
                             
                     axios.post("http://192.168.0.107:5000/predict/SquadRecommendation",body_data,{timeout : 48000})
                     .then(json =>
                         {   
                             if(json.status === 200)
                             {
                                 var fetched_data = json.data;
                                 setTeamData(json.data);    
                                 
                             }
                         })
                     .catch(function (error) {
                         console.log(`Error Getting Results : ${error}`);
                     alert("Failed to get Prediction results, going to main menu");
                     
                     navigation.navigate('Home');
                     
                     });
                 
    
        
         
        
                        let timer1=setTimeout(() => {
                            settoRender(true); 
                         }, 48000);

                         return () => {
                            clearTimeout(timer1)
                          }
                       

    },[])
    
    if(torender)
    {
        let Teams_data_array = TeamData.split("\n");
        
        let winning_perc = Teams_data_array[0].split(":")[1];
    return ( 
        <View style={{backgroundColor:'#fff', height:'100%'}}>

            <DataTable style={{marginTop:15}}>
                <DataTable.Header>
                    <DataTable.Title>Team</DataTable.Title>
                    <DataTable.Title>Winning</DataTable.Title>
                </DataTable.Header>
                {/* <DataTable.Row>
                    <DataTable.Cell>Player 1 : </DataTable.Cell>
                    <DataTable.Cell>{Teams_data_array[1]}</DataTable.Cell>
                </DataTable.Row> */}
                <DataTable.Row>
                    <DataTable.Cell>{Team_1_name}</DataTable.Cell>
                    <DataTable.Cell>{winning_perc}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Toss Winner :</DataTable.Cell>
                    <DataTable.Cell>{Toss === 1 ? (<Text>{Team_1_name}</Text>) : (<Text>{Team_2_name}</Text>)}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Ground for {Team_1_name}  :</DataTable.Cell>
                    <DataTable.Cell>{Venue === 0 ? (<Text>Home</Text>) : (Venue === 1 ? (<Text>Away</Text>) : (<Text>Neutral</Text>))}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>


            <View style={{width:'90%',height:'50%', borderWidth:2,borderColor:"#009387",borderRadius:10,alignItems:'center',marginLeft:20,marginTop:60}}>
                <Text style={{marginBottom:40,marginTop:10,fontWeight:'bold',fontSize:20,color:'#800080'}}>System Recommended Squad</Text>
                    <View style={{marginBottom:10,alignItems:'center'}}>    
                        <Text style={{color:'#808080',fontWeight:'bold',fontSize:16,marginBottom:2}}>{Teams_data_array[2]}</Text>
                        <Text style={{color:'#808080',fontWeight:'bold',fontSize:16,marginBottom:2}}>{Teams_data_array[3]}</Text>
                        <Text style={{color:'#808080',fontWeight:'bold',fontSize:16,marginBottom:2}}>{Teams_data_array[4]}</Text>
                        <Text style={{color:'#808080',fontWeight:'bold',fontSize:16,marginBottom:2}}>{Teams_data_array[1]}</Text>
                        <Text style={{color:'#808080',fontWeight:'bold',fontSize:16,marginBottom:2}}>{Teams_data_array[5]}</Text>
                        <Text style={{color:'#808080',fontWeight:'bold',fontSize:16,marginBottom:2}}>{Teams_data_array[6]}</Text>
                        <Text style={{color:'#808080',fontWeight:'bold',fontSize:16,marginBottom:2}}>{Teams_data_array[7]}</Text>
                        <Text style={{color:'#808080',fontWeight:'bold',fontSize:16,marginBottom:2}}>{Teams_data_array[8]}</Text>
                        <Text style={{color:'#808080',fontWeight:'bold',fontSize:16,marginBottom:2}}>{Teams_data_array[9]}</Text>
                        <Text style={{color:'#808080',fontWeight:'bold',fontSize:16,marginBottom:2}}>{Teams_data_array[10]}</Text>
                        <Text style={{color:'#808080',fontWeight:'bold',fontSize:16,marginBottom:2}}>{Teams_data_array[11]}</Text>






                    </View>

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
