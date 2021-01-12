
// import React,  { useState, useEffect }from 'react';
// import { StyleSheet,Text,Button, View,TextInput,TouchableOpacity} from 'react-native';
// import axios from "axios";
// import * as Animatable from 'react-native-animatable';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// export default function Signup({ navigation }) {

//   const [username, setusername] = useState("");
//   const [email, setemail] = useState("");
//   const [phone, setphone] = useState("");
//   const [password, setpassword] = useState("");
//   const [confirmpassword, setconfirmpassword] = useState("");
//   const [ErrorsAll,setErrorsAll] = useState([]);
  
//   const signupHandler = () =>
//   {


//     if(username === "" || email === "" || phone === "" || password === "" || confirmpassword === "")
//     {
//       ErrorsAll.push("Please fill all fields");
//       alert("Please fill all fields")
//     }

//     else if(!email.includes("@") || !email.includes(".com") || email.length < 9){
//       ErrorsAll.push("Please provide correct email with at least 9 characters length")
//       alert("Please provide valid email, at least 9 characters length")

//     }
//     else if(!phone.startsWith("03")){
//       ErrorsAll.push("Please provide phone# starts with 03")
//       alert("Please provide phone# starts with 03")
//     }
//     else if(phone.length < 11){
//       ErrorsAll.push("Please provide 11 digits phone#")
//       alert("Please provide 11 digits valid phone#")
//     }
//     else if(password.length < 8 && confirmpassword.length < 8){
//       ErrorsAll.push("Password must be 8 characters long");
//       alert("Password must be 8 charachters long")

//     }
//     else if(password !== confirmpassword)
//     {
//       ErrorsAll.push("Both passswords didnt match");
//       alert("Passwords did not match")
//     }

//     else
//     {
//       const newUser = 
//       {
//         name: username.trim(),
//         email: email.trim(),
//         password: password.trim(),
//         password2: confirmpassword.trim(),
//         phone: phone
//       }

//       const check_account = 
//       {
//         UserEmail : email.trim()
//       }
//       axios.post('http://192.168.0.107:5000/account/getUserbyEmail',check_account)
//       .then(json =>
//         {
          
//             if(json.data.length < 1)
//             {
//               // No Account Exists
//               axios.post('http://192.168.0.107:5000/account/register',newUser)
//       .then(json =>
//         {
//           if(json.status === 200)
//           {
//             setusername("");
//             setemail("");
//             setphone("");
//             setpassword("");
//             setconfirmpassword("");
//             alert("Account created successfully")
//             navigation.navigate("Signin");
            
//           }
//         })
//         .catch(err =>
//           { 
//             console.log(`Error occured : ${err}`);
//           })

//             }
//             else
//             {
//               console.log("This account Already Exists");
//               alert("Email already exists");
//             }
          
//         })
//         .catch(err =>
//           {
//             console.log(`Unable to check if a account exists with this mail or not `);
//             alert("Unable to check if a account exists with this mail or not")
//           })
        
      
//     }
    
//   }

//   const changeconfirmPassword = (e) =>
//   {
    
    
//     // let pass2 = e.target && e.target.value;
//     setconfirmpassword(e);

//   }
//   const changePassword = (e) =>
//   {
    
//     // let pass = e.target && e.target.value;
    
//     setpassword(e);

//   }
//   const changePhone = (e) =>
//   {
    
//     // let pass = e.target && e.target.value;
    
//     setphone(e.toLowerCase().trim());

//   }
//   const changeEmail =(e) =>
//   {
//     // let pass = e.target && e.target.value;
    
    
//     setemail(e.toLowerCase());
//   }
//   const changeUsername = (e) =>
//   {
    
//     // let pass = e.target && e.target.value;
    
//     setusername(e);
//   }

//   return(
  
//     <View style={styles.container}>
//       <Animatable.View style={styles.header} animation="fadeInDownBig">
//         <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Resgister Now!</Text>
//       </Animatable.View>

//       <Animatable.View style={styles.footer} animation="fadeInUpBig">
        
//         <Text style={styles.text_footer}>Username</Text>
//         <View style={styles.action}>
//           <FontAwesome
//             name="user"
//             size={20}
//           />
//           <TextInput 
//             style={styles.textInput} 
//             placeholder="Your Username" 
//             placeholderTextColor="#999999"
//             autoCapitalize="none"
//             onChangeText={changeUsername} 
//             value={username}
//           />
//         </View>



