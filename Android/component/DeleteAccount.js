import React,  { useState, useEffect }from 'react';
import { StyleSheet,Text,Button, View,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
import axios from "axios";
import syncStorage from 'sync-storage';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



export default function DeleteAccount({navigation})
{
    const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(0);
  const [ErrorsAll,setErrorsAll] = useState([]);

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
  

  const signupHandler = () =>
  {
      setErrorsAll([])
    if(email === "" || password ==="")
    {
      setErrorsAll([...ErrorsAll,"Please fill all fields"]);
      alert("Please fill all fileds");
    }
    else
    {
        const token2 = syncStorage.get("user_id");
        const admin = {
            email: email.trim(),
            password : password.trim()
        }
        axios.post('http://192.168.0.107:5000/account/checklogin', admin)
        .then(json =>
            {
                if(json.status === 200)
                {

                    axios.post('http://192.168.0.107:5000/account/delete', admin)
        .then(json =>
            {
                if(json.status === 200){
                    axios.get(`http://192.168.0.107:5000/account/logout?token=${token2}`)
                .then(json =>
                    {
                        if(json.status === 200)
                        {
                            console.log("user logged out");
                            syncStorage.remove("user_id");
                            alert('Account Deleted Succefully');
                            navigation.navigate('Signin')

                        }
                    })
                    .catch(err =>
                        {
                            setErrorsAll([...ErrorsAll,`Error logging User out : ${err}`]);
                            
                        })
                }
            })
            .catch(err =>
                {
                    setErrorsAll([...ErrorsAll,`Error Deleting User account : ${err}`]);
                    alert("Unable to delete user at the moment")
                    navigation.navigate('Signin')


                })
                }
            })
            .catch(err =>
                {
                    setErrorsAll([...ErrorsAll, `Wrong credentials passed :  ${err}`]);
                    alert("Wrong credential passed")
                })
        
        
        
    }

    // if(ErrorsAll.length < 1 && (email !== "") && (password !== ""))
    // {
    //     console.log("all Tasks done successfully. going to sign Up");
    //     navigation.navigate('Signin')
    // }
  }

    const changeEmail =(e) =>
    {
      // let pass = e.target && e.target.value;
      
      
      setemail(e.toLowerCase());
    }
    const changePassword = (e) =>
{
  
  // let pass = e.target && e.target.value;
  
  setpassword(e);

}
if(loginStatus === 1)
{
    return(


    <View style={styles.container}>
        <Animatable.View style={styles.header} animation="fadeInDownBig">
          <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Delete Account!</Text>
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

          <Text style={styles.text_footer}>Password</Text>
          <View style={styles.action}>
            <Feather 
              name="lock"
              size={20}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Your Password" 
              placeholderTextColor="#999999"
              onChangeText={changePassword} 
              value={password} 
              secureTextEntry={true}
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
              }]}>Delete</Text>
            </TouchableOpacity>

          </View>          
        </Animatable.View>

        {/* <View>
            {ErrorsAll.length > 0 ? <Text>{ErrorsAll.map((item,index) =>{return(item)})}</Text> :  <Text> </Text>}
        </View> */}

        
      </View>
  

  
    );

}
else
{
  <View style={{ alignItems:'center',justifyContent: 'center',flex: 1,backgroundColor: '#009387'}}>
        
  <View style={{
      width: 150 * 2,
      height: 200,
      borderWidth: 4,
      borderColor: "#fff",
      borderRadius: 6,
      alignItems:'center',
      justifyContent: 'center',
  }}>
      <Text style={{color:'#fff',marginLeft:30, marginRight:30,fontSize:15,fontWeight:'bold'}}>Sorry!!!{"\n\n"}You must be logged in to perform profile actions{"\n\n"}Thanks</Text>
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
)
    
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  




























































































