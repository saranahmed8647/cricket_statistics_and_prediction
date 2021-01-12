import React from 'react';
import Navigation from "./Navigation.js";
import Header from "./Header.js";

import "./Home.css";

// import Footer from "./Footer.js";


function Home() {
  return (
    <div>
      <div className="ui large top fixed hidden menu">
  <div className="ui container">
    <a className="active item" href="/">Home</a>
    
    <div className="right menu">
      <div className="item">
        <a className="ui button" href="/mainmenu">Log in</a>
      </div>
      <div className="item">
        <a className="ui primary button" href="/logout">Log out</a>
        
      </div>
    </div>
  </div>
</div>


<div className="ui vertical inverted sidebar menu">
<a className="active item" href="/">Home</a>
  
</div>



<div className="pusher" >
  <div className="ui inverted vertical masthead center aligned segment">

    <div className="ui container">
      <div className="ui large secondary inverted pointing menu">
        <a className="toc item">
          <i className="sidebar icon"></i>
        </a>
        <a className="active item" href="/">Home</a>
        
        <div className="right item">
        <a className="ui button" href="/mainmenu">Log in</a>
        <a className="ui primary button" href="/logout">Log out</a>
        </div>
      </div>
    </div>

    <div className="ui text container">
      <h1 className="ui inverted header">
        Cricktelligence &copy; 

      </h1>
      <h2>Download our App on your phones to get started</h2>
      
      <div className="ui huge primary button" ><a href="https://drive.google.com/drive/folders/1sJ3DmxN6ueUWHd--l0ctblh--XJmzkQJ?usp=sharing" style={{color: "white"}}>Get Started <i className="right arrow icon"></i></a></div>
    </div>

  </div>

  <div className="ui vertical stripe segment">
    <div className="ui middle aligned stackable grid container">
      <div className="row">
        <div className="eight wide column">
          <h3 className="ui header">Player and Teams Data : </h3>
          <p>Our system has upto date Data from ICC</p>
          <p>You can view the stats of any international Team or any cricketer, by selecting them from their name, country or player category</p>
          <h3 className="ui header">Accurate Match Prediction and statistics</h3>
          <p>Our system will predict whether a Team wins or not against another team based on their past interactions and venue choice.</p>
          <p>Or you can see the winning percentage of a team by choosing squad members for a team and its opposing Team </p>
        </div>
        <div className="six wide right floated column" style={{marginTop:'5%'}}>
          <img src={require("./Home_assets/cricket4.png")} className="ui large bordered rounded image" alt="ICC image" />
        </div>
      </div>
      
    </div>
  </div>


  <div className="ui vertical stripe quote segment">
    <div className="ui equal width stackable internally celled grid">
      <div className="center aligned row">
        <div style={{marginLeft:'17%'}} className="column">
          <h3>Complaint to Admin at anytime</h3>
          <p>Have a query or see a bug ? drop a complaint to the Admin and the Admin will soon
          respond back to you.</p>
        </div>
        <div className="column">
          <h3>Up to Date Cricket Data on the go</h3>
          <p>
            Ability to view any cricket stat on the go on your phone. 
          </p>
          <p>
          Our cricket stats are updated on regular basis.
          </p>
        </div>
      </div>
    </div>
  </div>
{/* 
  <div className="ui vertical stripe segment">
    <div className="ui text container">
      <h3 className="ui header">Breaking The Grid, Grabs Your Attention</h3>
      <p>Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.</p>
      <a className="ui large button">Read More</a>
      <h4 className="ui horizontal header divider">
        <a href="#">Case Studies</a>
      </h4>
      <h3 className="ui header">Did We Tell You About Our Bananas?</h3>
      <p>Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but its really true. It took years of gene splicing and combinatory DNA research, but our bananas can really dance.</p>
      <a className="ui large button">I'm Still Quite Interested</a>
    </div>
  </div> */}


  <div className="ui inverted vertical footer segment">
    <div className="ui container">
    <h3><strong>Our Incredible Team</strong></h3>
    <hr/>
      <div className="ui stackable inverted divided equal height stackable grid">
        
        <div className="six wide column">
          <h4 className="ui inverted header">Faisal Shakeel : </h4>
          <div className="ui inverted link list">
            <a href="https://www.linkedin.com/in/faisal-khan-2121a4182/" className="item">Linkedin : <i class="linkedin icon"></i></a>
            
            <a href="https://github.com/faisal-shakeel" className="item">Github : <i class="github icon"></i></a>
            
            <a href="https://stackoverflow.com/users/13826103/faisalshakeel" className="item">Stack overflow : <i class="stack overflow icon"></i></a>
            
          </div>
          
        </div>
        <div className="six wide column">
        <h4 className="ui inverted header">Saran Ahmed : </h4>
          <div className="ui inverted link list">
            <a href="#" className="item">Linkedin : <i class="linkedin icon"></i></a>
            
            <a href="https://github.com/saranahmed8647" className="item">Github : <i class="github icon"></i></a>
            
            <a href="#" className="item">Stack overflow : <i class="stack overflow icon"></i></a>
            
          </div>
          
        </div>
        {/* <div className="seven wide column">
          <h4 className="ui inverted header">Footer Header</h4>
          <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
        </div> */}
      </div>
    </div>
  </div>
</div>
    </div>
    
  );
}

export default Home;



