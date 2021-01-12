import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import MainMenu from "../components/MainMenu.components";
import Login from "../components/login.components";

import NotFoundPage from "../components/NotFound/NotFoundPage.component";

// Profile section
import ProfileMain from "../components/Profile/ProfileMain.component";
import ProfileUpdate from "../components/Profile/ProfileUpdate.component";
import ProfileDelete from "../components/Profile/ProfileDelete.component";
import AddAdminAccount from "../components/Profile/AddAdminAccount.component";
// Profile section


import TeamsSectionMain from "../components/TeamsSection/TeamsSectionMain.component";
import PredictionSectionMain from "../components/PredictionSection/PredictionSectionMain.component";

import AddTeams from "../components/TeamsSection/Add/AddTeams.component";
import RemoveTeams from "../components/TeamsSection/Remove/RemoveTeams.component";
import ViewTeams from "../components/TeamsSection/View/ViewTeams.component";
import UpdateTeam from "../components/TeamsSection/Update/UpdateTeam.component";

import AddSingleTeam from "../components/TeamsSection/Add/AddSingleTeam.component";
import AddMultipleTeams from "../components/TeamsSection/Add/AddMultipleTeams.component";

import ViewAllTeams from "../components/TeamsSection/View/ViewAllTeams.component";
import TeamDetail from "../components/TeamsSection/View/TeamDetail.component";
import ViewSingleTeam from "../components/TeamsSection/View/ViewSingleTeam.component";

import RemoveMultipleTeams from "../components/TeamsSection/Remove/RemoveMultipleTeams.component";
import RemoveSingleTeam from "../components/TeamsSection/Remove/RemoveSingleTeam.component";


import Home from "../components/Home";

import Logout from "../components/logout.component";

// Player Section
import PlayerSectionMain from "../components/PlayersSection/PlayersSectionMain.component";

import AddPlayersMain from "../components/PlayersSection/Add/AddPlayersMain.component";
import ViewPlayersMain from "../components/PlayersSection/View/ViewPlayersMain.component";
import UpdatePlayersMain from "../components/PlayersSection/Update/UpdatePlayersMain.component";
import RemovePlayersMain from "../components/PlayersSection/Remove/RemovePlayersMain.component";

import AddBatsmenMain from "../components/PlayersSection/Add/batsmen/AddBatsmenMain.component";
import AddBowlersMain from "../components/PlayersSection/Add/bowlers/AddBowlersMain.component";
import AddAllroundersMain from "../components/PlayersSection/Add/allrounders/AddAllroundersMain.component";

import AddMultipleAllrounders from "../components/PlayersSection/Add/allrounders/AddMultipleAllrounders.component";
import AddSingleAllrounder from "../components/PlayersSection/Add/allrounders/AddSingleAllrounder.component";

import AddSingleBatsman from "../components/PlayersSection/Add/batsmen/AddSingleBatsman.component";
import AddMultipleBatsmen from "../components/PlayersSection/Add/batsmen/AddMultipleBatsmen.component";

import AddSingleBowler from "../components/PlayersSection/Add/bowlers/AddSingleBowler.component";
import AddMultipleBowlers from "../components/PlayersSection/Add/bowlers/AddMultipleBowlers.component";

import ViewAllroundersMain from "../components/PlayersSection/View/Allrounder/ViewAllroundersmain.component";
import ViewBatsmenMain from "../components/PlayersSection/View/batsman/ViewBatsmenMain.component";
import viewBowlersMain from "../components/PlayersSection/View/Bowler/ViewBowlerMain.component";

import ViewMultipleAllrounders from "../components/PlayersSection/View/Allrounder/ViewMultipleAllrounders.component";
import viewSingleAllrounder from "../components/PlayersSection/View/Allrounder/ViewSIngleAllrounder.component";

import ViewMultipleBatsmen from "../components/PlayersSection/View/batsman/ViewMultipleBatsmen.component";
import ViewSingleBatsman from "../components/PlayersSection/View/batsman/ViewSingleBatsman.component";

