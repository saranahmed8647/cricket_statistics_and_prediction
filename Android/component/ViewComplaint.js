
import React,{useState,useEffect} from 'react';
import {Text,SafeAreaView,ScrollView, StyleSheet,TouchableOpacity,Alert,ActivityIndicator} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ViewComplaintB from './ViewComplaintB';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native-animatable';
import SyncStorage from 'sync-storage';
import axios from "axios";
import {Card} from "react-native-paper";
const ViewComplaint =({navigation}) =>
{
    const [ComplaintTitle, setComplaintTitle] = useState("");
    const [ComplaintDetails, setComplaintDetails] = useState("");
    // This is user session token
    const [UserToken, setUserToken] = useState("");
    const [loginStatus, setLoginStatus] = useState(0);
    // THis is the token of the user from its user id
    const [ActualUserToken, setActualUserToken] = useState("");
    // THis is the email of the current user
    const [UserEmail, setUserEmail] = useState("");
    const [DataErrors, setDataErrors] = useState([]);
    // 0 is default, if 1, then a complaint has been already registered no need to show this page
    // If 2 then shown this page meaning no complaint has been registered.
    const [ComplaintStatus, setComplaintStatus] = useState(0);

    const [FullComplaint, setFullComplaint] = useState({});

    const [UserInput, setUserInput] = useState("");

    
  useEffect(() =>
  {
      const token = SyncStorage.get("user_id");
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
                          setUserToken(token);

                        //   /////////////////////////////////////////////

                        const usersessionData = 
                {
                    userSessionToken : token
                }
                // Getting user details from his user session id
                        axios.post(`http://192.168.0.107:5000/account/getUserFromSession`, usersessionData)
                        .then(json =>
                            {
                                // console.log(`User Token : ${json.data}`);
                                if(json.status === 200)
                                {
                                    // Setting user token
                                    setActualUserToken(json.data);
                                    // Getting user email by using user ID

                                    const userIDData = 
                                    {
                                        userIDToken : json.data
                                    }                   
                                    // Getting and setting user Email from DB using his ID
                                    axios.post(`http://192.168.0.107:5000/account/getUserEmailFromId`, userIDData)
                                    .then(json =>
                                        {
                                            // console.log(`User EMail  : ${json.data}`);
                                            if(json.status === 200)
                                            {
                                                setUserEmail(json.data);
                                                

                                                // Check if this user already has a complaint or not


                                                
                                    const InitiatorData = {
                                        InitiatorEmail : json.data
                                    }
                                    axios.post(`http://192.168.0.107:5000/complaints/getByEmail`, InitiatorData)
                                    .then(json =>
                                        {
                                            // console.log(json.data);
                                            if(json.status === 200)
                                            {
                                                if(!json.data)
                                                {
                                                    // No complaint details returned, no complaint exists
                                                    setComplaintStatus(2);
                                                }
                                                else
                                                {
                                                    setComplaintStatus(1);
                                                    setFullComplaint(json.data);
                                                }
                                            }
                                        })
                                            }

                                        })
                                        .catch(err =>
                                            {
                                                setDataErrors([...DataErrors , `Error getting user Email from User DB : ${err}`]);
                                            })

                                }
            
                            })
                        .catch(err =>
                            {
                                setDataErrors([...DataErrors , `Error getting user data from User DB : ${err}`]);
                            })
                        
            
                        // //////////////////////////////////////////////

                        // check here if this user has already registered a complaint or not
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

  const changeUserInput = (e) =>
  {
      setUserInput(e);
      
  }

  const submittedInput = () =>
  {
      console.log(UserInput);
      if(UserInput === ""){
          alert("Please Enter Text")
      }
      else{
    // Creating new message to be added to complaint
        const newMessage = {
        MessageBody : UserInput.trim(),  
        SenderEmail: UserEmail,
        InitiatorEmail: UserEmail
    }

    // http://localhost:5000/complaints
    axios.post(`http://192.168.0.107:5000/complaints/addMessage`, newMessage)
    .then(json =>
        {
            if(json.status === 200)
            {
                // NOTE : ADD POP UP HERE, SUCCESSFULLY ADDED A NEW MESSAGE TO COMPLAINT, GOING BACK TO HOME
                alert("Message has been successfully added to complaint, Going back to Home screen ");
                console.log("Successfully added Message to Complaint");
                navigation.navigate('Home');
            }
            
            

        })
        .catch(err =>
            {
                // NOTE: FAILED TO ADD MESSAGE TO THIS COMPLAINT, GOING TO HOME
                alert("Failed to add message to this complaint, Going to Home screen");
                console.log(`Failed to add Message to Complaint : ${err}`);
                navigation.navigate('Home');
            
            })

        }
  }

  // User logged in and complaint already exists
if(loginStatus === 1 && ComplaintStatus === 1)
{
    // if(FullComplaint !== {})
    // {
    //  
    // }
    
    // console.log(JSON.stringify(FullComplaint));

    if(FullComplaint["MessagesList"] !== undefined)
    {
        // FullComplaint["MessagesList"].map((item,index) =>(console.log(JSON.stringify(item))));
        // 
        return(

            <View style={{display:'flex',flex:1,flexDirection:'column', backgroundColor:'#fff'}}>
                
        
                <View style ={{marginTop : 20,marginBottom:10, marginLeft:5}}>
                    <Text style={{fontSize:15,color:'#3d3d29',fontWeight:'bold'}}>Complainee - {FullComplaint.Initiator.name}</Text>
                    <Text style={{fontSize:15,color:'#3d3d29',fontWeight:'bold'}}>Complaint Title - {FullComplaint.Title}</Text>
                </View>

        
                <ScrollView
                    ref={ref => {this.scrollView = ref}}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                    showsVerticalScrollIndicator={false}>
                    {FullComplaint["MessagesList"].map((item,index) =>( item["Sender"] === UserEmail ? <ViewComplaintB
                            
                            key = {index}
                            text={"Hello"}
                            message={item}
                            fullObject={FullComplaint}
                        /> : 
                        <ViewComplaintB
                            mine
                            key = {index}
                            text={"How are you"}
                            message={item}
                            fullObject={FullComplaint}
                        />))}

                </ScrollView>
        
    
                           

    
                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Type a message" 
                        value ={UserInput}
                        onChangeText={changeUserInput}
                    />
                    <MaterialIcons
                        name="send"
                        size={20}
                        onPress ={submittedInput}
                        style={{marginLeft:10, color:'blue'}}
                    />
                </View>

            </View>
    
        );
    }
    else
    {
        console.log("False");
        
    }
    // FullComplaint.MessagesList.map((item,index) =>(console.log(JSON.stringify(item))))
    // console.log(JSON.stringify(FullComplaint));
    
}

else if(loginStatus === 1 && ComplaintStatus === 2)
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
                <Text style={{color:'#fff',marginLeft:30, marginRight:30,fontSize:15,fontWeight:'bold'}}>No Complaint FOUND!!!{"\n\n"}You must have to lodge complaint first in order to view it or add more message to it{"\n\n"}Thanks</Text>
                {/* <TouchableOpacity
                    onPress={() =>navigation.navigate("Signin")}
                >
                    <Text style={{color:'#fff',fontWeight:'bold'}}>Go Back to Sign-In</Text>
                </TouchableOpacity> */}
            </View>

        </View>

    );
}
else
{
    <View>
        <Text>You must be logged in to perform profile actions</Text>
        <TouchableOpacity 
            style={{alignItems: "center",backgroundColor: "#841584",padding: 10}}      
            onPress={() => navigation.navigate('Signin')}
        >
            <Text style={{color:'white', fontSize:15}}>Return To Sign in</Text>
        </TouchableOpacity>
              
        <TouchableOpacity 
            style={{alignItems: "center",backgroundColor: "#841584",padding: 10}}      
            onPress={() => navigation.navigate('Signup')}
        >
            <Text style={{color:'white', fontSize:15}}>Sign up now</Text>
        </TouchableOpacity>
              
    </View>
}
  

return(
    <View style={{ alignItems:'center',justifyContent: 'center',flex: 1,backgroundColor: '#009387'}}>
        <ActivityIndicator size="large" color="#fff" />
    </View>
)
        
}



export default ViewComplaint;













const styles = StyleSheet.create({

    footer:{
        flexDirection:'row',
        marginBottom: 10
    },
    textInput:{
        borderBottomColor:'grey',
        borderBottomWidth:1,
        width:'85%',
        marginLeft:15

    }


})
  
  
  