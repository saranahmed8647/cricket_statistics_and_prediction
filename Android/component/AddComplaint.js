import React,{useState,useEffect} from 'react';
import { StyleSheet,Text,Button, View,TextInput, Image,TouchableOpacity,ActivityIndicator } from 'react-native';
import axios from "axios";
import SyncStorage from 'sync-storage';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Textarea from 'react-native-textarea';



export default function AddComplaint({navigation})
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
                                    console.log("SUccessfully got user from session id");
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
                                            console.log(`User EMail retrieved from ID  : ${json.data}`);
                                            if(json.status === 200)
                                            {
                                                setUserEmail(json.data);
                                                

                                                // Check if this user already has a complaint or not


                                                
                                    const InitiatorData = {
                                        InitiatorEmail : json.data
                                    }
                                    console.log(`Email for complaint : ${json.data}`);
                                    
                                    axios.post(`http://192.168.0.107:5000/complaints/getByEmail`, InitiatorData)
                                    .then(json =>
                                        {
                                            console.log(`Get complaint by email result : ${json.data}`);
                                            // console.log(json.data);
                                            if(json.status === 200)
                                            {
                                                if(!json.data)
                                                {
                                                    // No complaint details returned, no complaint exists
                                                    console.log("No complaint found");
                                                    setComplaintStatus(2);
                                                }
                                                else
                                                {
                                                    console.log("complaint found !!");
                                                    setComplaintStatus(1);
                                                }
                                            }
                                        })
                                        .catch(err =>
                                            {
                                                console.log(`Error getting anyting from complaint , Err : ${err}`);
                                            })
                                        
                                            }

                                        })
                                        .catch(err =>
                                            {
                                                console.log("Error getting user email from DB");
                                                setDataErrors([...DataErrors , `Error getting user Email from User DB : ${err}`]);
                                            })

                                }
            
                            })
                        .catch(err =>
                            {
                                console.log("Unable to get user from usersession");
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


    const ChangeComplaintTitle = (e) =>
    {
        setComplaintTitle(e);
    }

    const changeComplaintDetails= (e) =>
    {
        setComplaintDetails(e);
    }

    const DataSubmit = () =>
    {
        console.log("Data Submit running");
        
        if(ComplaintTitle === "" || ComplaintDetails === "")
        {
            setDataErrors([...DataErrors , "Complaint title and details must be filled"]);
            alert("Complaint Title and Complaint Details must be filled")
        }
        else if(ComplaintTitle.length < 10 || ComplaintDetails.length < 25)
        {
            setDataErrors([...DataErrors , "Complaint title Must be atleast 10 characters long and complaint details atleast 25 characters long"]);
            alert("Complaint Title must be atleast 10 characters long and Complaint Details must be atleast 25 characters long")
        }
        else
        {
                

    const newComplaint = 
    {
        ComplaintTitle: ComplaintTitle.trim(),
        MessageBody : ComplaintDetails.trim(),
        SenderToken : ActualUserToken 
    }


    axios.post("http://192.168.0.107:5000/complaints/newComplaint",newComplaint)
                .then(json =>
                    {
                        if(json.status === 200)
                        {
                            console.log("successfully lodged complaint");
                            // NOTE : ADD POP UP HERE THAT SUCCESSFULLY LODGED COMPLAINT< GOING TO HOME
                            alert("Successfully Lodged Complaint, Going to Home screen");
                            navigation.navigate('Home');
                        }

                        // console.log(json.data);
                        
                    })
                    .catch( err =>
                        {
                            console.log(`This is the error in catch : ${err.response.data}`);
                            console.log(UserToken);
                            // console.log(`Error lodging complaint : ${err}`);
                            
                            // NOTE: ADD POP UP HERE THAT FAILED TO LODGE COMPALINT MESSAGE
                            alert("Failed to Lodged Complaint");
                            navigation.navigate('Home');
                            setDataErrors(...DataErrors , `Error lodging complaint : ${err}`);
                        })

            
        }
    }

// User logged in and complaint already exists
if(loginStatus === 1 && ComplaintStatus === 1)
{
    console.log("User logged in and Complaint already exists");
    return(
 



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
                <Text style={{color:'#fff',marginLeft:30, marginRight:30,fontSize:15,fontWeight:'bold'}}>Sorry!!!{"\n\n"}You already have a current complaint, please view and add message to existing complaint if you would like to say something new to the Admin{"\n\n"}Thanks</Text>
            </View>

        </View>
    )
}

// User is logged in but no complaint exists till now
else if(loginStatus === 1 && ComplaintStatus === 2)
{
    console.log("User logged in but , Complaint Does not exists");
    return(
        <View style={styles.container}>
        <Animatable.View style={styles.header} animation="fadeInDownBig">
          <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Add Complaint!</Text>
        </Animatable.View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          
          <Text style={styles.text_footer}>Complaint Title</Text>
          <View style={styles.action}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Enter Complaint Title..." 
              placeholderTextColor="#999999"
              required={true}
              onChangeText={ChangeComplaintTitle} 
              value={ComplaintTitle}
            />
          </View>

          <Text style={styles.text_footer}>Complaint Details</Text>
          <View style={styles.action}>
            <Textarea 
              style={{
                paddingLeft: 10,
                color: '#05375a',

              }}
              placeholder="Enter Complaint Details..." 
              placeholderTextColor="#999999" 
              maxLength={500}
              onChangeText={changeComplaintDetails} 
              value={ComplaintDetails}
              required={true}
            />
          </View>


          <View style={styles.button}>

            <TouchableOpacity
              onPress={DataSubmit}
              style={[styles.signIn, {
                backgroundColor: '#009387',
                marginTop: 15
              }]}                
            >
              <Text style={[styles.textSign, {
                    color:'#fff'
              }]}>Lodge Complaint</Text>
            </TouchableOpacity>


          </View>          
    
        </Animatable.View>
        

        {/* <View>
            {DataErrors.length > 0 ? <Text>{DataErrors.map((item,index) =>(item))}</Text> :  <Text> </Text>}
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









































