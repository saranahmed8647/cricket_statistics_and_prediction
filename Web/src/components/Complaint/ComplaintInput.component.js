import React,{ useState, useEffect }  from 'react';
import SendIcon from '@material-ui/icons/Send';
import "./styles/styles2.css";
const ComplaintInput = (props) => 
{   
    const [EnteredComplaint,setEnteredComplaint] = useState("");
    // sendComplaintMessage
    // 

    const changeEnteredComplaint = (e) =>
{
    setEnteredComplaint(e.target.value);
}

const sendResults = () =>
{
    props.Parent(EnteredComplaint);

}

    return(
        <div id="chat-form">
            <div onClick={sendResults}><SendIcon /></div>
            <input type="text" placeholder="type a message" onChange={changeEnteredComplaint} />
        </div>
    );

}

export default ComplaintInput;