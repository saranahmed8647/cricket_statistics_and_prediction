import React, { useState,useEffect } from 'react';
import { SafeAreaView,ActivityIndicator,View, FlatList, Text, StatusBar, Button, TextInput, TouchableOpacity  } from 'react-native';
import axios from "axios";
import { DataTable } from 'react-native-paper';

import { Dimensions } from 'react-native';
import {LineChart} from "react-native-chart-kit";

export default function TeamData({route,navigation})
{
  const [TeamsData, setTeamData] = useState({});
  const [Errors, SetErrors] = useState("");
  useEffect(()=>
  {
    
    const name = (route.params.user);

    const body_data = {
      name:name
  }

  axios.post("http://192.168.0.107:5000/team/team",body_data)
    .then(json =>
        {   
            if(json.status === 200)
            {
              var fetched_data = json.data[0];
              if(fetched_data.name === ""){
                console.log('team name not found')
              }
              else{
                setTeamData(fetched_data);
              }

            }

        })
  .catch(error =>
    {
      SetErrors(error);
      alert('Team not FOUND!')
      navigation.navigate("Viewsingleteam");

  });

    

},[])
  
  return (

    <View style={{backgroundColor:"#fff",height:'100%'}}>

      <DataTable style={{marginTop:'5%'}}>
        <DataTable.Header>
          <DataTable.Title>Team</DataTable.Title>
          <DataTable.Title>Data</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>Name</DataTable.Cell>
          <DataTable.Cell>{TeamsData.name}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Matches</DataTable.Cell>
          <DataTable.Cell>{TeamsData.matches}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Won</DataTable.Cell>
          <DataTable.Cell>{TeamsData.won}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Lost</DataTable.Cell>
          <DataTable.Cell>{TeamsData.lost}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Tied</DataTable.Cell>
          <DataTable.Cell>{TeamsData.tied}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>No Result</DataTable.Cell>
          <DataTable.Cell>{TeamsData.no_result}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Winning Percentage % </DataTable.Cell>
          <DataTable.Cell>{TeamsData.percentage}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>










      <LineChart
    data={{
      labels: ["matches", "won", "lost", "tied", "no result"],
      datasets: [
        {
          data: [TeamsData.matches,TeamsData.won,TeamsData.lost,TeamsData.tied,TeamsData.no_result]
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
    </View>

  );
}






