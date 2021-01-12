import React,{useState} from 'react'
import {useHistory,useParams} from 'react-router-dom'

const NewPasswordUser  = ()=>{
    const history = useHistory()
    const [password,setPasword] = useState("")
    const {token} = useParams()
    console.log(token)
    const PostData = ()=>{
        fetch("http://localhost:5000/account/new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              alert(data.error)
           }
           else{

               alert("Account Password has been changed, Go Back to Mobile Application to login with New Password");
               
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (

    <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'center',marginTop:'10%'}}>
        <p style={{color:'#b3003b',fontSize:30}}>Crictelligence</p>
        <div class="card" style={{display:'flex',flex:1,flexDirection:'column',alignItems:'center',width:'40%'}}>
        <input
        type="password"
        placeholder="Enter new password..."
        style={{width:'70%',fontSize:15,marginTop:20}}
        class="form-control"
        value={password}
        onChange={(e)=>setPasword(e.target.value)}
        />

        <button
            style={{marginBottom:50,marginTop:20,width:200,fontSize:18}}
            class="btn btn-primary btn-lg"
            onClick={()=>PostData()}
        >
            Update Password
        </button>

        </div>
    </div>
   )
}


export default NewPasswordUser;
