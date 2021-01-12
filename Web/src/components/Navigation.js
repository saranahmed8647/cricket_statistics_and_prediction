import React from 'react';
import "../css/home.css";
import About from "./About.js";

function Navigation() {
  return (
    <div>
        <ul className="Main_ul">
            <li><a className="active" href="/">Home</a></li>
            
            <li><a href="/mainmenu">Login</a></li>
            <li><a href="/logout">Logout</a></li>
        </ul>
    </div>
  );
}

export default Navigation;