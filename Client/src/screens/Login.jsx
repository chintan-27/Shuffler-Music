
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useSongStore } from '../components/Store';
import Cookies from 'js-cookie'



function Login({ login }) {
    const history = useHistory();
    const s = useSongStore(state => state.setLogin);
    const [input, setInput] = useState({
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

    function handleSubmit(event) {
        event.preventDefault();
        axios({
            method: "POST",
            data: {
                email: input.email,
                password: input.password
            },
            withCredentials: true,
            url: "http://localhost:8000/auth/login",
        }).then((res) => {
            if (res.data.message) {
                s("true");
                // Cookies.set('login', true)

                history.push("/");
            }

        });
    }

    return <div className="login">
        <div className="container form ">
            <form className="form-group" onSubmit={handleSubmit}>
                <h1>Sign in to your account</h1>
                <hr></hr>
                <div className="line">
                    <input type="text" placeholder="Email" name="email" onChange={handleChange}></input>
                    <span className="line1"></span>
                </div>
                <div className="line">
                    <input type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                    <span className="line2"></span>
                </div>
                <button type="submit">Login</button>
                <p>Not a member? <Link to="/register"><a href="#">Sign up</a></Link></p>
            </form>
        </div>
    </div>

}

export default Login