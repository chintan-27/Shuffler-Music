import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSongStore } from './Store';
import axios from 'axios';

function LoginButton() {
    const history = useHistory();
    const s = useSongStore(state => state.setLogin);
    const login = useSongStore(state => state.login);
    function log(){
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8000/auth/logout",
        }).then((res) => {
            if(res.data.message){
                s("false");
                history.push("/login");
            }
            
        });
    }
    return <div>
        <div style={{
            height: "auto",
            width: "100vw",
            position: "fixed",
            top: 0,
            zIndex: 10,
        }}>
            <ul style={{
                display: "flex",
                position: "fixed",
                top: 10,
                left: "80%",
                zIndex: 1,
            }}>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                    <li className="signup" style={
                        {
                            display: login === "false" ? "flex" : "none",
                            listStyle: "none",
                            fontSize: "100%",
                            color: '#ffffff',
                            padding: "5px 20px",
                            border: "1px solid #ffffff",
                            marginRight: "25px",
                            borderRadius: "20px",
                        }
                    }>
                        Sign Up
                    </li>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <li onClick={log} style={
                        {
                            listStyle: "none",
                            fontSize: "100%",
                            color: '#000000',
                            padding: "5px 20px",
                            borderRadius: "20px",
                            border: "1px solid #ffffff",
                            background: "#ffffff",
                            marginLeft : login === "true" ? "100px" : 0,
                        }
                    }>
                        {
                            login ==="true" ? "Log Out" : "Login"
                        }
                    </li>
                </Link>
            </ul>
        </div>
    </div>
}

export default LoginButton;