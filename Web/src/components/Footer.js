// import React from 'react';
// import "../css/footer.css";

// function Footer() {
//   return (
//     <div className="main-footer">
//     <div className="containter">
//       <div className="row">
//         <div className="col">
//           <h4>Crick-App</h4>
//           <ul className="list-unstyled">
//             <li><strong>Created By :</strong></li>
//             <li>Faisal Shakeel</li>
//             <li>Saran Ahmed</li>
//           </ul>
//         </div>
        
//         <div className="col">
//           <h4>Linkedin Accounts : </h4>
//           <ul className="list-unstyled" >
            
//             <li><a href="https://www.linkedin.com/in/faisal-khan-2121a4182/"><span>Faisal Shakeel</span></a></li>
//             <li>Saran Ahmed</li>
//           </ul>
//         </div>

//         <div className="col">
//           <h4><strong>Crick-App functionalities : </strong></h4>
//           <ul className="list-unstyled">
//             <li><a><span>Learn About the this application and </span>
//             <br /><span>The functionalities that it performs</span></a></li>
//             <li><a><span>Download This application on your phone</span></a></li>
//           </ul>
//         </div>
        

//       </div>
//     <hr />
//       <div className="row">
//         <p className="col-sm">
//          <h5>&copy;{new Date().getFullYear()} || The smart System for Match prediction and viewing any match's statistics</h5> 
//         </p>
//       </div>
//     </div>
        
//     </div>

//   );
// }

// export default Footer;


import React from 'react';
// import "../css/footer.css";

const Footer = () =>
{
    return(
        
//     <header className="toolbar">
//     <nav className="toolbar_navigation">
        
//             <div className="toolbar_logo">
//                 <a href="/">Crick App</a>
                
//             </div>
//             <div className="spacer" />
//             <div className="toolbar_navigation-items">
            
//             <ul >
//              <li><strong>Created By :</strong></li>
//              <li>Faisal Shakeel</li>
//              <li>Saran Ahmed</li>
//            </ul>
                
//             </div>
        
//             <div className="spacer" />
//             <div className="toolbar_navigation-items">
//             <h4>Linkedin Accounts : </h4>
//            <ul>
            
//              <li><a href="https://www.linkedin.com/in/faisal-khan-2121a4182/"><span>Faisal Shakeel</span></a></li>
//              <li>Saran Ahmed</li>
//            </ul>
//             </div>
        
//             <div className="spacer" />
//             <div className="toolbar_navigation-items">
                
//             <h4><strong>Crick-App functionalities : </strong></h4>
//            <ul className="list-unstyled">
//              <li><a><span>Learn About the this application and </span>
//              <br /><span>The functionalities that it performs</span></a></li>
//              <li><a><span>Download This application on your phone</span></a></li>
//            </ul>

//             </div>
            
//             <div className="spacer" />
//             <div className="toolbar_navigation-items">
            
//             <h5>&copy;{new Date().getFullYear()} || The smart System for Match prediction and viewing any match's statistics</h5> 
//             </div>

//     </nav>
// </header>

<div className="ui inverted vertical footer segment" style={{position:"absolute" , bottom: "0" , width: "100%", marginTop: "100px" }}>
    <div className="ui container">
        Travel Match 2015. All Rights Reserved
    </div>
</div>

    );
}

export default Footer;