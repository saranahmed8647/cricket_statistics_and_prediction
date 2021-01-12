
import React from 'react';
import { StyleSheet,Text,Button,Image, View,TextInput,TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function SplashScreen({navigation})
{

    return(

        <View style={styles.container}>
            
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    resizeMode="stretch"
                    source={require('../assets/cricket.png')}
                />
            </View>
            
            <Animatable.View 
                style={styles.footer}
                animation="fadeInUpBig"
            
            >
                <Text style={{fontWeight:'bold', fontSize:20}}>Welcome To Crictelligence</Text>
                <Text>A new era of cricket begins</Text>

                <View style={{
                        marginTop:30,
                        backgroundColor:'#009387',
                        width:'40%',
                        alignItems:'center',
                        marginLeft:'55%',
                        borderRadius:30


                        }}>

                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => navigation.navigate('Signin')}
                    >
                        <Text style={styles.textSign}>Get Started</Text>
                        <MaterialIcons 
                            name="navigate-next"
                            color="#fff"
                            size={20}
                        />
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
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    },


    
  });