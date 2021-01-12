import React from 'react';
import { StyleSheet,Text,ScrollView,Button,Image, View,TextInput,TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function CricInfo({navigation})
{

    return(

        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={{color:'white', fontWeight:'bold', fontSize:30}}>CricInfo!</Text>

                
            </View>
            
            <Animatable.View 
                style={styles.footer}
                animation="fadeInUpBig"
            
            >
                <Text style={{fontWeight:'bold', fontSize:25}}>Rules of Cricket</Text>

                <ScrollView showsVerticalScrollIndicator ={false}>
                    <Text>
                        Cricket is played by two teams of 11, with one side taking a turn to bat a ball and score runs, while the other team will bowl and field the ball to restrict the opposition from scoring. The main objective in cricket is to score as many runs as possible against the opponent. Before the match begins, the captain of both teams will toss a coin, with the winner of the toss being able to decide which team bats and fields first.
                        {"\n\n"}
                        Each cricket match consists of periods known as innings, and the number of innings that each team has will be determined before the match, usually one or two. During an inning, one team bats the ball while the other attempts to field. Both teams take turns alternating between batting and fielding.
                        {"\n\n"}
                        The match takes place on an oval cricket field, which consists of a rectangular pitch in the center. A boundary marks the perimeter of the field, and can take the form of a fence, ropes or lines. Additionally, a wooden target known as the wicket is placed on both ends of the rectangular pitch, approximately 20 meters apart. The wicket is made out of three stumps, supporting two bails that sit on the stumps.
                        {"\n\n"}
                        Lines also mark the pitch, with a line called the bowling crease placed in line to the wicket. Another line, known as the popping or batting crease, is located around 1.2 meters in front of the wicket. These creases determine the area in which the bowler and batter can operate.
                        {"\n\n"}
                        While the game is in progress, all 11 members of the fielding team have to be on the field, but only two members of the batting team are allowed to be on the playing ground. A player is selected from the fielding team and he is known as the bowler, while the rest of the 10 players are known as fielders. The bowler will then attempt to hit the wicket with the ball, while one of the fielders – specifically known as the wicket keeper – crouches behind the wicket to catch the ball if it misses.
                        {"\n\n"}
                        The batsman from the opposition team will attempt to hit the bowled ball before it hits the wicket. The rest of the fielders are required to chase the ball once the batsman has hit it. The role of the batsman is to prevent the wicket from getting hit by the ball, by batting the ball away. Additionally, in order to score a run, both batsman have to run from their respective wickets to the other as many times as possible after a ball has been hit.
                        {"\n\n"}
                    </Text>

                </ScrollView>

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
        flex: 5,
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