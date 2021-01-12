import React,{useState,useEffect} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import axios from "axios";
const EmailVerify  = ()=>{
    const history = useHistory()
    const [password,setPasword] = useState("")
    const {token} = useParams()
    const body = {
        token : token
    }
    axios.post("http://localhost:5000/account/verifyEmailFinal",body)
    .then(user =>
        {
            if(user.status === 200)
            {
                alert("Email verified successfully, you can now login via your Mobile device");
            }
            else
            {
                alert("Failed to verify email, please try again");
            }
        })
        .catch(err =>
            {
                alert("System error while verifying email, please try again");
            })
    return(
    <div className="ui segment">
  <div className="ui active inverted dimmer">
    <div className="ui large text loader">Verifying Email</div>
  </div>
  <p></p>
  <p></p>   
  <p></p>
</div>
    );
    }
   



export default EmailVerify;
