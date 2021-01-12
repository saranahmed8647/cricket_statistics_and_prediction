import React, { useState,useEffect } from 'react';
import { SafeAreaView,View, ActivityIndicator,FlatList, Text,Image,StatusBar,Button, TextInput, TouchableOpacity  } from 'react-native';
import { Card } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import syncStorage from 'sync-storage';
import axios from "axios";

function descending( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

function ascending( a, b ) {
  if ( a.name < b.name ){
    return 1;
  }
  if ( a.name > b.name ){
    return -1;
  }
  return 0;
}

export default function Viewmultipleteam({navigation})
{

  const [loginStatus, setLoginStatus] = useState(0);
  const [TeamsData,setTeamsData] = useState([]);
  const [TeamError,setTeamError] = useState("");
  const [isAscending, setIsAscending] = useState(false);


  useEffect(() =>
  {
    const token = syncStorage.get("user_id");
    if(token)
    {
      axios.get(`http://192.168.0.107:5000/account/verify?token=${token}`)
            // .then(res =>res.json())
                .then(json =>
                    {
                        if(json.status === 200)
                        {
                            console.log("Token verification successful");
                            setLoginStatus(1);
                        }
                        else
                        {
                            console.log("Token verification failed");
                            setLoginStatus(2);
                            
                        }
                    })
            
    }
    else
        {
            // no token
            setLoginStatus(3);
        }


        axios.get('http://192.168.0.107:5000/team')
            //   .then(res =>res.data.JSON())
                .then(json =>
                    {   
                        if(json.status === 200)
                        {
                            let fetched_data = json.data;
                            setTeamsData(fetched_data);
                            
                            
                        }
                    })
              .catch(function (error) {
                
                setLoginStatus(4);
                setTeamError(error);
              });
  },[])



// Successful login
if(loginStatus === 1)
{
  return (

    <View style={{backgroundColor:'#fff',height:'100%'}}> 
      <TouchableOpacity 
        style={{marginLeft:'47%'}}

        onPress={() => {
          if (isAscending) {
            setTeamsData(TeamsData.sort(descending));
            setIsAscending(false);
          } else {
            setTeamsData(TeamsData.sort(ascending));
            setIsAscending(true);
          }
        }}
        
      >
        <Text style={{fontSize:30,fontWeight:'bold',color:'#8c8c8c'}}>...</Text>
      </TouchableOpacity>

      <Animatable.View style={{}} animation='fadeInDownBig'>

        <FlatList 
          showsVerticalScrollIndicator ={false}
          keyExtractor={(item)=>item.name}
          data={TeamsData}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('TeamData',{ user: item.name  })}>
              <Card style={{marginBottom:10}}>
                <View style={{ alignItems: 'center',flex: 2,flexDirection:'row'}}>
                  <Image style={{height:70,width:70}} source={require('../assets/team.png')}/>
                  <Text style={{color:'#808000',fontWeight:'bold',fontSize:15,textAlign:'center',padding:10,margin:5}}>{item.name}</Text>
                </View>  
              </Card>
            
            </TouchableOpacity>

          )}
        
        />
      </Animatable.View>

    </View>

  );

}
else if(loginStatus === 2)
{
  return(
    // <View style={{marginTop:20}}>
    // <Text style={{fontSize:30 ,color:'#841584'}}>Wrong Credentials</Text>
    // <TouchableOpacity 
    //     style={{alignItems: "center",backgroundColor: "#841584",padding: 10}}      
    //     onPress={() => navigation.navigate('Home', { screen: 'Home' })}
    //     >
    //     <Text style={{color:'white', fontSize:15}}>Go back to Home</Text>
    // </TouchableOpacity>
    // </View>

    <View style={{ alignItems:'center',justifyContent: 'center',flex: 1,backgroundColor: '#009387'}}>
    
      <View style={{
          width: 150 * 2,
          height: 150,
          borderWidth: 4,
          borderColor: "#fff",
          borderRadius: 6,
          alignItems:'center',
          justifyContent: 'center',
      }}>
          <Text style={{color:'#fff',marginLeft:30, marginRight:30,fontSize:15,fontWeight:'bold'}}>WAIT!!!{"\n\n"}Wrong Credentials.{"\n\n"}Thanks!</Text>
      
          <TouchableOpacity
        onPress={() =>navigation.navigate("Signin")}
    >
        <Text style={{color:'#fff',fontWeight:'bold'}}>Go Back to Sign-In</Text>
    </TouchableOpacity>
      
      
      
      </View>

    </View>





  );
}
else if(loginStatus === 3)
{
  return(
    // <View style={{marginTop:20}}>
    // <Text style={{fontSize:30 ,color:'#841584'}}>Please login to see this screen</Text>
    // <TouchableOpacity 
    //     style={{alignItems: "center",backgroundColor: "#841584",padding: 10}}      
    //     onPress={() => navigation.navigate('Home', { screen: 'Home' })}
    //     >
    //     <Text style={{color:'white', fontSize:15}}>Go back to Home</Text>
    // </TouchableOpacity>
    // </View>

    <View style={{ alignItems:'center',justifyContent: 'center',flex: 1,backgroundColor: '#009387'}}>
    
      <View style={{
          width: 150 * 2,
          height: 150,
          borderWidth: 4,
          borderColor: "#fff",
          borderRadius: 6,
          alignItems:'center',
          justifyContent: 'center',
      }}>
          <Text style={{color:'#fff',marginLeft:30, marginRight:30,fontSize:15,fontWeight:'bold'}}>WARNING!!!{"\n\n"}Access denied. Please login first to application in order to view this screen{"\n\n"}Thanks!</Text>
      
          <TouchableOpacity
        onPress={() =>navigation.navigate("Signin")}
    >
        <Text style={{color:'#fff',fontWeight:'bold'}}>Go Back to Sign-In</Text>
    </TouchableOpacity>
      
      </View>

    </View>

  );
}

else
{
 
  // <View style={{marginTop:20}}>
  //   <Text style={{fontSize:30 ,color:'#841584'}}>Failed to load Bowler's Data</Text>
  //   <TouchableOpacity 
  //       style={{alignItems: "center",backgroundColor: "#841584",padding: 10}}      
  //       onPress={() => navigation.navigate('Home', { screen: 'Home' })}
  //       >
  //       <Text style={{color:'white', fontSize:15}}>Go back to Home</Text>
  //   </TouchableOpacity>
  // </View>


  
    <View style={{ alignItems:'center',justifyContent: 'center',flex: 1,backgroundColor: '#009387'}}>
    
      <View style={{
          width: 150 * 2,
          height: 150,
          borderWidth: 4,
          borderColor: "#fff",
          borderRadius: 6,
          alignItems:'center',
          justifyContent: 'center',
      }}>
          <Text style={{color:'#fff',marginLeft:30, marginRight:30,fontSize:15,fontWeight:'bold'}}>SORRY!!!{"\n\n"}Failed to load teams's data. Try later.{"\n\n"}Thanks!</Text>
      
      
          <TouchableOpacity
        onPress={() =>navigation.navigate("Signin")}
    >
        <Text style={{color:'#fff',fontWeight:'bold'}}>Go Back to Sign-In</Text>
    </TouchableOpacity>
      
      
      
      </View>

    </View>





}
  
return(
  <View style={{ alignItems:'center',justifyContent: 'center',flex: 1,backgroundColor: '#009387'}}>
    <ActivityIndicator size="large" color="#fff" />
  </View>
);
}






    
    