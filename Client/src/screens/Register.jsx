import React, { useState } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

function Register() {
    const history = useHistory()
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""

    });
    function handleChange(event) {
        const { name, value } = event.target;
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        });
    }
    function handleClick(event) {
        event.preventDefault();

        const register = {
            username: input.name,
            email: input.email,
            password: input.password
        }
        axios.post('http://localhost:8000/auth/register', register).then(res => {
            if(res.data.message) history.push("/login");
        }).catch((err) => {
            console.log(err)
        });
    }
    return <div className="login">
            <div className="container form ">
                <form className="form-group" onSubmit={handleClick}>
                    <h1>Register Your Account</h1>
                    <hr></hr>
                    <div className="line">
                        <input type="text" placeholder="User Name" name="name" onChange={handleChange}></input>
                        <span className="line1"></span>
                    </div>
                    <div className="line">
                        <input type="email" placeholder="Email" name="email" onChange={handleChange}></input>
                        <span className="line2"></span>
                    </div>
                    <div className="line">
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                        <span className="line2"></span>
                    </div>
                    <button type="submit">Register</button>
                    <p>Already a member? <Link to="/login"> <a href="/login">Log In</a></Link> </p>
                </form>
            </div>
        </div>
}

export default Register;