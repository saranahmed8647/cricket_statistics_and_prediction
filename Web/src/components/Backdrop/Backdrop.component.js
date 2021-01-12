import React from 'react';
import "./Backdrop.css";
// This is the reusable component backdrop. It is a screen that will appear in front
// of the current screen behind the navbar to blur everything whenever we open the navbar
const Backdrop = (props) =>
{
    // This prop is coming fro firstScreen
    return(
        <div className="backdrop" onClick={props.click} />
    );
    
}

export default Backdrop;