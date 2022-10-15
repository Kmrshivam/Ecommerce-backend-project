import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate("/")
        }
    }, [])

    const handleLogin = async () => {
        let result = await fetch("http://localhost:5000/login", {
            method: 'post',
            body: JSON.stringify({name,email}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.name)
        {
            localStorage.setItem('user', JSON.stringify(result));
            navigate("/")
        }else {
            alert("Please enter correct details")
        }
    }
  return (
    <div className='login'>
      <h1>Login</h1>
      <input type="text" className='inputBox' placeholder='Enter name' onChange={(e)=>setName(e.target.value)} value={name}/>
      <input type="email" className='inputBox' placeholder='Enter email'onChange={(e)=>setEmail(e.target.value)} value={email}/>
      <button onClick={handleLogin} className='appButton' type='button'>Login</button>
    </div>
  )
}

export default Login
