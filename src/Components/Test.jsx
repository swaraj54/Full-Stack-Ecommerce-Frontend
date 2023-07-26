import axios from 'axios';
import React, { useState } from 'react'

const Test = () => {

    // useState, useEffect - hooks
    // Syntax of useState

    const [userData, setUserData] = useState({ name: "", email: "", password: "" });

    console.log(userData, "- userData")

    function handleChange(event) {
        // console.log(event.target.value)
        // console.log(event.target.name)
        setUserData({ ...userData, [event.target.name]: event.target.value })

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.name && userData.email && userData.password) {
            const response = await axios.post("http://localhost:8000/form", { userData })
            if (response.data.status == 'Success') {
                alert("Data Submitted!")
            }
        } else {
            alert("Please fill the all fields.>")
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name : </label><br />
                <input type='text' onChange={handleChange} name='name' /><br />
                <label>Email :</label><br />
                <input type='email' onChange={handleChange} name='email' /><br />
                <label>Password :</label><br />
                <input type='password' onChange={handleChange} name='password' /><br />
                <input type='submit' value='Submit data' /><br />
            </form>
        </div>
    )
}

export default Test