import ViewMultipleBowlers from "../components/PlayersSection/View/Bowler/ViewMultipleBowlers.component";
import viewSingleBowler from "../components/PlayersSection/View/Bowler/ViewSingleBowler.component";

import viewPlayerByCountry from "../components/PlayersSection/View/ByCountry/viewPlayerByCountry.component";

import AllrounderDetails from "../components/PlayersSection/View/Allrounder/AllrounderDetails.component";
import BatsmenDetails from "../components/PlayersSection/View/batsman/BatsmenDetails.component";
import BowlersDetails from "../components/PlayersSection/View/Bowler/BowlersDetails.component";

import AllroundersMain from "../components/PlayersSection/Remove/Allrounder/RemoveAllrounderMain.component";
import removeBatsmenMain from "../components/PlayersSection/Remove/Batsman/RemoveBatsmanMain.component";
import removeBowlersMain from "../components/PlayersSection/Remove/Bowler/RemoveBowlerMain.component";

import RemoveSingleAllrounder from "../components/PlayersSection/Remove/Allrounder/RemoveSingleAllrounder.component";
import RemoveMultipleAllrounders from "../components/PlayersSection/Remove/Allrounder/RemoveMultipleAllrounders.component";

import RemoveSingleBatsman from "../components/PlayersSection/Remove/Batsman/RemoveSingleBatsman.component";
import RemoveMultipleBatsmen from "../components/PlayersSection/Remove/Batsman/RemoveMultipleBatsmen.component";

import RemoveSingleBowler from "../components/PlayersSection/Remove/Bowler/RemoveSingleBowler.component";
import RemoveMultipleBowlers from "../components/PlayersSection/Remove/Bowler/RemoveMultipleBowlers.component";

import UpdateAllrounderMain from "../components/PlayersSection/Update/Allrounder/UpdateAllrounderMain.component";
import UpdateBatsmanMain from "../components/PlayersSection/Update/Batsman/UpdateBatsmanMain.component";
import UpdateBowlersMain from "../components/PlayersSection/Update/Bowler/UpdateBowlerMain.component";
import UpdateByName from "../components/PlayersSection/Update/ByName/UpdateByNameMain.component";

import UpdateOneAllrounder from "../components/PlayersSection/Update/Allrounder/UpdateOneAllrounder.component";
import UpdateOneBatsman from "../components/PlayersSection/Update/Batsman/UpdateOneBatsman.component";
import UpdateOneBowler from "../components/PlayersSection/Update/Bowler/UpdateOneBowler.component";

import PlayersByCountryList from "../components/PlayersSection/View/ByCountry/PlayersByCountryList.component";

import Hideandshow from "../components/PlayersSection/View/ByCountry/HideandShow";
// Player section

// Prediction section
import TeamWinPredictionMain from "../components/PredictionSection/WinPrediction/TeamWinPredictionMain.component";

import TeamPredictionResult from "../components/PredictionSection/WinPrediction/TeamPredictionResults.component";

import SquadPredictionMain from "../components/PredictionSection/SquadBasedPrediction/SquadPredictionMain";


import TeamAPrediction from "../components/PredictionSection/SquadBasedPrediction/TeamA";

import TeamBPrediction from "../components/PredictionSection/SquadBasedPrediction/TeamB";

import ViewSquadPrediction from "../components/PredictionSection/SquadBasedPrediction/ViewPrediction";

import SquadRecommendationMain from "../components/PredictionSection/SquadRecommendation/SquadRecommendationMain.component";

import TeamBSelection from "../components/PredictionSection/SquadRecommendation/TeamBSelection.component";

import SquadRecommendationResult from "../components/PredictionSection/SquadRecommendation/SquadRecommendationResult.component";

import SingleRecommendationMain from "../components/PredictionSection/SingleRecommendation/SingleRecommendationMain.component";
import TeamAPlayer from "../components/PredictionSection/SingleRecommendation/TeamAPlayer.component";
import TeamBPlayer from "../components/PredictionSection/SingleRecommendation/TeamBPlayer.component";
import SinglePredictionResult from "../components/PredictionSection/SingleRecommendation/SinglePredictionResult.component";

// Prediction section


// User section

