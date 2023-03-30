import React, { useRef, useState } from 'react';
import { register, login } from '../utils/API'
import authService from '../utils/auth'
import '../styles/login.css'
function Login(){
    const [toggleRegister, setToggleRegister] = useState("login")
    const [userFormData, setUserFormData] = useState({ email: '', name: '', password: '' });
             if(authService.loggedIn()){
                 console.log('Redirecting..')
                 window.location.assign('/')
            }
            const handleInputChange = (event) => {
                const { name, value } = event.target;
                setUserFormData({ ...userFormData, [name]: value });
            };

         const handleSubmit = async (event) => {
                event.preventDefault()
        
            try {
                let response;
                if(toggleRegister === 'register'){
                    response = await register(userFormData);
                }
               response = await login(userFormData);
        
              if (!response.ok) {
                throw new Error('something went wrong!');
              }
        
              const { token, foundUser } = await response.json();
              authService.login(token);
            } catch (err) {
              console.error(err);
            }
            setUserFormData({
                name: '',
                email: '',
                password: '',
              });
          };
        

    return(
        <div className='login-container'>
            <form className='input-form'>
                <div className='user-registration-div'>
                    <button 
                        className={toggleRegister === "login" ? "active": null} 
                        value={"login"} 
                        onClick={(e) => {setToggleRegister(e.target.value); e.preventDefault()}}>SIGN IN</button>
                    <button
                        className={toggleRegister === "register" ? "active": null} value={"register"} 
                        onClick={(e) => {setToggleRegister(e.target.value);e.preventDefault()}}>SIGN UP</button>
                </div>
                <div className='input-div'>
                    {toggleRegister === "register"
                    ?<div className='input-parent-div'>
                        <label>NAME</label>
                        <input 
                        type="text" 
                        name='name'
                        onChange={handleInputChange}
                        value={userFormData.name}
                        />
                    </div>
                    :null
                }
                    <div className='input-parent-div'>
                        <label>EMAIL</label>
                        <input  
                        type="text" 
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}/>
                    </div>
                    <div className='input-parent-div'>
                        <label>PASSWORD</label>
                        <input 
                          type='password'
                          placeholder='Your password'
                          name='password'
                          onChange={handleInputChange}
                          value={userFormData.password}
                        />
                    </div>
                    {toggleRegister === "register"
                     ? <button 
                     className='submit-btn'
                     onClick={(e) => {handleSubmit(e)}}
                     disabled={!(userFormData.email && userFormData.password && userFormData.name)}
                     >Sign Up</button>
                     : <button 
                     className='submit-btn'
                     onClick={(e) => {handleSubmit(e)}}
                      disabled={!(userFormData.password && userFormData.email)}
                     >Sign In</button>
                      }
                   
                </div>
               
            </form>
        </div>
    )
}

export default Login;