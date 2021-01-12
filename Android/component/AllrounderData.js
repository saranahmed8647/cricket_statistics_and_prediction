import React, { useState,useEffect } from 'react';
import { SafeAreaView,View, FlatList,ActivityIndicator, Text, StatusBar,ScrollView, Button, TextInput, TouchableOpacity  } from 'react-native';
import axios from "axios";
import { DataTable } from 'react-native-paper';


import { Dimensions } from 'react-native';
import {LineChart} from "react-native-chart-kit";

export default function AllrounderData({route,navigation})
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

  axios.post("http://192.168.0.107:5000/player/allrounders/one",body_data)
    .then(json =>
        {   
            if(json.status === 200)
            {
                var fetched_data = json.data[0];
                if(fetched_data.name === ""){
                  console.log("allrounder name not found")
                }
                else{setTeamData(fetched_data);}
                
            }
        })
  .catch(function (error) {
    SetErrors(error);
    alert("All-rounder not FOUND!")
    navigation.navigate("Viewsingleallrounder");
    
  });

  // DataSetter();
  let timer1=setTimeout(() => {
    settoRender(true);
     
 }, 18000);


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
            <DataTable.Cell>Batting Runs</DataTable.Cell>
            <DataTable.Cell>{TeamsData.batting_runs}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Debut Year</DataTable.Cell>
            <DataTable.Cell>{TeamsData.span.starting_year}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Final Year Played In</DataTable.Cell>
            <DataTable.Cell>{TeamsData.span.ending_year}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Batting Average</DataTable.Cell>
            <DataTable.Cell>{TeamsData.batting_average}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Hundreds</DataTable.Cell>
            <DataTable.Cell>{TeamsData.hundreds}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Wickets</DataTable.Cell>
            <DataTable.Cell>{TeamsData.wickets}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Highest Score</DataTable.Cell>
            <DataTable.Cell>{TeamsData.highest_score.out ? <Text>{TeamsData.highest_score.highest_runs}</Text> :  <Text>{TeamsData.highest_score.highest_runs} *</Text>}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Wicket Keeper</DataTable.Cell>
            <DataTable.Cell>{String(TeamsData.wicket_keeper)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Best Bowling Figure R/W</DataTable.Cell>
            <DataTable.Cell>{TeamsData.best_figures.runs}  /  {TeamsData.best_figures.wickets}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Bowling Average</DataTable.Cell>
            <DataTable.Cell>{TeamsData.bowling_average}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Five Wickets</DataTable.Cell>
            <DataTable.Cell>{TeamsData.five_wickets}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Average Difference</DataTable.Cell>
            <DataTable.Cell>{TeamsData.average_difference}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>






        <LineChart
    data={{
      labels: ["matches",'bat_avg','bowl_avg','avg_diff'],
      datasets: [
        {
          data: [TeamsData.matches,TeamsData.batting_average,TeamsData.bowling_average,TeamsData.average_difference]
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
  








