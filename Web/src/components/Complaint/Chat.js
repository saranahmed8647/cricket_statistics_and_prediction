import React,{useState,useEffect} from 'react';
import "./styles/styles2.css";


function gotoBottom(id){
    var element = document.getElementById(id);
    if (element === null) {
        console.log("no last message");
    } else {
        element.scrollIntoView();
    }
 }

const Chat = (props) => {
    const [InitiatorName, setInitiatorName] = useState("");
    const [InitiatorEmail, setInitiatorEmail] = useState("");
    const [complaintTitle , setcomplaintTitle] = useState("");
    const [MessageList, setMessageList] = useState([]);


    useEffect(() => 
    {
        setInitiatorEmail(props.Main.Initiator.email);
        setInitiatorName(props.Main.Initiator.name);
        setcomplaintTitle(props.Main.Title);
        setMessageList(props.Main.MessagesList);
    },[])

    useEffect(() => {
        // Update the document title using the browser API
        gotoBottom("last-message");
      });
    
    return ( 
            <div id="chat-message-list" style={{overflowY:"scroll",maxHeight:"70vh", minHeight:"70vh"}}>
                {
                    MessageList.slice(0).reverse().map((item, index) =>
                    {
                        if(item.Sender === InitiatorEmail)
                        {
                            return(
                                <div class="message-row other-message" id={index === 0 ? "last-message": ""}>
                    <div class="message-content">
                        {item.Sender}
                        <div class="message-text">{item.body}</div>
                        <div class="message-date">{item.Time.split("T")[0]}</div>
                    </div>

                </div>
                            );
                        }
                        else
                        {
                            return(
                                <div class="message-row you-message" id={index === 0 ? "last-message": ""}>
                    <div class="message-content">
                    {item.Sender}
                        <div class="message-text">{item.body}</div>
                        <div class="message-date">{item.Time.split("T")[0]}</div>
                    </div>

                </div>
                            );
                            
                      


                        }
                         

                        
                

                

                    })
                }
                
                

            </div>
     );
}
 
export default Chat;