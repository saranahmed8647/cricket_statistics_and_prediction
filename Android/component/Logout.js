import React,  { useState, useEffect }from 'react';
import { StyleSheet,Text,Button, View,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
import axios from "axios";
import SyncStorage from 'sync-storage';
import syncStorage from 'sync-storage';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';








export default function Logout({navigation})
{
    const [loginStatus,setloginStatus] = useState(0);
    useEffect(()=>
    {
        let token2 = SyncStorage.get('user_id');
        if(token2)
        {
            axios.get(`http://192.168.0.107:5000/account/logout?token=${token2}`)
            
                .then(json =>
                    {
                        if(json.status === 200)
                        {
                            console.log("user logged out");
                            
                            SyncStorage.remove('user_id');
                            setloginStatus(1);
                            
                        }
                        else
                        {
                            console.log("Fail to logout");
                            alert('Fail to logout')
                            setloginStatus(2);
                            
                        }
                    })
                    .catch(err =>
                        {
                            console.log("Error occured while logging out " + err);
                            
                            setloginStatus(2);
                            
                        })
            
        }
        else
        {
            console.log("Can't log out , you are not logged in" );
            setloginStatus(3);
        }
    },[])
    
if(loginStatus === 1)
{
    return(

        <View style={styles.container}>
        <Animatable.View style={styles.header} animation="fadeInDownBig">
          <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Logout!</Text>
        </Animatable.View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          
          <View style={styles.button}>


            <Text>You have been logged out.</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Signin')}
              style={[styles.signIn, {
                backgroundColor: '#009387',
                marginTop: 15
              }]}                
            >
              <Text style={[styles.textSign, {
                    color:'#fff'
              }]}>Return to Sign-in</Text>
            </TouchableOpacity>





            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              style={[styles.signIn, {
                backgroundColor: '#009387',
                marginTop: 15
              }]}                
            >
              <Text style={[styles.textSign, {
                    color:'#fff'
              }]}>Return to Sign-up</Text>
            </TouchableOpacity>

          </View>          
        </Animatable.View>
      </View>      

    );
}
else if(loginStatus === 2)
{

    return(
        <View style={styles.container}>
        <Animatable.View style={styles.header} animation="fadeInDownBig">
          <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Error!</Text>
        </Animatable.View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          
          <View style={styles.button}>


            <Text>Error logging out, Return to Sign-in page</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Signin')}
              style={[styles.signIn, {
                backgroundColor: '#009387',
                marginTop: 15
              }]}                
            >
              <Text style={[styles.textSign, {
                    color:'#fff'
              }]}>Return to Sign-in</Text>
            </TouchableOpacity>





            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              style={[styles.signIn, {
                backgroundColor: '#009387',
                marginTop: 15
              }]}                
            >
              <Text style={[styles.textSign, {
                    color:'#fff'
              }]}>Return to Sign-up</Text>
            </TouchableOpacity>

          </View>          
        </Animatable.View>
      </View>  

    );
}
else
{
    return(

        <View style={styles.container}>
        <Animatable.View style={styles.header} animation="fadeInDownBig">
          <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Logout!</Text>
        </Animatable.View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          
          <View style={styles.button}>


            <Text>You are not logged in, please Sign-in first.</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Signin')}
              style={[styles.signIn, {
                backgroundColor: '#009387',
                marginTop: 15
              }]}                
            >
              <Text style={[styles.textSign, {
                    color:'#fff'
              }]}>Return to Sign-in</Text>
            </TouchableOpacity>





            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              style={[styles.signIn, {
                backgroundColor: '#009387',
                marginTop: 15
              }]}                
            >
              <Text style={[styles.textSign, {
                    color:'#fff'
              }]}>Return to Sign-up</Text>
            </TouchableOpacity>

          </View>          
        </Animatable.View>
      </View>  
    );
}
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
        paddingBottom: 20
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
      marginTop: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 3
    },
    textInput: {
      flex: 1,
      paddingLeft: 10,
      color: '#05375a',
    },
  
    text_footer: {
      color: '#05375a',
      fontSize: 15,
      marginTop:10
    },
    button: {
      alignItems: 'center',
      marginTop: 10
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
    textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20
    },
    color_textPrivate: {
      color: 'grey'
    }
  
  
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  