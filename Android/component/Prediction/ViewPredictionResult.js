import React, { useState ,useEffect } from 'react';
import { SafeAreaView,View, FlatList,ActivityIndicator, Text, StatusBar,ScrollView, Button, TextInput, TouchableOpacity  } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from "axios";


export default function ViewPredictionResult({route,navigation})
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
        setTeam1_squad(name.Squad1);
        setTeam2_squad(name.Squad2);

        const body_data = 
                            {
                                Team1_name: name.Team1,
                                Team2_name: name.Team2,
                                Venue : name.Venue,
                                Team1_list : name.Squad1,
                                Team2_list : name.Squad2,
                                Toss : name.Toss
                            }
                                
                        axios.post("http://192.168.0.107:5000/predict/SquadWin",body_data,{timeout : 48000})
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
        console.log("..............");
        console.log((Teams_data_array));
    return ( 
        <View style={{backgroundColor:'#fff', height:'100%'}}>

        <DataTable style={{marginTop:15}}>
            <DataTable.Header>
                <DataTable.Title>Model Name </DataTable.Title>
                <DataTable.Title>Winner Team / Winning Percentage</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
                <DataTable.Cell>Decision Tree : </DataTable.Cell>
                <DataTable.Cell>{(Teams_data_array[0].trim() == "1") ? (<Text>{Team_1_name}</Text>) : (<Text>{Team_2_name}</Text>)} <Text> / {parseFloat(Teams_data_array[1]).toFixed(3)} %</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>Guassian :</DataTable.Cell>
                <DataTable.Cell>{(Teams_data_array[2].trim() == "1") ? (<Text>{Team_1_name}</Text>) : (<Text>{Team_2_name}</Text>)} <Text> / {parseFloat(Teams_data_array[3]).toFixed(3)} %</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>Logistic Regression :</DataTable.Cell>
                <DataTable.Cell>{(Teams_data_array[4].trim() == "1") ? (<Text>{Team_1_name}</Text>) : (<Text>{Team_2_name}</Text>)} <Text> / {parseFloat(Teams_data_array[5]).toFixed(3)} %</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>SVM : </DataTable.Cell>
                <DataTable.Cell>{(Teams_data_array[6].trim() == "1") ? (<Text>{Team_1_name}</Text>) : (<Text>{Team_2_name}</Text>)} <Text> / {parseFloat(Teams_data_array[7]).toFixed(3)} %</Text></DataTable.Cell>
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
