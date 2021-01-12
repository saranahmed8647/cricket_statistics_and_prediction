import React from 'react';
import { StyleSheet,Text,Button,ActivityIndicator, View,TextInput,Picker,TouchableOpacity } from 'react-native';
import { useState,useEffect } from 'react';
import syncStorage from 'sync-storage';
import axios from "axios";
import * as Animatable from 'react-native-animatable';

export default function Prediction({navigation})
{
    const [Team_1_name, setTeam1Name] = useState("");
    const [Team_2_name, setTeam2Name] = useState("");
    const [Venue_name, setVenueName] = useState("");
    const [loginStatus, setLoginStatus] = useState(0);
    const [ teamDataErrors, setTeamDataErrors] = useState("");
    const [ presentError, setpresentError] = useState(false);


    
    var worldcup_teams = ['England', 'South Africa', 'India', 'West Indies', 
            'Pakistan', 'New Zealand', 'Sri Lanka', 'Afghanistan', 
            'Australia', 'Bangladesh', 'India','Bermuda','Canada', 'Hong Kong',
            'Ireland','Kenya','Namibia','Netherlands','Oman','P.N.G.','Scotland',
            'U.A.E.','U.S.A.','Zimbabwe']


var venues = ["Dambulla","Colombo (RPS)" , "Colombo (SSC)","Birmingham",
"Bristol","Lord's","Manchester","Leeds", "The Oval","Harare","Bulawayo",
"Kolkata","Cuttack","Chennai","Kanpur","Delhi","Mumbai","Christchurch","Wellington","Napier",
"Auckland","Dunedin","Nottingham","Chester-le-Street","Sydney","Melbourne",
"Brisbane","Perth","Hobart","Adelaide","East London","Port Elizabeth","Cape Town","Durban","Chattogram","Dhaka",
"Dambulla","Georgetown","Port of Spain","St George's","Gros Islet","Bridgetown","Southampton",
"Johannesburg","Bloemfontein","Centurion","Lahore","Karachi","Rawalpindi",'Faridabad',"Margao",
"Kochi","Guwahati","Jamshedpur","Indore","Belfast","Cardiff","Jaipur","Ahmedabad","Providence",
"North Sound","Hamilton","Edinburgh","Rajkot","Bengaluru","Nagpur","Dublin","Hyderabad (Deccan)","Mohali",
"Abu Dhabi","Dubai (DSC)","Ranchi","Dharamsala","Dublin (Malahide)","Aberdeen","Hambantota",
"Pallekele","Sharjah","Pune","Mount Maunganui","Visakhapatnam","Potchefstroom","Melbourne (Docklands)",
"Nairobi (Gym)","Kingston","Cairns","Darwin","Gwalior","Amstelveen","Canterbury",
"Fatullah","Kuala Lumpur","Mumbai (BS)","Basseterre","Chandigarh","Vadodara","Kingstown",
"Canberra","Benoni",'Taunton',"Paarl","St John's","Kimberley","Tangier","Faisalabad","Multan",
"Roseau","Lucknow","Nairobi","Kandy","Jodhpur","Vijayawada","Queenstown","King City (NW)",
"Khulna","Nelson","Whangarei","Thiruvananthapuram","Sylhet","Taupo","Pietermaritzburg","Peshawar",
"Glasgow","Hyderabad (Sind)","Sheikhupura","Bogra","Colombo (PSS)","Galle","Kwekwe","Mombasa","Deventer",
"Bready","Toronto","Nairobi (Jaff)","Nairobi (Ruaraka)","Rotterdam","Ayr","The Hague","Lincoln","Windhoek","Schiedam","ICCA Dubai","Lauderhill","Al Amerat","Greater Noida",
"Dehradun","Mong Kok","Port Moresby"]

useEffect(() =>
    {
        const token = syncStorage.get("user_id");
        if(token)
        {
            // verify token
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
                    .catch(err =>
                        {
                            console.log(`Error occured : ${err}`);
                        })
            
        }
        else
        {
            // no token
            setLoginStatus(3);
        }

    },[]);


    const TeamHandler = () => 
    {
        
        
        if (Team_1_name ===Team_2_name) 
        {
            setTeamDataErrors("You must select 2 different Teams");
            alert("You must have to select 2 different teams")
            setpresentError(true);
        }
        
        else 
        {
            
            const team_data = 
            {
                Team1: Team_1_name,
                Team2: Team_2_name,
                Venue: Venue_name   
            }
            

                navigation.navigate('PredictionData',{ user: team_data  });
            
            }       
    };


    const changeTeam1 =(values) =>
    {
        
        setTeam1Name(values);
    }
    const changeTeam2 =(values) =>
    {
        
        setTeam2Name(values);
    }
    const changeVenue =(values) =>
    {
        
        setVenueName(values);
    }

    
    

if(loginStatus === 1)
{
    return(
    <View style={styles.container}>
        <Animatable.View style={styles.header} animation="fadeInDownBig">
        <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Match Prediction!</Text>
        </Animatable.View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">
        
        <Text style={styles.text_footer}>Select Team - A</Text>
        <View style={styles.action}>
            <Picker
                selectedValue={Team_1_name}
                style={{ height: 30}}
                onValueChange={changeTeam1}

                >
                {worldcup_teams.map((item, index) => {
                return (<Picker.Item label={item} value={item} key={index}/>) 
                })}
            </Picker>
        </View>

        <Text style={styles.text_footer}>Select Team - B</Text>
        <View style={styles.action}>
            <Picker
                selectedValue={Team_2_name}
                style={{ height: 30}}
                onValueChange={changeTeam2}
                >
                {worldcup_teams.map((item, index) => {
                return (<Picker.Item label={item} value={item} key={index}/>) 
                })}
            </Picker>
        </View>


        <Text style={styles.text_footer}>Select Venue</Text>
        <View style={styles.action}>
            <Picker
                selectedValue={Venue_name}
                style={{ height: 30}}
                onValueChange={changeVenue}
                >
                {venues.map((item, index) => {
                return (<Picker.Item label={item} value={item} key={index}/>) 
                })}
            </Picker>            
        </View>


        <View style={styles.button}>
            <TouchableOpacity
            onPress={TeamHandler}
            style={[styles.signIn, {
                backgroundColor: '#009387',
                marginTop: 15
            }]}                
            >
            <Text style={[styles.textSign, {
                    color:'#fff'
            }]}>View Match Prediction</Text>
            </TouchableOpacity>

        </View>          
        </Animatable.View>
    </View>

    );
}
  

else if(loginStatus === 2)
{
  return(

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
            <Text style={{color:'#fff',marginLeft:30, marginRight:30,fontSize:15,fontWeight:'bold'}}>SORRY!!!{"\n\n"}Failed to load prediction data. Try later.{"\n\n"}Thanks!</Text>
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

};




const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 4,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  action: {
    borderColor:'#009387', 
    borderWidth:1.5, 
    width:'100%',
    borderRadius:30
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },

  text_footer: {
    color: '#05375a',
    fontSize: 15,
    marginTop:10,
    marginBottom:5
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },

  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },


});









