//         <Text style={styles.text_footer}>E-mail</Text>
//         <View style={styles.action}>
//           <MaterialIcons 
//             name="email"
//             size={20}
//           />
//           <TextInput 
//             style={styles.textInput} 
//             placeholder="Your E-mail" 
//             placeholderTextColor="#999999"
//             autoCapitalize="none"
//             onChangeText={changeEmail} 
//             value={email}
//           />
//         </View>




//         <Text style={styles.text_footer}>Phone #</Text>
//         <View style={styles.action}>
//           <MaterialIcons 
//             name="phone"
//             size={20}
//           />
//           <TextInput 
//             style={styles.textInput} 
//             placeholder="Your Phone #" 
//             placeholderTextColor="#999999"
//             autoCapitalize="none"
//             onChangeText={changePhone} 
//             value={phone}
//           />
//         </View>



//         <Text style={styles.text_footer}>Password</Text>
//         <View style={styles.action}>
//           <Feather
//             name="lock"
//             size={20}
//           />
//           <TextInput 
//             style={styles.textInput} 
//             placeholder="Your Password" 
//             placeholderTextColor="#999999"
//             autoCapitalize="none"
//             onChangeText={changePassword} 
//             value={password} 
//             secureTextEntry={true}

//           />
//         </View>





//         <Text style={styles.text_footer}>Confirm Password</Text>
//         <View style={styles.action}>
//           <Feather 
//             name="lock"
//             size={20}
//           />
//           <TextInput 
//             style={styles.textInput} 
//             placeholder="Confirm Password" 
//             placeholderTextColor="#999999"
//             autoCapitalize="none"
//             onChangeText={changeconfirmPassword} 
//             value={confirmpassword} 
//             secureTextEntry={true}
//           />
//         </View>

//         <View style={styles.textPrivate}>
//           <Text style={styles.color_textPrivate}>
//               By signing up you agree to our
//           </Text>
//           <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
//           <Text style={styles.color_textPrivate}>{" "}and</Text>
//           <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
//         </View>


//         <View style={styles.button}>

//           <TouchableOpacity
//             onPress={signupHandler}
//             style={[styles.signIn, {
//               backgroundColor: '#009387'            
//             }]}                
//           >
//             <Text style={[styles.textSign, {
//                   color:'#fff'
//             }]}>Sign Up</Text>
//           </TouchableOpacity>

//         </View>          
//       </Animatable.View>
//     </View>      
  
//     );
//   };



  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1, 
//       backgroundColor: '#009387'
//     },
//     header: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         paddingHorizontal: 20,
//         paddingBottom: 20
//     },
//     footer: {
//         flex: 3,
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         paddingHorizontal: 20,
//         paddingVertical: 30
//     },
//     action: {
//       flexDirection: 'row',
//       marginTop: 5,
//       borderBottomWidth: 1,
//       borderBottomColor: '#f2f2f2',
//       paddingBottom: 3
//     },
//     textInput: {
//       flex: 1,
//       paddingLeft: 10,
//       color: '#05375a',
//     },

//     text_footer: {
//       color: '#05375a',
//       fontSize: 15,
//       marginTop:10
//     },
//     button: {
//       alignItems: 'center',
//       marginTop: 10
//     },

//     signIn: {
//       width: '100%',
//       height: 50,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 10
//     },
//     textSign: {
//       fontSize: 18,
//       fontWeight: 'bold'
//     },
//     textPrivate: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       marginTop: 20
//     },
//     color_textPrivate: {
//       color: 'grey'
//     }


//   });








