
import React,  { useState, useEffect }from 'react';
import { StyleSheet,Text,Button, View,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
import axios from "axios";
import syncStorage from 'sync-storage';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ChangeDetails({navigation})
{
  const [loginStatus, setLoginStatus] = useState(0);
  const [username, setusername] = useState("");

  
  const [oldemail, setoldemail] = useState("");
  const [oldpassword, setoldpassword] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
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
    const token2 = syncStorage.get("user_id");


    if(oldpassword === "" || oldemail === "" || username === "" || email === "" || phone === "" || password === "" || confirmpassword === "")
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
      ErrorsAll.push("Password must be 8 characters long")
      alert("Password must be 8 characters long")

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
        phone : phone
      }
// ////////////////////////////////////////
  const admin = {
      email: oldemail,
      password : oldpassword
  }
axios.post('http://192.168.0.107:5000/account/checklogin', admin)
.then(user =>
  {
    if(user.status === 200)
    {
      axios.post('http://192.168.0.107:5000/account/delete', admin)
.then(user =>
{
  
axios.get(`http://192.168.0.107:5000/account/logout?token=${token2}`)
.then(json =>
    {
        if(json.status === 200)
        {
            console.log("user logged out");
            syncStorage.remove("user_id");

            // Creating new account
            axios.post('http://192.168.0.107:5000/account/register', newUser)
            .then(json =>
              {   
                  if(json.status === 200)
                  {
                    console.log("New account created");
                    
                    setemail("");
                    setpassword("");
                    setusername("");
                    setconfirmpassword("");
                    setphone("");
                    alert("Change details successful!")
                    navigation.navigate('Signin');
                  }
              })
        .catch(function (error) {
          alert("Unable to change details at the moment!,please try later")
          navigation.navigate('Signin');
          console.log(error);
          
        });

            
        }
        else
        {
            console.log("Fail to logout");
        }
    })

}).catch(err =>
  {
    console.log(`Error occured in catch : ${err}`);
    alert("Wrong Credentials Passed");
    // navigation.navigate('Home');

  })



    }
    else
    {
      alert("Wrong current Credentials Passed");
    }
  })
  .catch(err =>
    {
      alert("User not exist with provided email and password");
      // navigation.navigate('Signin');
    })


// ////////////////////////////////////////
     
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
  
  setphone(e.toLowerCase());

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

const changeOldPassword = (e) =>
{
  
  // let pass = e.target && e.target.value;
  
  setoldpassword(e);
}

const changeOldEmail = (e) =>
{
  
  // let pass = e.target && e.target.value;
  
  setoldemail(e.toLowerCase());
}



if(loginStatus === 1)
{
    return(

      <View style={styles.container}>
        <Animatable.View style={styles.header} animation="fadeInDownBig">
          <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Change Details!</Text>
        </Animatable.View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          
          <Text style={styles.text_footer}>Current Email</Text>
          <View style={styles.action}>
            <MaterialIcons 
              name="email"
              size={20}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Current Email" 
              placeholderTextColor="#999999"
              autoCapitalize="none"
              onChangeText={changeOldEmail} 
              value={oldemail}
            />
          </View>



          <Text style={styles.text_footer}>Current Password</Text>
          <View style={styles.action}>
            <Feather 
              name="lock"
              size={20}
            />
            <TextInput 
                
              style={styles.textInput} 
              placeholder="Current Password"
              placeholderTextColor="#999999"
              autoCapitalize="none"
              onChangeText={changeOldPassword}
              value={oldpassword}
              secureTextEntry={true}
            />
          </View>




          <Text style={styles.text_footer}>New Username</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user"
              size={20}
            />
            <TextInput 
              placeholder="Username"
              style={styles.textInput} 
              placeholderTextColor="#999999"
              autoCapitalize="none"
              onChangeText={changeUsername} 
              value={username}
            />
          </View>



          <Text style={styles.text_footer}>New Email</Text>
          <View style={styles.action}>
            <MaterialIcons 
              name="email"
              size={20}
            />
            <TextInput 
              placeholder="Email"
              style={styles.textInput}  
              placeholderTextColor="#999999"
              autoCapitalize="none"
              onChangeText={changeEmail}
              value={email}

            />
          </View>





          <Text style={styles.text_footer}>New Phone#</Text>
          <View style={styles.action}>
            <MaterialIcons 
              name="phone"
              size={20}
            />
            <TextInput 
              placeholder="Phone #"
              style={styles.textInput} 
              placeholderTextColor="#999999"
              autoCapitalize="none"
              onChangeText={changePhone}
              value={phone} 
            />
          </View>






          <Text style={styles.text_footer}>New Password</Text>
          <View style={styles.action}>
            <Feather 
              name="lock"
              size={20}
            />
            <TextInput 
              placeholder="Password"
              style={styles.textInput} 
              placeholderTextColor="#999999"
              autoCapitalize="none"
              onChangeText={changePassword}            
              value={password}
              secureTextEntry={true}
            />
          </View>



          <Text style={styles.text_footer}>New Confirm Password</Text>
          <View style={styles.action}>
            <Feather 
              name="lock"
              size={20}
            />
            <TextInput 
              placeholder="Confirm Password"
              style={styles.textInput} 
              placeholderTextColor="#999999"
              autoCapitalize="none"
              onChangeText={changeconfirmPassword}            
              value={confirmpassword}
              secureTextEntry={true}
            />
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
              }]}>Update</Text>
            </TouchableOpacity>

          </View>          
        </Animatable.View>
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


































































































