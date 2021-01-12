
// import React,{useState} from 'react';
// import { StyleSheet,Text,Button, View,TextInput, Image,TouchableOpacity } from 'react-native';
// import axios from "axios";
// import SyncStorage from 'sync-storage';
// import * as Animatable from 'react-native-animatable';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// export default function Signin({ navigation }) {
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [ErrorsAll,setErrorsAll] = useState([]);

  

//   const changeEmail =(e) =>
//   {
//     // let pass = e.target && e.target.value;
    
    
//     setemail(e.toLowerCase());
//   }

//   const changePassword = (e) =>
//   {
    
//     // let pass = e.target && e.target.value;
    
//     setpassword(e);

//   }

//   const signupHandler = () =>
//   {
//     if(email === "" || password === "")
//     {
//       ErrorsAll.push("Please fill all fields");
//       alert("Please fill all fields")
//     }
//     else if(!email.includes("@") || !email.includes(".com") || email.length < 9){
//       ErrorsAll.push("Please provide correct email")
//       alert("Please provide valid email")

//     }
//     else
//     {
//       const newUser = 
//       {
        
//         email: email.trim(),
//         password: password.trim()
        
//       }

//       axios.post('http://192.168.0.107:5000/account/login',newUser)
//       .then(json =>
//         {
//           if(json.status === 200)
//           {
            
//             setemail("");
//             setpassword("");
//             let token2 = json.data.token;
//             // console.log(`User token : ${token2}`);
            
//             SyncStorage.set('user_id', token2);
//             alert("Login Successful!");
//             navigation.navigate('Home', { screen: 'Home' })
            
//           }
//         })
//         .catch(err =>
//           {
//             console.log(`Error occured : ${err}`);
//             alert("Email not found / Incorrect Password");
//           })

//     }
    
//   }

//   const MainMenuHandler = () =>
//   {
//     const token = SyncStorage.get("user_id");
//     if(token)
//     {
//       axios.get(`http://192.168.0.107:5000/account/verify?token=${token}`)
//             // .then(res =>res.json())
//                 .then(json =>
//                     {
//                         if(json.status === 200)
//                         {
                            
//                           navigation.navigate('Home', { screen: 'Home' });
//                           console.log("logged in, going to home");
//                         }
//                         else
//                         {
//                           navigation.navigate("Signin");
//                           console.log("Wrong password");
                            
//                         }
//                     })
            
//     }
//     else
//         {
//             // no token
//             navigation.navigate("Signin");
//             alert("Not Logged in!")
//             console.log("Not logged in");
//         }


    
//   }

//     return(
  
//       <View style={styles.container}>
//         <Animatable.View style={styles.header} animation="fadeInDownBig">
//           <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Welcome!</Text>
//         </Animatable.View>

//         <Animatable.View style={styles.footer} animation="fadeInUpBig">
          
//           <Text style={styles.text_footer}>E-mail</Text>
//           <View style={styles.action}>
//             <MaterialIcons 
//               name="email"
//               size={20}
//             />
//             <TextInput 
//               style={styles.textInput} 
//               placeholder="Your E-mail" 
//               placeholderTextColor="#999999"
//               onChangeText={changeEmail} 
//               value={email}
//             />
//           </View>

//           <Text style={styles.text_footer}>Password</Text>
//           <View style={styles.action}>
//             <Feather 
//               name="lock"
//               size={20}
//             />
//             <TextInput 
//               style={styles.textInput} 
//               placeholder="Your Password" 
//               placeholderTextColor="#999999"
//               onChangeText={changePassword} 
//               value={password} 
//               secureTextEntry={true}
//             />
//           </View>

//           <TouchableOpacity
//             onPress={() => navigation.navigate('ForgetPassword')}
//           >
//             <Text style={{color: '#009387', marginTop:15, fontWeight:'bold'}}>Forgot password?</Text>
//           </TouchableOpacity>

//           <View style={styles.button}>

//             <TouchableOpacity
//               onPress={signupHandler}
//               style={[styles.signIn, {
//                 backgroundColor: '#009387',
//                 marginTop: 15
//               }]}                
//             >
//               <Text style={[styles.textSign, {
//                     color:'#fff'
//               }]}>Sign In</Text>
//             </TouchableOpacity>

//             <TouchableOpacity

//               onPress={() => navigation.navigate('Signup')}
//               style={[styles.signIn, {
//                 borderColor: '#009387',
//                 borderWidth: 2,
//                 marginTop: 15
//               }]}
//             >
//                 <Text style={[styles.textSign, {
//                     color: '#009387'
//                 }]}>Sign Up</Text>
//             </TouchableOpacity>


