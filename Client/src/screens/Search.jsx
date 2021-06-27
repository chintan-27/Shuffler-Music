import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';


function Search() {

    const [input, setInput] = useState("");
    function handleChange(event) {
        setInput(event.target.value);
    }
    function handleClick(event) {
        event.preventDefault();
        axios({
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                query: input,
            },
            withCredentials: true,
            url: "http://localhost:8000/api/search",
        }).then((res) => {
            if (res.data) {
                // console.log(res.data);
                const obj = JSON.parse(res.data);
                console.log(obj);
            }
        });
    }

    return <div className="home" style={{
        display: "flex",
        justifyContent: "center",
    }}>

        <div style={{
            marginTop: "5%",
            display: "flex",
            borderRadius: "50px",
            justifyContent: "center",
            background: "#fff",
            height: "10%",
            width: "50%",
        }}>
            <input className="input" type="search" placeholder="Artists or songs" onChange={handleChange} required />
            <button onClick={handleClick}><SearchIcon style={{
                fontSize: "150%",
                paddingBottom: "25%",
            }} /></button>
        </div>
        <div>
        </div>
    </div>
}

export default Search;