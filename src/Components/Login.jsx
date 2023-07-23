import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/User.context';

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" })
  const router = useNavigate();

  const { state, login, logout } = useContext(AuthContext);
  console.log(state, "- state in login")
  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.email && userData.password) {
      const response = await axios.post("http://localhost:8000/login", {
        email: userData.email,
        password: userData.password
      })
      console.log(response.data, "response")
      if (response.data.status == 200) {
        console.log(response.data.data);

        login({ token: response.data.data, payload: response.data.user })
        alert(response.data.message)
        router('/');
        setUserData({ email: "", password: "" })
      } else {
        alert("Error please try again..")
      }
    } else {
      alert("Please fill the all fields..")
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
        <label>Email</label><br />
        <input value={userData.email} onChange={handleChange} type='email' name="email" /><br />
        <label>Password</label><br />
        <input value={userData.password} onChange={handleChange} type='password' name="password" /><br />
        <input type='submit' value="Login" /><br />
      </form>
      <button onClick={() => router('/register')} >Register</button>
    </div>
  )
}

export default Login