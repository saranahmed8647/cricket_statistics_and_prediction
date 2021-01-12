import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.components";
import AppRouter from './routers/AppRouter';
import Footer from "./components/Footer";


const App = () => {
  
  return (
    <div style={{height:"100%"}}>
      <AppRouter/>
      
    </div>    
  );
}

export default App;
