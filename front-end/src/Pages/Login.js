import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../CSS/Login.css"
import LoginImg from "../logo.png"

function LoginPage() {
    var navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const [EmailError, setEmailError] = useState("");
    const [PasswordError, setPasswordError] = useState("");

    Axios.defaults.withCredentials = true;


    function Validations(){
        var counter = 0;

        if (Email.trim().length === 0 || Email.trim().match(/^\s+$/)) {
            setEmailError("Please enter a valid Email");
        } else {
            counter++;
            setEmailError("");
        }

        if (Password === "") {
            setPasswordError("Please enter a password")
        } else {
            counter++;
            setPasswordError("");
        }

        if(counter === 2){
            login();
        }
    }

    function Register(){
        navigate("/register");
    }

    const login = () => {

        console.log(Email + "  " + Password)
        Axios.post("http://localhost:3001/api/login", {
            Email: Email,
            Password: Password
            }).then((response) => {
                if (response.data)
                {
                    navigate("/dashboard")
                }else{
                    setPasswordError("Invalid email or password")
                }
            })
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/api/login_status").then((response) => {
            if (response.data === true) navigate("/dashboard");
        })
      }, [])


return (
    <div className="Login">

        <div className='LoginContainer'>

            <div className='rightSideLogin'>

                <div className='Login-form'>

                    <img className='imgContent' src={LoginImg} alt="Login-img" />
                    <h1 className='loginTitle'>Login</h1>
                    <div className='Login-box'>
                        <input type="text" required name='Email' onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                        <span>Email </span>
                        {EmailError && <p className="error">{EmailError}</p>}

                    </div>

                    <div className='Login-box'>
                        <input type="password" required name='password' onChange={(e) => {
                        setPassword(e.target.value)
                        }}/>
                        <span>Password </span>
                        {PasswordError && <p className="error">{PasswordError}</p>}
                    </div>
                        
                    <button className='Login-button' onClick={Validations} type="button" >Login</button>
                    <button className='Login-button1' onClick={Register} type="button" >Register</button>
                </div>

            </div>

        </div>

    </div>
  );
}

export default LoginPage;