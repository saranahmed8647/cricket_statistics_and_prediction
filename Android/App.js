// import React from 'react';
// import { NavigationContainer } from "@react-navigation/native";
// import {createStackNavigator} from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";

// import Home from "./component/Home.js";
// import About from "./component/About.js";
// import Logout from "./component/Logout.js";
// import Profile from "./component/Profile.js";
// import Teams from "./component/Teams.js";
// import Players from "./component/Players.js";
// import Snp from "./component/Snp.js";
// import Signin from "./component/Signin";
// import Signup from "./component/Signup";
// import Allrounder from "./component/Allrounder.js";
// import Batsman from "./component/Batsman.js";
// import Bowller from "./component/Bowller.js";
// import Viewmultipleallrounder from "./component/Viewmultipleallrounder.js"
// import Viewmultiplebatsman from "./component/Viewmultiplebatsman.js";
// import Viewmultiplebowller from "./component/Viewmultiplebowller.js";
// import Viewplayers from "./component/Viewplayers.js";
// import Viewsingleallrounder from "./component/Viewsingleallrounder.js";
// import Viewsinglebatsman from "./component/Viewsinglebatsman.js";
// import Viewsinglebowller from "./component/Viewsinglebowller.js";
// import AllrounderData from "./component/AllrounderData.js";
// import BatsmanData from "./component/BatsmanData.js";
// import BowllerData from "./component/BowllerData.js";
// import Viewsingleteam from "./component/Viewsingleteam.js";
// import Viewmultipleteam from "./component/Viewmultipleteam.js";
// import TeamData from "./component/TeamData.js";
// import Prediction from "./component/Prediction.js";
// import PredictionData from "./component/PredictionData.js";
// import Statistics from "./component/Statistics.js";
// import ChangeDetails from "./component/ChangeDetails.js";
// import DeleteAccount from "./component/DeleteAccount.js";
// import Complaint from "./component/Complaint.js";
// import AddComplaint from "./component/AddComplaint.js";
// import ViewComplaint from "./component/ViewComplaint.js";
// import SplashScreen from "./component/SplashScreen.js";
// import TeamA from "./component/Prediction/TeamA.js";
// import TeamB from "./component/Prediction/TeamB.js";
// import ViewPredictionResult from "./component/Prediction/ViewPredictionResult.js";

// import SystemRecommendation from "./component/SystemR/SystemRecommendation.js";
// import SquadB from "./component/SystemR/SquadB.js";
// import SystemPredictionResult from "./component/SystemR/SystemPredictionResult.js";

// import ForgetPassword from "./component/ForgetPassword.js"; 

// import CricInfo from "./component/CricInfo.js"; 



// const Stack = createStackNavigator();
// function HomeStack() {
//   return (
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen name = "SystemRecommendation" component={SystemRecommendation} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "SquadB" component={SquadB} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "SystemPredictionResult" component={SystemPredictionResult} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "ViewPredictionResult" component={ViewPredictionResult} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "TeamB" component={TeamB} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "TeamA" component={TeamA} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "AllrounderData" component={AllrounderData} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "BatsmanData" component={BatsmanData} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "BowllerData" component={BowllerData} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "Viewsingleteam" component={Viewsingleteam} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "Viewmultipleteam" component={Viewmultipleteam} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "TeamData" component={TeamData} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "Viewmultiplebowller" component={Viewmultiplebowller} options={{ headerShown:false,headerLeft:null }}/>
//       <Stack.Screen name = "Viewsinglebowller" component={Viewsinglebowller} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "Viewmultipleallrounder" component={Viewmultipleallrounder} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "Viewsingleallrounder" component={Viewsingleallrounder} options={{ headerShown:false,headerLeft:null }}/>
//       <Stack.Screen name = "Viewmultiplebatsman" component={Viewmultiplebatsman} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "Viewsinglebatsman" component={Viewsinglebatsman} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name ="Allrounder" component={Allrounder} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name ="Bowller" component={Bowller} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name ="Batsman" component={Batsman} options={{ headerShown:false,headerLeft:null }}/>
//       <Stack.Screen name ="Viewplayers" component={Viewplayers} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name="Players" component={Players} options={{headerShown:false,headerLeft:null}}/>
//       <Stack.Screen name="Teams" component={Teams} options={{headerShown:false,headerLeft:null}}/>
//       <Stack.Screen name="Statistics and Predictions Sections" component={Snp} options={{headerShown:false,headerLeft:null}}/>
//       <Stack.Screen name="Home" component={Home} options={{headerShown:false,headerLeft:null}}/>
//       <Stack.Screen name = "Statistics" component={Statistics} options={{ headerShown:false,headerLeft:null }}/>
//       <Stack.Screen name = "Prediction" component={Prediction} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name = "PredictionData" component={PredictionData} options={{ headerShown:false,headerLeft:null }}/>
//     </Stack.Navigator>
//   );
// }

