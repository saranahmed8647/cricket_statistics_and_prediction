// import React, { useState ,useEffect } from 'react';
// import { SafeAreaView,ActivityIndicator,View, FlatList, Text, StatusBar, Button, TextInput, TouchableOpacity  } from 'react-native';
// import axios from "axios";
// import { DataTable } from 'react-native-paper';


// export default function PredictionData({route,navigation})
// {
  
//   const [TeamsData, setTeamData] = useState("");
//   const [Errors, SetErrors] = useState("");
//   const [out_status,setout_status] = useState("");
//   const [toRender, settoRender] = useState(false);
//   const [Winner, setWinner] = useState("");

//   const [Team_1_name, setTeam1Name] = useState("");
//   const [Team_2_name, setTeam2Name] = useState("");
//   const [Venue_name, setVenueName] = useState("");
  
  
//   useEffect(()=>
//   {
    
//     const name = (route.params.user);

//    setTeam1Name(name.Team1);
//    setTeam2Name(name.Team2);
//    setVenueName(name.Venue);
//     console.log("Gotten team 1 :" + name.Team1)
//     console.log("Gotten team 2 :" + name.Team2)
//    const body_data = 
//    {
//        Team1: name.Team1,
//        Team2: name.Team2
//    }

//    axios.post("http://192.168.0.107:5000/predict/team",body_data)
//     .then(json =>
//         {   
//           console.log(`JSON status : ${json.status}`);
//             if(json.status === 200)
//             {
//                 var fetched_data = json.data;
//                 setTeamData(fetched_data);    
//                 console.log(`Gotten Data : ${fetched_data}`);
//             }
//         })
//   .catch(function (error) {
//     alert('Unable to fetch data from server at the moment')
//     console.log(`Failed to get prediction data : ${error}`);
//     navigation.navigate('Home');
    
    
    
//   });



//   // DataSetter();
//   let timer1=setTimeout(() => {
//     settoRender(true);
     
//  }, 50000);

//  return () => {
//   clearTimeout(timer1)
// }

//    },[]);

  
//    if(toRender)
//    {
//      console.log(`Team 1 : ${Team_1_name}`);
//      console.log(`Team 2 : ${Team_2_name}`);
//      console.log(`Venue : ${Venue_name}`);
//      console.log(`Winner  : ${TeamsData}`);
//      return (
 
//        <View style={{height:'100%',backgroundColor:'#fff'}}>

//         <DataTable style={{margin:15}}>
//           <DataTable.Header>
//             <DataTable.Title>Team</DataTable.Title>
//             <DataTable.Title>Data</DataTable.Title>
//           </DataTable.Header>
//           <DataTable.Row>
//             <DataTable.Cell>Team A</DataTable.Cell>
//             <DataTable.Cell>{Team_1_name}</DataTable.Cell>
//           </DataTable.Row>
//           <DataTable.Row>
//             <DataTable.Cell>Team B</DataTable.Cell>
//             <DataTable.Cell>{Team_2_name}</DataTable.Cell>
//           </DataTable.Row>
//           <DataTable.Row>
//             <DataTable.Cell>Venue</DataTable.Cell>
//             <DataTable.Cell>{Venue_name}</DataTable.Cell>
//           </DataTable.Row>
//           <DataTable.Row>
//             <DataTable.Cell>Winner</DataTable.Cell>
//             <DataTable.Cell>{TeamsData}</DataTable.Cell>
//           </DataTable.Row>
//         </DataTable>
//        </View>
   
//      );
   
 
//    }
//    else
//    {
//      return(
// <View style={{ alignItems:'center',justifyContent: 'center',flex: 1,backgroundColor: '#009387'}}>
//     <ActivityIndicator size="large" color="#fff" />
// </View>
//      );
//    }
 

// }


































import React, { useState ,useEffect } from 'react';
import { SafeAreaView,ActivityIndicator,View, FlatList, Text, StatusBar, Button, TextInput, TouchableOpacity  } from 'react-native';
import axios from "axios";
import { DataTable } from 'react-native-paper';


export default function PredictionData({route,navigation})
{
  
  const [TeamsData, setTeamData] = useState("");
  const [Errors, SetErrors] = useState("");
  const [out_status,setout_status] = useState("");
  const [toRender, settoRender] = useState(false);
  const [Winner, setWinner] = useState("");

  const [Team_1_name, setTeam1Name] = useState("");
  const [Team_2_name, setTeam2Name] = useState("");
  const [Venue_name, setVenueName] = useState("");
  const [Winning_Percentage, setWinning_Percentage] = useState("");
  
  
  useEffect(()=>
  {
    
    const name = (route.params.user);

   setTeam1Name(name.Team1);
   setTeam2Name(name.Team2);
   setVenueName(name.Venue);
    console.log("Gotten team 1 :" + name.Team1)
    console.log("Gotten team 2 :" + name.Team2)
   const body_data = 
   {
       Team1: name.Team1,
       Team2: name.Team2,
       Venue: name.Venue
   }

   axios.post("http://192.168.0.107:5000/predict/team",body_data)
    .then(json =>
        {   
          
            if(json.status === 200)
            {
                var fetched_data = json.data;
                setTeamData(fetched_data);    
                console.log(`Gotten Data : ${fetched_data}`);
                axios.post("http://192.168.0.107:5000/predict/teamPercentage",body_data)
                .then(user =>
                  {
                    if(user.status === 200)
                    {
                      setWinning_Percentage((user.data * 100).toFixed(3));
                      
                    }
                  })
                  .catch(function (error) {
                    alert('Unable to fetch data from server at the moment')
                    console.log(`Failed to get prediction data : ${error}`);
                    navigation.navigate('Home');
                    
                  });

            }
        })
  .catch(function (error) {
    alert('Unable to fetch data from server at the moment')
    console.log(`Failed to get prediction data : ${error}`);
    navigation.navigate('Home');
    
  });



  // DataSetter();
  let timer1=setTimeout(() => {
    settoRender(true);
     
 }, 55000);

 return () => {
  clearTimeout(timer1)
}

   },[]);

  
   if(toRender)
   {
     console.log(`Team 1 : ${Team_1_name}`);
     console.log(`Team 2 : ${Team_2_name}`);
     console.log(`Venue : ${Venue_name}`);
     console.log(`Winner  : ${TeamsData}`);
     return (
 
       <View style={{height:'100%',backgroundColor:'#fff'}}>

        <DataTable style={{margin:15}}>
          <DataTable.Header>
            <DataTable.Title>Team</DataTable.Title>
            <DataTable.Title>Data</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Team A</DataTable.Cell>
            <DataTable.Cell>{Team_1_name}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Team B</DataTable.Cell>
            <DataTable.Cell>{Team_2_name}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Venue</DataTable.Cell>
            <DataTable.Cell>{Venue_name}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Winner</DataTable.Cell>
            <DataTable.Cell>{TeamsData}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Winning Percentage </DataTable.Cell>
            <DataTable.Cell>{Winning_Percentage} % </DataTable.Cell>
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