import UserMain from "../components/Users/UsersMain.component";

import UserDetail from "../components/Users/UserDetail.component";

// User section

// Complaint Section
import ComplaintMain from "../components/Complaint/ComplaintMain.component";
import AllComplaint from "../components/Complaint/AllComplaint.component";

// Change Password Section

import Reset from "../components/Reset.components";
import NewPassword from "../components/NewPassword.components";
import NewPasswordUser from "../components/NewPasswordUser.components";

// Verify Email section
import EmailVerify from "../components/EmailVerify.component";

// Complaint Section
const histroy = createBrowserHistory();

const AppRouter = () => (
    <BrowserRouter>
        <div history={histroy}>
            {/*<Header />*/}
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/mainmenu" component={MainMenu} exact={true}/>
                <Route path='/login' component={Login}/>
                <Route path='/logout' component={Logout}/>
                {/* Profile section */}
                <Route path='/profile' component={ProfileMain}/>
                <Route path='/ProfileUpdate' component={ProfileUpdate}/>
                <Route path='/ProfileDelete' component={ProfileDelete}/>
                <Route path='/AddAdminAccount' component={AddAdminAccount}/>
                
                <Route path='/teamMain' component={TeamsSectionMain}/>
                
                <Route path='/addTeams' component={AddTeams}/>
                <Route path='/viewTeams' component={ViewTeams}/>
                <Route path='/UpdateTeams' component={UpdateTeam}/>
                <Route path= '/removeTeams' component={RemoveTeams}/>

                <Route path= '/addSingleTeam' component={AddSingleTeam}/>
                <Route path= '/addMultipleTeams' component={AddMultipleTeams}/>

                
                <Route path= "/ViewAllTeams" component={ViewAllTeams}/>
                <Route path= "/TeamDetail/:name" component={TeamDetail}/>
                <Route path= '/ViewSingleTeam' component={ViewSingleTeam}/>
                
                <Route path= '/RemoveMultipleTeams' component={RemoveMultipleTeams}/>
                <Route path= '/RemoveATeam' component={RemoveSingleTeam}/>
                


                {/* Players Section */}
                <Route path='/playerMain' component={PlayerSectionMain}/>

                <Route path='/addPlayers' component={AddPlayersMain}/>
                <Route path='/viewPlayers' component={ViewPlayersMain}/>
                <Route path='/UpdatePlayers' component={UpdatePlayersMain}/>
                <Route path='/removePlayers' component={RemovePlayersMain}/>
                
                <Route path='/addBatsmenMain' component={AddBatsmenMain}/>
                <Route path='/addBowlersMain' component={AddBowlersMain}/>
                <Route path='/addAllroundersMain' component={AddAllroundersMain}/>
                
                <Route path='/addMultipleAllrounders' component={AddMultipleAllrounders}/>
                <Route path='/addSingleAllrounder' component={AddSingleAllrounder}/>
                
                <Route path='/addSingleBatsman' component={AddSingleBatsman}/>
                <Route path='/addMultipleBatsmen' component={AddMultipleBatsmen}/>

                <Route path='/addSingleBowler' component={AddSingleBowler}/>
                <Route path='/addMultipleBowlers' component={AddMultipleBowlers}/>
                
                <Route path='/viewAllroundersMain' component={ViewAllroundersMain}/>
                <Route path='/viewBatsmenMain' component={ViewBatsmenMain}/>
                <Route path='/viewBowlersMain' component={viewBowlersMain}/>
                
                <Route path='/viewMultipleAllrounders' component={ViewMultipleAllrounders}/>
                <Route path='/viewSingleAllrounder' component={viewSingleAllrounder}/>
                
                
                <Route path='/viewMultiplebatsmen' component={ViewMultipleBatsmen}/>
                <Route path='/viewSingleBatsman' component={ViewSingleBatsman}/>
                
                <Route path='/viewMultipleBowlers' component={ViewMultipleBowlers}/>
                <Route path='/viewSingleBowler' component={viewSingleBowler}/>
                
                <Route path='/viewPlayerByCountry' component={viewPlayerByCountry}/>
                
                <Route path='/AllroundersDetails/:name' component={AllrounderDetails}/>
                
                <Route path='/batsmenDetails/:name' component={BatsmenDetails}/>
                <Route path='/PlayersByCountryList/:name' component={PlayersByCountryList}/>
                
                <Route path='/bowlersDetails/:name' component={BowlersDetails}/>
                
                
                <Route path='/removeAllroundersMain' component={AllroundersMain}/>
                <Route path='/removeBatsmenMain' component={removeBatsmenMain}/>
                <Route path='/removeBowlersMain' component={removeBowlersMain}/>
                
                <Route path='/RemoveSingleAllrounder' component={RemoveSingleAllrounder}/>
                <Route path='/RemoveMultipleAllrounders' component={RemoveMultipleAllrounders}/>
                
                <Route path='/RemoveSingleBatsman' component={RemoveSingleBatsman}/>
                <Route path='/RemoveMultipleBatsmen' component={RemoveMultipleBatsmen}/>
                
                <Route path='/RemoveSingleBowler' component={RemoveSingleBowler}/>
                <Route path='/RemoveMultipleBowlers' component={RemoveMultipleBowlers}/>
                
                <Route path='/UpdateAllroundersMain' component={UpdateAllrounderMain}/>
                <Route path='/UpdateBatsmenMain' component={UpdateBatsmanMain}/>
                <Route path='/UpdateBowlersMain' component={UpdateBowlersMain}/>
                <Route path='/UpdatePlayerByNameMain' component={UpdateByName}/>
                
                <Route path='/UpdateOneAllrounder/:name' component={UpdateOneAllrounder}/>
                <Route path='/UpdateOneBatsman/:name' component={UpdateOneBatsman}/>
                <Route path='/UpdateOneBowler/:name' component={UpdateOneBowler}/>
                <Route path='/Hideandshow/:name' component={Hideandshow}/>
                
                

                {/* Players section */}
                
                
                {/* Prediction Section */}
                <Route path='/predictionMain' component={PredictionSectionMain}/>
                <Route path='/TeamWinPredictionMain' component={TeamWinPredictionMain}/>
                
                {/* <Route path='/TeamPredictionResults/:team_data' component={TeamPredictionResult}/> */}
                <Route path='/TeamPredictionResults' component={TeamPredictionResult}/>
                
                <Route path='/SquadPredictionMain' component={SquadPredictionMain}/>
                
                <Route path='/TeamAPrediction' component={TeamAPrediction}/>
                
                <Route path='/TeamBPrediction' component={TeamBPrediction}/>
                
                <Route path='/ViewSquadPrediction' component={ViewSquadPrediction}/>
                {/* Squad Recommendation */}
                <Route path='/SquadRecommendationMain' component={SquadRecommendationMain}/>
                
                
                <Route path='/TeamBSelection' component={TeamBSelection}/>
                
                <Route path='/SquadRecommendationResult' component={SquadRecommendationResult}/>
                
                
                <Route path='/SingleRecommendationMain' component={SingleRecommendationMain}/>
                <Route path='/TeamAPlayer' component={TeamAPlayer}/>
                <Route path='/TeamBPlayer' component={TeamBPlayer}/>
                <Route path='/SinglePredictionResult' component={SinglePredictionResult}/>
                {/* Prediction Section */}

                {/* User section  */}
                <Route path='/userMain' component={UserMain}/>
                <Route path= "/UserDetail/:email" component={UserDetail}/>
                {/* User section  */}

                {/* Complaint Section */}

                <Route path='/Complaints' component={ComplaintMain}/>
                <Route path='/Allcomplaint' component={AllComplaint}/>
                
                {/* Complaint Section */}
                {/* Forgot Password Section */}

                <Route exact path='/reset' component={Reset}/>
                <Route path='/reset/:token' component={NewPassword}/>
                <Route path='/resetUser/:token' component={NewPasswordUser}/>
                {/* Forgot Password Section */}
                {/* Verify EMail */}
                <Route path='/EmailVerify/:token' component={EmailVerify}/>
                {/* Verify EMail */}
                <Route component={NotFoundPage}/>
                
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;