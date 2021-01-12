import React,{ useState, useEffect }  from 'react';
import "./styles/styles2.css";
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Chat from "./Chat"
import axios from "axios";

import { useHistory } from "react-router-dom";
import { getFromStorage , setInStorage } from "../utils/storage"; 

import Toolbar from "../Toolbar/Toolbar.component";
import SideDrawer from "../SideDrawer/SideDrawer.component";


// This is a black screen that is to cover the current screen whenever we open navbar and it is to appear behind navbar
import Backdrop from "../Backdrop/Backdrop.component";

import ComplaintInput from "./ComplaintInput.component";



import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
const AllComplaint = () => {
    const [sideDrawerOpen,setSideDrawer] = useState(false);
    const history = useHistory();

    const [selectComplaint, setselectComplaint ] = useState(false);
    const [complaintsList, setcomplaintsList] = useState([]);
    const [complaintsLoaded, setcomplaintsLoaded] = useState(false);

    const [selectComplaintTitle, setselectComplaintTitle] = useState("");
    const [ComplaintInitiatorEmail, setComplaintInitiatorEmail] = useState("");

    const [selectedComplaint,setselectedComplaint] = useState({});

    const [EnteredComplaint,setEnteredComplaint] = useState("");

    const [SenderEmail, setSenderEmail ] = useState("");

    const [SearchTerm,setSearchTerm] = useState("");
    useEffect(() => 
    {
        axios.get("http://localhost:5000/complaints/allComplaints")
        .then((json) => 
        {
            if(json.status === 200)
            {
                setcomplaintsList(json.data);
                console.log("Complaints retrieved");
                setcomplaintsLoaded(true);
            }

        })
        .catch(err =>
            {
                console.log(`Error occured getting complaints : ${err}`);
                alert("Error getting complaints, going to home page");
                history.push("/mainmenu");
            })

    },[])
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

const changeEnteredComplaint = (value) =>
{
    setEnteredComplaint(value);
}

const sendComplaintMessage = (value) =>
{
    changeEnteredComplaint(value);
    const token2 = getFromStorage("the_main_app");
    if(token2)
    {
        const admin_session = {
            AdminSessionToken : token2.token
        }
        axios.post("http://localhost:5000/admin/getAdminFromSession",admin_session)
        .then(json =>
            {
                if(json.status === 200)
                {
                    const admin_id = {
                        AdminIDToken : json.data
                    }
                    axios.post("http://localhost:5000/admin/getAdminEmailFromId",admin_id)
                    .then(json =>
                        {
                            if(json.status === 200) 
                            {
                                setSenderEmail(json.data);
                            }
                        })
                        .catch(err =>
                            {
                                console.log(`Error getting Admin email : ${err}`);
                                alert("Error while getting Admin details, going to home page");
                                history.push("/mainmenu");
                            })
                }
            })
            .catch(err =>
                {
                    console.log(`Error getting Admin Session details : ${err}`);
                                alert("Error while getting Admin session, going to home page");
                                history.push("/mainmenu");
                })

        if((SenderEmail !== "") && (EnteredComplaint === ""))
        {
            alert("Empty Complaints can't be sent !!");
        }
        else if(EnteredComplaint === "")
        {
            console.log();
        }
        else if((SenderEmail !== "") && (EnteredComplaint !== ""))
        {
            const request_body = {
                MessageBody : EnteredComplaint.trim(),
                SenderEmail: SenderEmail,
                InitiatorEmail: ComplaintInitiatorEmail
            }
            axios.post("http://localhost:5000/complaints/addMessage",request_body)
            .then(json =>
                {
                    if(json.status === 200)
                    {
                        alert("Successfully added message to complaint. Going to complaints Main page");
                        history.push("/mainmenu");
                    }
                })
                .catch(err =>
                    {
                        console.log(`Error adding message : ${err}`);
                        alert("Error adding message to complaint, going to Main Menu");
                        history.push("/mainmenu");
                    })
    

        }
        
    }

    else
    {
        alert("Admin not logged in, going to Main Menu");
        history.push("/mainmenu");
    }
}

    
    let backdrop_var;

    if(sideDrawerOpen)
    {
        
        backdrop_var = <Backdrop click={backdropClickHandler}/>;
    }

const changeSearchTerm = (e) =>
{
    setSearchTerm(e.target.value.trim());
}

const DeleteComplaint = () =>
{
    if(ComplaintInitiatorEmail !== "")
    {
        const UserEmail = {
            InitiatorEmail : ComplaintInitiatorEmail
        }

        axios.post("http://localhost:5000/complaints/DeleteComplaint",UserEmail)
        .then(json =>
            {
                if(json.status === 200)
                {
                    alert("Complaint Deleted Successfully !! ");
                    history.push("/mainmenu");           
                }
            })
        .catch(err =>
            {
                console.log(`Error in deleting Complaint : ${err}`);
                
                alert("FAILED to delete complaint, please try again Later ");
                history.push("/mainmenu");           
                
            })
    }
    else
    {
        alert("Please select a Complaint First");
    }
}



if(complaintsLoaded && SearchTerm !== "")
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
        
        
        <div id="chat-container">
            <div id="search-container" >
                <input type='text' placeholder="Search" onChange ={changeSearchTerm} />

            </div>
            
            <div id="conversation-list">

            {complaintsList.filter(name => name.Initiator.email.includes(SearchTerm.toLowerCase().trim())).map((item, index) =>
            {
                
                    return(
                        <div
                        key={index}
                        onClick={() =>
                        {
                        setselectedComplaint(item);
                        setselectComplaintTitle(item.Title);
                        setComplaintInitiatorEmail(item.Initiator.email);
                        
                        setselectComplaint((prev) =>
        {
            return !prev;
        })
                        }}
                  >
      <div class="conversation active">
              <AccountCircleIcon id="img"/>
              <div class="title-text" >
                  {item.Initiator.name} 
              </div>
              <div class="created-date">
                  Apr1
              </div>
              <div class="conversation-message">
              {item.Title} 

              </div>
          </div>

   </div>
                    );
                
                
            } 
            )

            
     }    
                
                
            </div>
            
            <div id="chat-title">
            
{
        
        (selectComplaint) ? (
            <div>
            <span>{selectComplaintTitle}</span>
            <span onClick={DeleteComplaint} style={{"float" : "right"}}><DeleteRoundedIcon style={{"color" : "red"}}/></span> 
            </div>) : (<span> </span>)
    }
                
            </div>

 

{
        
        (selectComplaint) ? (<div>
            <Chat Main={selectedComplaint}/>

            <div>
            <ComplaintInput Parent ={sendComplaintMessage}/>
            </div>

        </div>) : (<div style={{fontWeight:'bold', fontSize:18}}>Select a Complaint to show here.</div>)
    }
        </div>
</div>

        
     );
}
else if(complaintsLoaded)
{
    // console.log(JSON.stringify(complaintsList))
    
    return ( 

        <div style={{height:"100%"}}>
        <Toolbar drawerClickHandler={drawerToggleClickHandler}/>
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop_var}
        
        <br/>
        <br/>
        <br/>
        <br/>
        

        <div id="chat-container">
            <div id="search-container" >
                <input type='text' placeholder="Search" onChange ={changeSearchTerm} />

            </div>
            
            <div id="conversation-list">

            {complaintsList.map((item, index) =>
            {
                {/* var temp = item.MessagesList[0].Time.split("T");
                console.log(((temp[1])));
                 */}
                    return(
                        <div
                        key={index}
                        onClick={() =>
                        {
                        setselectedComplaint(item);
                        setselectComplaintTitle(item.Title);
                        setComplaintInitiatorEmail(item.Initiator.email);
                        
                        setselectComplaint((prev) =>
        {
            return !prev;
        })
                        }}
                  >
      <div class="conversation active">
              <AccountCircleIcon id="img"/>
              <div class="title-text" >
                  {item.Initiator.name} 
              </div>
              <div class="created-date">
                  Apr1
              </div>
              <div class="conversation-message">
              {item.Title} 

              </div>
          </div>

   </div>
                    );
                
                
            } 
            )

            
     }    
                
                
            </div>
            
            <div id="chat-title">
            
{
        
        (selectComplaint) ? (
            <div>
            <span>{selectComplaintTitle}</span>
            <span onClick={DeleteComplaint} style={{"float" : "right"}}><DeleteRoundedIcon style={{"color" : "red"}}/></span> 
            </div>) : (<span> </span>)
    }
                
            </div>

 

{
        
        (selectComplaint) ? (<div>
            <Chat Main={selectedComplaint}/>

            <div>
            <ComplaintInput Parent ={sendComplaintMessage}/>
            </div>

        </div>) : (<div style={{fontWeight:'bold', fontSize:18}}>Select a Complaint to show here</div>)
    }
        </div>
        </div>
        
     );

}
    
return(
        
    <div className="ui segment">
<div className="ui active inverted dimmer">
<div className="ui large text loader">Loading All Complaints</div>
</div>
<p></p>
<p></p>   
<p></p>
</div>
);

}
 
export default AllComplaint;