//             <TouchableOpacity

//               onPress={MainMenuHandler}
//               style={[styles.signIn, {
//                 borderColor: '#009387',
//                 borderWidth: 2,
//                 marginTop: 15
//               }]}
//             >
//                 <Text style={[styles.textSign, {
//                     color: '#009387'
//                 }]}>Main Menu</Text>
//             </TouchableOpacity>



//           </View>          
//         </Animatable.View>
//       </View>
  
  
//     );
//   };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     backgroundColor: '#009387'
//   },
//   header: {
//       flex: 1,
//       justifyContent: 'flex-end',
//       paddingHorizontal: 20,
//       paddingBottom: 50
//   },
//   footer: {
//       flex: 3,
//       backgroundColor: '#fff',
//       borderTopLeftRadius: 30,
//       borderTopRightRadius: 30,
//       paddingHorizontal: 20,
//       paddingVertical: 30
//   },
//   action: {
//     flexDirection: 'row',
//     marginTop: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f2f2f2',
//     paddingBottom: 5
//   },
//   textInput: {
//     flex: 1,
//     paddingLeft: 10,
//     color: '#05375a',
//   },

//   text_footer: {
//     color: '#05375a',
//     fontSize: 18,
//     marginTop:15
//   },
//   button: {
//     alignItems: 'center',
//     marginTop: 50
//   },

//   signIn: {
//     width: '100%',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10
//   },
//   textSign: {
//     fontSize: 18,
//     fontWeight: 'bold'
//   },


// });
















import React,{useState} from 'react';
import { StyleSheet,Text,Button, View,TextInput, Image,TouchableOpacity } from 'react-native';
import axios from "axios";
import SyncStorage from 'sync-storage';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Signin({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [ErrorsAll,setErrorsAll] = useState([]);

  

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

  const signupHandler = () =>
  {
    if(email === "" || password === "")
    {
      ErrorsAll.push("Please fill all fields");
      alert("Please fill all fields")
    }
    else if(!email.includes("@") || !email.includes(".com") || email.length < 9){
      ErrorsAll.push("Please provide correct email")
      alert("Please provide valid email")

    }
    else
    {
      const newUser = 
      {
        
        email: email.trim(),
        password: password.trim()
        
      }

      axios.post('http://192.168.0.107:5000/account/login',newUser)
      .then(json =>
        {
          if(json.status === 200)
          {
            
            setemail("");
            setpassword("");
            let token2 = json.data.token;
            // console.log(`User token : ${token2}`);
            
            SyncStorage.set('user_id', token2);
            alert("Login Successful!");
            navigation.navigate('Home', { screen: 'Home' })
            
          }
          else if(json.status === 420)
          {
            alert("Verify your email before trying to login");
          }
          else
          {
            alert("Email not found / Incorrect Password");
          }
        })
        .catch(err =>
          {
            console.log(`Error occured : ${err}`);
            alert("Email not found / Incorrect Password");
          })

    }
    
  }

  const MainMenuHandler = () =>
  {
    const token = SyncStorage.get("user_id");
    if(token)
    {
      axios.get(`http://192.168.0.107:5000/account/verify?token=${token}`)
            // .then(res =>res.json())
                .then(json =>
                    {
                        if(json.status === 200)
                        {
                            
                          navigation.navigate('Home', { screen: 'Home' });
                          console.log("logged in, going to home");
                        }
                        else
                        {
                          navigation.navigate("Signin");
                          console.log("Wrong password");
                            
                        }
                    })
            
    }
    else
        {
            // no token
            navigation.navigate("Signin");
            alert("Not Logged in!")
            console.log("Not logged in");
        }


    
  }

    return(
  
      <View style={styles.container}>
        <Animatable.View style={styles.header} animation="fadeInDownBig">
          <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Welcome!</Text>
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

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}
          >
            <Text style={{color: '#009387', marginTop:15, fontWeight:'bold'}}>Forgot password?</Text>
          </TouchableOpacity>

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
              }]}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity

              onPress={() => navigation.navigate('Signup')}
              style={[styles.signIn, {
                borderColor: '#009387',
                borderWidth: 2,
                marginTop: 15
              }]}
            >
                <Text style={[styles.textSign, {
                    color: '#009387'
                }]}>Sign Up</Text>
            </TouchableOpacity>


            <TouchableOpacity

              onPress={MainMenuHandler}
              style={[styles.signIn, {
                borderColor: '#009387',
                borderWidth: 2,
                marginTop: 15
              }]}
            >
                <Text style={[styles.textSign, {
                    color: '#009387'
                }]}>Main Menu</Text>
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










































































