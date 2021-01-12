
import React, { useState,useEffect } from 'react';
import { StyleSheet,Text,Button,Image, View,TextInput,TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';import { Searchbar } from 'react-native-paper';
import axios from "axios";

export default function ForgetPassword({navigation})
{

    const [email, setemail] = useState("");
    
    const changeEmail =(e) =>
  {
    // let pass = e.target && e.target.value;
    
    
    setemail(e.toLowerCase());
  }

  const signupHandler = () => 
  {
    if( email === "" )
    {
      ErrorsAll.push("Please fill Email");
      alert("Please fill all fields")
    }
    else if((!email.includes("@")) || (!email.includes(".")) || (!email.includes("com")))
    {
        ErrorsAll.push("Wrong Email Address");
        alert("Please provide valid email")
    }
    else
    {
            const newUser = 
      {
        
        email: email.toLowerCase().trim()
        
      }
        axios.post('http://192.168.0.107:5000/account/forgetPassword',newUser)
        .then(json =>
            {
                if(json.status === 200)
                {
                    console.log("Email sent for password change, check your mail");
                    alert("Email sent for password change, check your mail")
                    navigation.navigate('Signin');
                }
                else
                {
                    console.log("Error sending mail to Email");
                    alert("Unable to delete account at the moment");
                    navigation.navigate('Signin');

                    


                }
            })
            .catch(err =>
                {
                    console.log("Server Error ....");
                    alert("user not found");
                    navigation.navigate('Signin');
                })
        

        
    }

  }
    
    return(
  

<View style={styles.container}>
<Animatable.View style={styles.header} animation="fadeInDownBig">
  <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Forget Password!</Text>
</Animatable.View>

<Animatable.View style={styles.footer} animation="fadeInUpBig">
  
  <Text style={styles.text_footer}>E-mail</Text>
  <View style={styles.action}>
    <MaterialIcons 
      name="email"
      size={20}
    />
    <TextInput 
      style={styles.textInput} 
      placeholder="Your E-mail" 
      placeholderTextColor="#999999"
      onChangeText={changeEmail}
      value={email}
    />
  </View>


  <View style={styles.button}>

    <TouchableOpacity
      onPress={signupHandler}
      style={[styles.signIn, {
        backgroundColor: '#009387',
        marginTop: 15
      }]}                
    >
      <Text style={[styles.textSign, {
            color:'#fff'
      }]}>Submit</Text>
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
      flex: 3,
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






































