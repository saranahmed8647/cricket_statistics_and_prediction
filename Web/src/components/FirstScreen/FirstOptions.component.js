import React,{ useState, useEffect } from "react";
// import { createBrowserHistory as history} from 'history';
import { useHistory } from "react-router-dom";
import "./FirstOptions.css";

// Screen schown on firstscreen after we are logged in
const FirstOptions = () =>
{
    const history = useHistory();
    
    useEffect(() =>
    {
        
    },[]);


return(
    <div className="body">
    <div className="container">
        <div className="vertical-center">
            <div style={{height : "100px", width: "20px",marginLeft:150,marginTop:50}}> <img src={require('./cricket1.png')} /></div>
            <div><button style={{background:"orange",fontSize:20}} className="ui yellow basic button" onClick={() => history.push('/teamMain')} ><strong>Teams Section</strong></button></div>
            <br />
            <br />
            
            <div><button style={{background:"purple",fontSize:20}} className="ui purple basic button" onClick={() => history.push('/playerMain')} ><strong>Players Section</strong></button></div>
            <br />
            <br />
            
            <div><button style={{background:"blue",fontSize:20}} className="ui blue basic button" onClick={() => history.push('/predictionMain')} ><strong>Prediction and Statistics section</strong></button></div>
        </div> 
    </div>

</div>
);        


}
        


export default FirstOptions;