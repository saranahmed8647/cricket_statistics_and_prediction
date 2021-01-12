import React,{useState} from 'react';
import { StyleSheet,Text,Button, View,TextInput, Image,Picker,TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';


export default function Statistics({ navigation }) {

    const [Team_1_name, setTeam1Name] = useState("");
    const [Team_2_name, setTeam2Name] = useState("");
    const [Venue, setVenue] = useState(2);
    const [Toss, setToss] = useState(0);

    const worldcup_teams = ["India", "Pakistan", "Australia" , "New Zealand" , 
    "Sri Lanka", "South Africa", "England" , "West Indies" , "Bangladesh"]
    
    const Venues_List = [{"Name" : "Home" , "value" : 0} 
    ,{"Name" : "Away" , "value" : 1},{"Name" : "Neutral" , "value" : 2} ]
    const Toss_List = [{"Name" : "Team A" , "value" : 1} ,
    {"Name" : "Team B" , "value" : 0}  
     ]

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
        
        setVenue(values);

    }
    const changeToss =(values) =>
    {
        
        setToss((values));
        console.log(`Toss Value : ${values}`);
    }

    const Team_Handler = () =>
    {
        if(Team_1_name === Team_2_name)
        {
            // Alert here that select 2 different Teams
            console.log("Select 2 different Teams");
            alert("Selected teams must be different")
        }
        else
        {
            const team_data = 
            {
                Team1: Team_1_name,
                Team2: Team_2_name,
                Venue: Venue,
                Toss : Toss
            }
        
                navigation.navigate('TeamA',{ user: team_data  });

        }
        
        
                
    }


    return(
  
      <View style={styles.container}>
        <Animatable.View style={styles.header} animation="fadeInDownBig">
          <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Squad Base Prediction!</Text>
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
                selectedValue={Venue}
                style={{ height: 30}}
                onValueChange={changeVenue}
                >
                {Venues_List.map((item, index) => {
                return (<Picker.Item label={item.Name} value={item.value} key={item.Name}/>) 
                })}
            </Picker>              
          </View>




          <Text style={styles.text_footer}>Select Toss Result</Text>
          <View style={styles.action}>
            <Picker
                selectedValue={Toss}
                style={{ height:30}}
                onValueChange={changeToss}
                >
                {Toss_List.map((item, index) => {
                return (<Picker.Item label={item.Name} value={item.value} key={item.Name}/>) 
                })}
            </Picker>
          </View>



          <View style={styles.button}>

            <TouchableOpacity
              onPress={Team_Handler}
              style={[styles.signIn, {
                backgroundColor: '#009387',
                marginTop: 15
              }]}                
            >
              <Text style={[styles.textSign, {
                    color:'#fff'
              }]}>Select Squad for Team-A</Text>
            </TouchableOpacity>

          </View>          
        </Animatable.View>
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









































