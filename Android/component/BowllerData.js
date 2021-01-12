import React, { useState,useEffect } from 'react';
import { SafeAreaView,ActivityIndicator,View, FlatList,ScrollView, Text, StatusBar, Button, TextInput, TouchableOpacity  } from 'react-native';
import axios from "axios";
import { DataTable } from 'react-native-paper';


import { Dimensions } from 'react-native';
import {LineChart} from "react-native-chart-kit";


export default function BowllerData({route,navigation})
{
  
  const [TeamsData, setTeamData] = useState({});
  const [Errors, SetErrors] = useState("");
  const [out_status,setout_status] = useState("");
  const [toRender, settoRender] = useState(false);
 
  
  useEffect(()=>
  {
    
    const name = (route.params.user);

    const body_data = {
      name:name
  }

  axios.post("http://192.168.0.107:5000/player/bowlers/one",body_data)
    .then(json =>
        {   
            if(json.status === 200)
            {
                var fetched_data = json.data[0];
                if(fetched_data.name === ""){
                  console.log("bowler name not found")
                }
                else{setTeamData(fetched_data);}
                
            }
        })
  .catch(function (error) {
    SetErrors(error);
    alert("Bowler not FOUND!")
    navigation.navigate("Viewsinglebowller");
    
  });

  // DataSetter();
  let timer1 = setTimeout(() => {
    settoRender(true);
     
 }, 12000);


 return () => {
  clearTimeout(timer1)
}

   },[]);


   


  
   if(toRender)
   {
     
     return (
      
      
       <View style={{backgroundColor:"#fff",height:'100%'}}
       >

      <ScrollView showsVerticalScrollIndicator ={false}>
        <DataTable style={{marginTop:'5%'}}>
          <DataTable.Header>
            <DataTable.Title>Player</DataTable.Title>
            <DataTable.Title>Data</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Name</DataTable.Cell>
            <DataTable.Cell>{TeamsData.name}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Country</DataTable.Cell>
            <DataTable.Cell>{TeamsData.country}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Matches</DataTable.Cell>
            <DataTable.Cell>{TeamsData.matches}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Debut Year</DataTable.Cell>
            <DataTable.Cell>{TeamsData.span.starting_year}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Final Year played in</DataTable.Cell>
            <DataTable.Cell>{TeamsData.span.ending_year}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Total Innings Played</DataTable.Cell>
            <DataTable.Cell>{TeamsData.innings}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Total balls delivered</DataTable.Cell>
            <DataTable.Cell> {TeamsData.balls_delivered}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Total runs conceded</DataTable.Cell>
            <DataTable.Cell>{TeamsData.runs_conceded}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Wicket Keeper</DataTable.Cell>
            <DataTable.Cell>{String(TeamsData.wicket_keeper)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Total wickets</DataTable.Cell>
            <DataTable.Cell>{TeamsData.wickets}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Best Bowling figures W/R</DataTable.Cell>
            <DataTable.Cell>{TeamsData.best_figures.wickets}  / {TeamsData.best_figures.runs}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Bowling Average</DataTable.Cell>
            <DataTable.Cell>{TeamsData.bowling_average}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Economy</DataTable.Cell>
            <DataTable.Cell>{TeamsData.economy}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Bowling Strikerate</DataTable.Cell>
            <DataTable.Cell>{TeamsData.bowling_strikerate}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>4 Wickets</DataTable.Cell>
            <DataTable.Cell>{TeamsData.four_wickets}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>5 Wickets</DataTable.Cell>
            <DataTable.Cell>{TeamsData.five_wickets}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
{/* 





        <LineChart
    data={{
      labels: ["matches", "inn", "total_Wi", "avg",'econ','s_rate'],
      datasets: [
        {
          data: [TeamsData.matches,TeamsData.innings,TeamsData.wickets,TeamsData.bowling_average,TeamsData.economy,TeamsData.bowling_strikerate]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
 */}






        </ScrollView>
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