// function AboutStack(){
//   return(

//     <Stack.Navigator initialRouteName="About">
//       <Stack.Screen name="About" component={About} options={{headerShown:false,headerLeft:null}}/>
//     </Stack.Navigator>
//   );
// } 
// function ProfileStack(){
//   return(
//     <Stack.Navigator initialRouteName="Profile">
//       <Stack.Screen name="Profile" component={Profile} options={{headerShown:false,headerLeft:null}}/>
//       <Stack.Screen name ="DeleteAccount" component={DeleteAccount} options={{ headerShown:false,headerLeft:null }}/>
//       <Stack.Screen name ="ChangeDetails" component={ChangeDetails} options={{headerShown:false, headerLeft:null }}/>

//     </Stack.Navigator>
//   );
// } 
// function ComplaintStack(){
//   return(
//     <Stack.Navigator initialRouteName="Complaint">
//       <Stack.Screen name="Complaint" component={Complaint} options={{headerShown:false,headerLeft:null}}/>
//       <Stack.Screen name="AddComplaint" component={AddComplaint} options={{headerShown:false, headerLeft:null }}/>
//       <Stack.Screen name="ViewComplaint" component={ViewComplaint} options={{ headerShown:false,headerLeft:null }}/>
//     </Stack.Navigator>
//   );
// }

// const Drawer = createDrawerNavigator();
// function HomeDrawer() {
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="Home" component={HomeStack} options={{headerShown:false,headerLeft:null}}/>
//       <Drawer.Screen name="About" component={AboutStack} options={{headerShown:false,headerLeft:null}}/>
//       <Drawer.Screen name="CricInfo" component={CricInfo} options={{headerShown:false,headerLeft:null}}/>
//       <Drawer.Screen name="Profile" component={ProfileStack} options={{ headerShown:false,headerLeft:null}}/>
//       <Drawer.Screen name="Complaint" component={ComplaintStack} options={{headerShown:false, headerLeft:null}}/>
//       <Drawer.Screen name="Logout" component={Logout} options={{headerShown:false, headerLeft:null}}/>

//     </Drawer.Navigator>
//   );
// }

// const RootStack = createStackNavigator();
// function Root() {
//   return (
//     <RootStack.Navigator initialRouteName="SplashScreen">
//       <RootStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown:false, headerLeft:null}}/>
//       <RootStack.Screen name="Signin" component={Signin} options={{ headerShown:false, headerLeft:null}}/>
//       <RootStack.Screen name="Signup" component={Signup} options={{ headerShown:false,headerLeft:null}}/>
//       <RootStack.Screen name="Home" component={HomeDrawer} options={{ headerShown:false,headerLeft:null }}/>
//       <RootStack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown:false,headerLeft:null }}/>
//     </RootStack.Navigator>
//   )
// }





// export default function App() {
//   return (
//     <NavigationContainer>
//       <Root />
//     </NavigationContainer>
//   );
// }





















































import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./component/Home.js";
import About from "./component/About.js";
import Logout from "./component/Logout.js";
import Profile from "./component/Profile.js";
import Teams from "./component/Teams.js";
import Players from "./component/Players.js";
import Snp from "./component/Snp.js";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Allrounder from "./component/Allrounder.js";
import Batsman from "./component/Batsman.js";
import Bowller from "./component/Bowller.js";
import Viewmultipleallrounder from "./component/Viewmultipleallrounder.js"
import Viewmultiplebatsman from "./component/Viewmultiplebatsman.js";
import Viewmultiplebowller from "./component/Viewmultiplebowller.js";
import Viewplayers from "./component/Viewplayers.js";
import Viewsingleallrounder from "./component/Viewsingleallrounder.js";
import Viewsinglebatsman from "./component/Viewsinglebatsman.js";
import Viewsinglebowller from "./component/Viewsinglebowller.js";
import AllrounderData from "./component/AllrounderData.js";
import BatsmanData from "./component/BatsmanData.js";
import BowllerData from "./component/BowllerData.js";
import Viewsingleteam from "./component/Viewsingleteam.js";
import Viewmultipleteam from "./component/Viewmultipleteam.js";
import TeamData from "./component/TeamData.js";
import Prediction from "./component/Prediction.js";
import PredictionData from "./component/PredictionData.js";
import Statistics from "./component/Statistics.js";
import ChangeDetails from "./component/ChangeDetails.js";
import DeleteAccount from "./component/DeleteAccount.js";
import Complaint from "./component/Complaint.js";
import AddComplaint from "./component/AddComplaint.js";
import ViewComplaint from "./component/ViewComplaint.js";
import SplashScreen from "./component/SplashScreen.js";
import TeamA from "./component/Prediction/TeamA.js";
import TeamB from "./component/Prediction/TeamB.js";
import ViewPredictionResult from "./component/Prediction/ViewPredictionResult.js";

