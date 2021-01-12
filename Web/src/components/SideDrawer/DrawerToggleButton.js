import React from 'react';
import "./DrawerToggleButton.css";

const DrawerToggleButton = (props) =>
{
// This prop is coming from Toolbar.component, this on click will fire up the function in firstScreen
    return(
        
    
    <button className="toggle-button" onClick={props.click} >
    <div className="toggle-button_line" />
    <div className="toggle-button_line" />
    <div className="toggle-button_line" />
    
    
    </button>
    );
};

export default DrawerToggleButton;