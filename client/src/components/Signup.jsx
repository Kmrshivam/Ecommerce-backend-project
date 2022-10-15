import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const [name, setName] = useState("");
    const [last_name, setLast_Name] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
    }, [])

    const collectData = async () => {
        console.warn(name, last_name, email);
        let result = await fetch("http://localhost:5000/register", {
            method: 'post',
            body: JSON.stringify({name, last_name, email}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify)
        navigate('/');
    }
  return (
    <div className="register">
      <h1>Register</h1>
      <input className="inputBox" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="inputBox" type="text" placeholder="Enter LastName" value={last_name} onChange={(e) => setLast_Name(e.target.value)} />
      <input className="inputBox" type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={collectData} className="appButton" type="button">Signup</button>
    </div>
  )
}

export default Signup
