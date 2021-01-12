import React,{useState,useContext,} from 'react'
import {useHistory} from 'react-router-dom'

const Reset  = ()=>{
    const history = useHistory()
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(email === ""){
            alert("Please fill all fields")
            return 
        }
        else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            alert("invalid email")
            return
        }
        fetch('http://localhost:5000/admin/forgetPassword',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
                console.log(data.error)
                alert(data.error)
           }
           else{
                console.log(data.message)
                alert(data.message)
                history.push('/login')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (
      <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'center',marginTop:'10%'}}>
         
        <p style={{color:'#b3003b',fontSize:30}}>Forget Password!!!</p>
        <div class="card" style={{display:'flex',flex:1,flexDirection:'column',alignItems:'center',width:'40%'}}>
            <input
                type="text"
                class="form-control"
                placeholder="Enter email..."
                style={{width:'70%',fontSize:15,marginTop:20}}
                value={email}
                onChange={(e)=>setEmail(e.target.value.trim())}
            />

            <button
                style={{marginBottom:50,marginTop:20,width:200,fontSize:18}}
                class="btn btn-primary btn-lg"
                onClick={()=>PostData()}
            >
                Reset Password
            </button>
    
        </div>
      </div>
   )
}


export default Reset