import SystemRecommendation from "./component/SystemR/SystemRecommendation.js";
import SquadB from "./component/SystemR/SquadB.js";
import SystemPredictionResult from "./component/SystemR/SystemPredictionResult.js";

import ForgetPassword from "./component/ForgetPassword.js"; 

import CricInfo from "./component/CricInfo.js"; 



const Stack = createStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name = "SystemRecommendation" component={SystemRecommendation} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "SquadB" component={SquadB} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "SystemPredictionResult" component={SystemPredictionResult} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "ViewPredictionResult" component={ViewPredictionResult} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "TeamB" component={TeamB} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "TeamA" component={TeamA} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "AllrounderData" component={AllrounderData} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "BatsmanData" component={BatsmanData} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "BowllerData" component={BowllerData} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "Viewsingleteam" component={Viewsingleteam} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "Viewmultipleteam" component={Viewmultipleteam} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "TeamData" component={TeamData} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "Viewmultiplebowller" component={Viewmultiplebowller} options={{ headerShown:false,headerLeft:null }}/>
      <Stack.Screen name = "Viewsinglebowller" component={Viewsinglebowller} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "Viewmultipleallrounder" component={Viewmultipleallrounder} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "Viewsingleallrounder" component={Viewsingleallrounder} options={{ headerShown:false,headerLeft:null }}/>
      <Stack.Screen name = "Viewmultiplebatsman" component={Viewmultiplebatsman} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "Viewsinglebatsman" component={Viewsinglebatsman} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name ="Allrounder" component={Allrounder} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name ="Bowller" component={Bowller} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name ="Batsman" component={Batsman} options={{ headerShown:false,headerLeft:null }}/>
      <Stack.Screen name ="Viewplayers" component={Viewplayers} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name="Players" component={Players} options={{headerShown:false,headerLeft:null}}/>
      <Stack.Screen name="Teams" component={Teams} options={{headerShown:false,headerLeft:null}}/>
      <Stack.Screen name="Statistics and Predictions Sections" component={Snp} options={{headerShown:false,headerLeft:null}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false,headerLeft:null}}/>
      <Stack.Screen name = "Statistics" component={Statistics} options={{ headerShown:false,headerLeft:null }}/>
      <Stack.Screen name = "Prediction" component={Prediction} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name = "PredictionData" component={PredictionData} options={{ headerShown:false,headerLeft:null }}/>


      <Stack.Screen name ="DeleteAccount" component={DeleteAccount} options={{ headerShown:false,headerLeft:null }}/>
      <Stack.Screen name ="ChangeDetails" component={ChangeDetails} options={{headerShown:false, headerLeft:null }}/>

      <Stack.Screen name="AddComplaint" component={AddComplaint} options={{headerShown:false, headerLeft:null }}/>
      <Stack.Screen name="ViewComplaint" component={ViewComplaint} options={{ headerShown:false,headerLeft:null }}/>


    </Stack.Navigator>
  );
}



const Drawer = createDrawerNavigator();
function HomeDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStack} options={{headerShown:false,headerLeft:null}}/>
      <Drawer.Screen name="About" component={About} options={{headerShown:false,headerLeft:null}}/>
      <Drawer.Screen name="CricInfo" component={CricInfo} options={{headerShown:false,headerLeft:null}}/>
      <Stack.Screen name="Profile" component={Profile} options={{headerShown:false,headerLeft:null}}/>
      <Stack.Screen name="Complaint" component={Complaint} options={{headerShown:false,headerLeft:null}}/>
      <Drawer.Screen name="Logout" component={Logout} options={{headerShown:false, headerLeft:null}}/>

    </Drawer.Navigator>
  );
}

const RootStack = createStackNavigator();
function Root() {
  return (
    <RootStack.Navigator initialRouteName="SplashScreen">
      <RootStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown:false, headerLeft:null}}/>
      <RootStack.Screen name="Signin" component={Signin} options={{ headerShown:false, headerLeft:null}}/>
      <RootStack.Screen name="Signup" component={Signup} options={{ headerShown:false,headerLeft:null}}/>
      <RootStack.Screen name="Home" component={HomeDrawer} options={{ headerShown:false,headerLeft:null }}/>
      <RootStack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown:false,headerLeft:null }}/>
    </RootStack.Navigator>
  )
}





export default function App() {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}

