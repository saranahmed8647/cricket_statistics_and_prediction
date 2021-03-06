


import React from 'react';
import { StyleSheet,Text,Button,Image, View,TextInput,TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Home({navigation})
{

    return(
  
      <View style={styles.container}>
        <Animatable.View style={styles.header} animation="fadeInDownBig">
          <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>Crictelligence!</Text>
        </Animatable.View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          
          <View style={styles.button}>

            <TouchableOpacity
              onPress={() =>  navigation.navigate('Teams')}
              style={[styles.signIn, {
                backgroundColor: '#009387',
                marginTop: 15
              }]}                
            >
              <Text style={[styles.textSign, {
                    color:'#fff'
              }]}>Teams Section</Text>
            </TouchableOpacity>





            <TouchableOpacity
              onPress={() =>  navigation.navigate('Players')}
              style={[styles.signIn, {
                backgroundColor: '#009387',
                marginTop: 15
              }]}                
            >
              <Text style={[styles.textSign, {
                    color:'#fff'
              }]}>Players Section</Text>
            </TouchableOpacity>




            
            <TouchableOpacity
              onPress={() => navigation.navigate('Statistics and Predictions Sections')}
              style={[styles.signIn, {
                backgroundColor: '#009387',
                marginTop: 15
              }]}                
            >
              <Text style={[styles.textSign, {
                    color:'#fff'
              }]}>Statistics and Prediction</Text>
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  