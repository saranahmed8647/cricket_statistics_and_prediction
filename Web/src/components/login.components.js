
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { getFromStorage , setInStorage } from "./utils/storage"; 
import { useHistory } from "react-router-dom";
import "./login.component.css";


const Login = () =>  
{


    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [LoginError, setLoginError] = useState([]);
    const [token, setToken] = useState("");
    
    
    const [LoginEmail, setLoginEmail] = useState("");
    const [LoginPassword, setLoginPassword] = useState("");
    

    useEffect(() =>
{
    const obj = getFromStorage("the_main_app");
    const token =  obj;
});


    const LoginHandler = (e) => 
    {
        e.preventDefault();
        setLoading(true);
        if (LoginEmail.trim() ==="" 
        || LoginPassword.trim() ==="") 
        {
            setLoginError([...LoginError,"All fields must be filled"]);
        } else if (LoginPassword < 8) {
            setLoginError([...LoginError,"Password entered was too short, minimum length can be 8 characters"]);
        } else {
            const admin = 
            {
                email : LoginEmail.trim(),
                password : LoginPassword.trim()
                
            }
            axios.post('http://localhost:5000/admin/login', admin)
            //   .then(res =>res.data.JSON())
                .then(json =>
                    {   
                        if(json.status === 200)
                        {
                            setLoading(false);
                            setLoginPassword("");
                            setLoginEmail("");
                            setToken(json.data.token);

                            setInStorage("the_main_app",{token : json.data.token});
                            setInStorage("the_main_app_loading",{loading_variable : isLoading});
                            // setInStorage("the_main_app_login_attempt",{attempt : true});
                            console.log("Success login");
                            history.push("/mainmenu")
                        }
                    })
              .catch(function (error) {
                console.log(error);
                alert(`Error occured : ${error}`);
              });

            }

         
    };



    const changeEmail = (e) => {
        var email = e.target.value;
        setLoginEmail(email);
    };



    const changePassword1 = (e) => {
        var pass1 = e.target.value;
        setLoginPassword(pass1);
    };




    return (
        
//         <div>
//         <form action="post" onSubmit={LoginHandler}>
//         <input type="email" name="email" value={LoginEmail}
//                                                    aria-label="email"
//                                                    title="Enter your valid Email"
//                                                    placeholder = "Enter your valid Email"
//                                                    onChange={changeEmail}
//                                                     required={true}/>
//                                                     <br />
//         <input type="password" name="password" value={LoginPassword}
//                                                    onChange={changePassword1}
//                                                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
//                                                    title="Password must contain UpperCase, LowerCase, Number/SpecialChar and min 8 Chars"
//                                                    placeholder = "Enter your valid Password"
//                                                    aria-label="password"
//                                                    required={true}/>
// <button
//             type='submit'
//             className='btn btn-lg  form-control'
//             style={{background: '#A9A9A9', color: 'white', height: 35}}
//         >
//             Login
//         </button>

//         </form>
//         {/* Showing signup error */}
//         {
//             (LoginError.length > 0) ? (<p>{LoginError}</p>) : (null)
//         }
             
//         </div>

<div class="ui middle aligned center aligned grid" style={{marginTop:'5%'}}>
  <div class="column">
    <h2 class="ui image header">
      <div class="content" style={{color:'#b3003b', fontSize:'2.5rem',marginBottom:10}}>
        Welcome to Admin!!!
      </div>
    </h2>
    <form action="post" onSubmit={LoginHandler} class="ui large form">
      <div class="ui stacked secondary  segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
                     <input type="email" name="email" value={LoginEmail}
                                                    aria-label="email"
                                                    title="Enter your valid Email"
                                                    placeholder = "Enter your valid Email"
                                                    onChange={changeEmail}
                                                     required={true}/>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" value={LoginPassword}
                                                    onChange={changePassword1}
                                                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*"
                                                    title="Password must contain UpperCase, LowerCase, Number/SpecialChar and min 8 Chars"
                                                    placeholder = "Enter your valid Password"
                                                    aria-label="password"
                                                    required={true}/>

          </div>
        </div>


         <button
             type='submit'
             className='btn btn-primary btn-lg  form-control'
          >
            Login
          </button>


      </div>

     

    </form>

    <button
             style={{fontSize:15,fontWeight:'bold'}}
             type='submit'
             className='btn btn-lg  form-control'
             onClick={() => history.push('/reset') }
          >forgot password?
    </button>

    <div class="ui error message">
      {

        (LoginError.length > 0) ? (<p>{LoginError.map((item, index) => (
        <p style={{fontSize:15}}>{item}</p>
        ))}</p>) : (null)
      }
    </div>
    

    <div class="ui message" style={{fontSize:15}}>
      Please login to your account
    </div>
  </div>
</div>

);
}

export default Login; 
