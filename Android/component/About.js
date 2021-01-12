import React from 'react';
import { StyleSheet,Text,Button,Image, View,TextInput,TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function About({navigation})
{

    return(

        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>About Us!</Text>

                
            </View>
            
            <Animatable.View 
                style={styles.footer}
                animation="fadeInUpBig"
            
            >
                <Text style={{fontWeight:'bold', fontSize:25}}>Welcome To Crictelligence</Text>
                <Text style={{fontSize:18, marginTop:15}}>Crictelligence is setting the agenda in cricket analytics. Combining the world’s
             most extensive cricket database and unique predictive models with the expertise
             of our diverse team of data scientists, programmers and analysts, Crictelligence provides 
             unrivalled analysis and insight to clients around the world.</Text>



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