import React, { useState,useEffect } from 'react';
import { StyleSheet,Text,Button,Image, View,TextInput,TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Searchbar } from 'react-native-paper';
import axios from "axios";

export default function Viewsingleteam({navigation})
{

    const [TeamData, setTeamData] = useState("");
    
    const updateSearch = (search) =>
    {
        setTeamData(search);
    }
    const TeamHandler = () =>
    {
        if(TeamData === ""){
            alert("Please mention team name")
        }
        else{
          console.log("Navigating to TeamData");
          console.log(TeamData.trim());
            navigation.navigate('TeamData',{ user: TeamData.trim()});
        }
    }

    return(
  
      <View style={styles.container}>
        <Animatable.View style={styles.header} animation="fadeInDownBig">
          <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>View Single Team!</Text>
        </Animatable.View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">

            <Searchbar
                style={{width:'100%'}}
                placeholder="Enter team name..."
                onChangeText={updateSearch}
                value={TeamData}
            /> 
          
            <View style={styles.button}>
                <TouchableOpacity
                onPress={TeamHandler}
                style={[styles.signIn, {
                    backgroundColor: '#009387',
                    marginTop: 0
                }]}                
                >
                <Text style={[styles.textSign, {
                        color:'#fff'
                }]}>Search</Text>
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
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
    },
    textInput: {
      flex: 1,
      paddingLeft: 10,
      color: '#05375a',
    },
  
    text_footer: {
      color: '#05375a',
      fontSize: 18,
      marginTop:15
    },
    button: {
      alignItems: 'center',
      marginTop: 15
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
  
  
  
  
  