import React,  { useState, useEffect }from 'react';
import { StyleSheet,Text,Button, View,TextInput,TouchableOpacity} from 'react-native';
import axios from "axios";
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function Signup({ navigation }) {

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [ErrorsAll,setErrorsAll] = useState([]);
  
  const signupHandler = () =>
  {


    if(username === "" || email === "" || phone === "" || password === "" || confirmpassword === "")
    {
      ErrorsAll.push("Please fill all fields");
      alert("Please fill all fields")
    }

    else if(!email.includes("@") || !email.includes(".com") || email.length < 9){
      ErrorsAll.push("Please provide correct email with at least 9 characters length")
      alert("Please provide valid email, at least 9 characters length")

    }
    else if(!phone.startsWith("03")){
      ErrorsAll.push("Please provide phone# starts with 03")
      alert("Please provide phone# starts with 03")
    }
    else if(phone.length < 11){
      ErrorsAll.push("Please provide 11 digits phone#")
      alert("Please provide 11 digits valid phone#")
    }
    else if(password.length < 8 && confirmpassword.length < 8){
      ErrorsAll.push("Password must be 8 characters long");
      alert("Password must be 8 charachters long")

    }
    else if(password !== confirmpassword)
    {
      ErrorsAll.push("Both passswords didnt match");
      alert("Passwords did not match")
    }

    else
    {
      const newUser = 
      {
        name: username.trim(),
        email: email.trim(),
        password: password.trim(),
        password2: confirmpassword.trim(),
        phone: phone
      }

      const check_account = 
      {
        UserEmail : email.trim(),
        email :email.trim()
      }
      axios.post('http://192.168.0.107:5000/account/getUserbyEmail',check_account)
      .then(json =>
        {
          
            if(json.data.length < 1)
            {
              // No Account Exists
              axios.post('http://192.168.0.107:5000/account/register',newUser)
      .then(json =>
        {
          if(json.status === 200)
          {
            
            setusername("");
            setemail("");
            setphone("");
            setpassword("");
            setconfirmpassword("");
            // alert("Account created successfully")
            setTimeout(()=>
            {
              axios.post('http://192.168.0.107:5000/account/verifyEmail',check_account)
            .then(user =>
              {
                if(user.status === 200)
                {
                  alert("Please verify your account from your Email to login");
                }
                
              })
              .catch(err =>
                {
                  console.log(`Email send fail : ${err}`);
                  alert("System Error while sending verification email");
                })

            },2000);
            
            navigation.navigate("Signin");
            
          }
        })
        .catch(err =>
          { 
            console.log(`Error occured : ${err}`);
            alert("Phone# already exist")
          })

            }
            else
            {
              console.log("This account Already Exists");
              alert("Email already exists");
            }
          
        })
        .catch(err =>
          {
            console.log(`Unable to check if a account exists with this mail or not `);
            alert("Unable to check if a account exists with this mail or not")
          })
        
      
    }
    
  }

  const changeconfirmPassword = (e) =>
  {
    
    
    // let pass2 = e.target && e.target.value;
    setconfirmpassword(e);

  }
  const changePassword = (e) =>
  {
    
    // let pass = e.target && e.target.value;
    
    setpassword(e);

  }
  const changePhone = (e) =>
  {
    
    // let pass = e.target && e.target.value;
    
    setphone(e.toLowerCase().trim());

  }
  const changeEmail =(e) =>
  {
    // let pass = e.target && e.target.value;
    
    
    setemail(e.toLowerCase());
  }
  const changeUsername = (e) =>
  {
    
    // let pass = e.target && e.target.value;
    
    setusername(e);
  }

  return(
  
    <View style={styles.container}>
      <Animatable.View style={styles.header} animation="fadeInDownBig">
        <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Resgister Now!</Text>
      </Animatable.View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        
        <Text style={styles.text_footer}>Username</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user"
            size={20}
          />
          <TextInput 
            style={styles.textInput} 
            placeholder="Your Username" 
            placeholderTextColor="#999999"
            autoCapitalize="none"
            onChangeText={changeUsername} 
            value={username}
          />
        </View>



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
            autoCapitalize="none"
            onChangeText={changeEmail} 
            value={email}
          />
        </View>




        <Text style={styles.text_footer}>Phone #</Text>
        <View style={styles.action}>
          <MaterialIcons 
            name="phone"
            size={20}
          />
          <TextInput 
            style={styles.textInput} 
            placeholder="Your Phone #" 
            placeholderTextColor="#999999"
            autoCapitalize="none"
            onChangeText={changePhone} 
            value={phone}
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
            autoCapitalize="none"
            onChangeText={changePassword} 
            value={password} 
            secureTextEntry={true}

          />
        </View>





        <Text style={styles.text_footer}>Confirm Password</Text>
        <View style={styles.action}>
          <Feather 
            name="lock"
            size={20}
          />
          <TextInput 
            style={styles.textInput} 
            placeholder="Confirm Password" 
            placeholderTextColor="#999999"
            autoCapitalize="none"
            onChangeText={changeconfirmPassword} 
            value={confirmpassword} 
            secureTextEntry={true}
          />
        </View>

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
              By signing up you agree to our
          </Text>
          <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
          <Text style={styles.color_textPrivate}>{" "}and</Text>
          <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
        </View>


        <View style={styles.button}>

          <TouchableOpacity
            onPress={signupHandler}
            style={[styles.signIn, {
              backgroundColor: '#009387'            
            }]}                
          >
            <Text style={[styles.textSign, {
                  color:'#fff'
            }]}>Sign Up</Text>
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
        paddingBottom: 20
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







































































