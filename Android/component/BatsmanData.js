import React, { useState,useEffect } from 'react';
import { SafeAreaView,ActivityIndicator,View, FlatList,ScrollView, Text, StatusBar, Button, TextInput, TouchableOpacity  } from 'react-native';
import axios from "axios";
import { DataTable } from 'react-native-paper';



import { Dimensions } from 'react-native';
import {LineChart} from "react-native-chart-kit";

export default function BatsmanData({route,navigation})
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

  axios.post("http://192.168.0.107:5000/player/batsmen/one",body_data)
    .then(json =>
        {   
            if(json.status === 200)
            {
                var fetched_data = json.data[0];
                if(fetched_data.name === ""){
                  console.log("batsman not found")
                  
                }
                else{
                  setTeamData(fetched_data);
                }
                
                
            }
        })
  .catch(function (error) {
    SetErrors(error);
    alert('Batsman not FOUND!')
    navigation.navigate("Viewsinglebatsman");
    
  });

  // DataSetter();
  let timer1=setTimeout(() => {
    settoRender(true);
     
 }, 15000);


 
 return () => {
  clearTimeout(timer1)
}

   },[]);

   if(toRender)
   {
     
     return (
 
       <View style={{backgroundColor:"#fff",height:'100%'}}>


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
            <DataTable.Cell>{TeamsData.runs}</DataTable.Cell>
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
            <DataTable.Cell>Average</DataTable.Cell>
            <DataTable.Cell>{TeamsData.average}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Balls Faced</DataTable.Cell>
            <DataTable.Cell>{TeamsData.balls_faced}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Highest Runs</DataTable.Cell>
            <DataTable.Cell>{TeamsData.highest_score.out ? <Text>{TeamsData.highest_score.highest_runs}</Text> :  <Text>{TeamsData.highest_score.highest_runs}  * </Text>}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Wicket Keeper</DataTable.Cell>
            <DataTable.Cell>{String(TeamsData.wicket_keeper)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Total Ducks</DataTable.Cell>
            <DataTable.Cell>{TeamsData.ducks}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Total Fifty's Scored</DataTable.Cell>
            <DataTable.Cell>{TeamsData.fiftys}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Total Hundreds Scored</DataTable.Cell>
            <DataTable.Cell>{TeamsData.hundreds}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Total Innings Played</DataTable.Cell>
            <DataTable.Cell>{TeamsData.innings}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Innings Played as Not Out</DataTable.Cell>
            <DataTable.Cell>{TeamsData.not_outs}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Strike Rate</DataTable.Cell>
            <DataTable.Cell>{TeamsData.strike_rate}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>




        <LineChart
    data={{
      labels: ["match", "avg", "0s", "50s",'100s','inn','not out','s_rate'],
      datasets: [
        {
          data: [TeamsData.matches,TeamsData.average,TeamsData.ducks,TeamsData.fiftys,TeamsData.hundreds,TeamsData.innings,TeamsData.not_outs,TeamsData.strike_rate]
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
























