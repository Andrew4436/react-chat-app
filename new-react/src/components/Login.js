import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css"

function Login({ setUser }) {
    const usernameRef = useRef()
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        const newUser = { username: usernameRef.current.value } 
        setUser(newUser)
        sessionStorage.setItem('user', JSON.stringify(newUser))
        navigate('/')
    }

    return (
        <form id='form' onSubmit={handleSubmit}>
            <input placeholder='put in your username' ref={usernameRef} required />
            <button>Let's go Chat</button>
        </form>
    );
}

export default Login;