
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { getFromStorage , setInStorage } from "../../utils/storage"; 
import { useHistory } from "react-router-dom";

import Toolbar from "../../Toolbar/Toolbar.component";
import SideDrawer from "../../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../../Backdrop/Backdrop.component";



function index(obj,is, value) {
  if (typeof is == 'string')
      return index(obj,is.split('.'), value);
  else if (is.length==1 && value!==undefined)
      return obj[is[0]] = value;
  else if (is.length==0)
      return obj;
  else
      return index(obj[is[0]],is.slice(1), value);
}


const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = React.useMemo(() => {
    
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        
        if (index(a, sortConfig.key) < index(b, sortConfig.key)) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (index(a,sortConfig.key) > index(b,sortConfig.key)) { 
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};




const ViewAllTeams = () =>  
{


    const history = useHistory();
    
    
    const [token, setToken] = useState("");
    const [loginStatus,setLoginStatus] = useState(0);
    const [TeamsData,setTeamsData] = useState([]);
    
  const [sideDrawerOpen,setSideDrawer] = useState(false);

  const [torender , settoRender] = useState(false);
    


    useEffect(() =>
    {
        const token2 = getFromStorage("the_main_app");
        if(token2)
        {
            // verify token
            axios.get(`http://localhost:5000/admin/verify?token=${token2.token}`)
            // .then(res =>res.json())
                .then(json =>
                    {
                        if(json.status == 200)
                        {
                            console.log("Token verification successful");
                            setToken(token2.token);
                        }
                        else
                        {
                            console.log("Token verification failed");
                            setLoginStatus(1);
                            
                        }
                    })
            
        }
        else
        {
            // no token
            setLoginStatus(2);
        }

// Getting teams
    axios.get('http://localhost:5000/team')
            //   .then(res =>res.data.JSON())
                .then(json =>
                    {   
                        if(json.status == 200)
                        {
                            let fetched_data = json.data;
                            setTeamsData(fetched_data);
                            

                            
                            
                        }
                    })
              .catch(function (error) {
                alert("Failed to get Teams Data, going to main menu");
                history.push("/mainmenu");
              });

              setTimeout(() => {
                settoRender(true);
                 
             }, 2500);
          


    },[]);


// THis fn.. returns the table where allrounder data is shown
const AllroundersTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  
  return (
    <table class="table table-striped">
      <thead className="thead-dark table-header"  style={{textAlign:"center"}}>
        <tr>
        <th>
            <button
              type="button"
              style={{outline:'none'}}
            >
              #
            </button>
          </th>
          <th>
            <button
              type="button"
              style={{outline:'none'}}
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              style={{outline:'none'}}
              onClick={() => requestSort('matches')}
              className={getClassNamesFor('matches')}
            >
              Matches
            </button>
          </th>
          <th>
            <button
              type="button"
              style={{outline:'none'}}
              onClick={() => requestSort('won')}
              className={getClassNamesFor('won')}
            >
              Won
            </button>
          </th>
        </tr>
      </thead>
      <tbody style={{textAlign:"center"}}>
        {items.map((item,index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td style ={{"cursor" : "pointer"}} onClick={() =>{history.push(`/TeamDetail/${item.name}`)}}><strong>{item.name}</strong></td>
            <td>{item.matches}</td>
            <td>{item.won}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const drawerToggleClickHandler = () =>
    {
        setSideDrawer((prev) =>
        {
            return !prev;
        })
    };

    const backdropClickHandler =() =>
    {
        setSideDrawer(false);
    };



    
    let backdrop_var;

    if(sideDrawerOpen)
    {
        
        backdrop_var = <Backdrop click={backdropClickHandler}/>;
    }



    
// rendering add team page according to login status

if(loginStatus === 1)
{
    // Token not verified

return(

    <div className="ui grid middle aligned segment red inverted" style={{height: "100%", margin: "0"}}>
  <div className="ui column center aligned">
    <div className="ui inverted statistic">
      <div className="value">401</div>
      <div className="label">UnAuthorized Access</div>
    </div>

    <div className="ui message red inverted">
      <div class="header">Description : </div>
      <p>You can't add a team without being logged in, Please Log in</p>
    </div>
    <button className="fluid ui button"><a href='/login'>Log in</a></button>
    
  </div>
</div>
    
);
    
}
else if(loginStatus === 2)
{
    // Not logged in, directly accessing
    return(

        <div className="ui grid middle aligned segment red inverted" style={{height: "100%", margin: "0"}}>
      <div className="ui column center aligned">
        <div className="ui inverted statistic">
          <div className="value">401</div>
          <div className="label">UnAuthorized Access</div>
        </div>
    
        <div className="ui message red inverted">
          <div class="header">Description : </div>
          <p>This Page Cannot be accessed without being Logged in</p>
        </div>
        <button className="fluid ui button"><a href='/login'>Log in</a></button>
        
      </div>
    </div>
        
    );
}


if(torender)
{
  return (
    <div style={{height:"100%"}}>
    <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
    <SideDrawer show={sideDrawerOpen}/>
    {backdrop_var}

    <br/>
    <br/>
    <br/>
    <br/>
    <div>
      <AllroundersTable
        products={TeamsData}
      />
    </div>
    </div>
  );
  
}
else
{
  return(
    <div className="ui segment">
  <div className="ui active inverted dimmer">
  <div className="ui large text loader">Getting All Teams</div>
  </div>
  <p></p>
  <p></p>   
  <p></p>
  </div>
  
  );  
}





    // return(<div>
    //     {TeamsData.map(team =>
    //     (
    //       <div style={{display : "flex" , justifyContent : "space-around" , flexDirection : "column", alignItems:'center'}}>
            
    //         <button style={{width: "100%"}} className="ui inverted primary button" onClick={() =>{history.push(`/TeamDetail/${team.name}`)}}><strong>{team.name}</strong></button>
    //         <br />
    //         </div>
    //     ))}
    // </div>);

}

export default ViewAllTeams; 
