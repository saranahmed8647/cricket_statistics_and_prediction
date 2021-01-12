import React from 'react';

const NotFoundPage = () =>
{
    return(
        <div className="ui grid middle aligned segment red inverted" style={{height: "100%", margin: "0", display: 'flex',  justifyContent:'center', alignItems:'center'}}>
  <div className="ui column center aligned">
    <div className="ui inverted statistic">
      <div className="value">404</div>
      <div className="label">Error</div>
    </div>

    <div className="ui message red inverted">
      <div class="header">Description : </div>
      <p>You have entered a wrong URL, Please Navigate Back to the Main screen</p>
    </div>
    <button className="fluid ui button"><a href="/mainmenu">Main Menu</a></button>
    
  </div>
</div>
    );
}

export default NotFoundPage;