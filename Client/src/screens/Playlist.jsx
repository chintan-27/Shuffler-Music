import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { data } from '../components/Songs';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Color from "color-thief-react";
import Row from '../components/Row';
import Loader from "react-loader-spinner";


function Playlist(props) {

    const info = props.location.state;
    const [list, setList] = useState([{
        user_id: "",
        name: "",
        artist: "",
    }]);
    useEffect(async () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8000/api/playlist",
        }).then((res) => {
            setList(res.data);
            console.log(res);
        });
    }, []);
    const pic = info.name === " " ?  list[0].name : info.name;
    const image = data[pic] + ".jpg";
    return <div style={{
        overflowY: "scroll",
        overflowX: "hidden",
        width: "100%",
        fontSize: "3rem",
        background: "#1E1E1E",
    }}>
        <Color src={`./Songs/${image}`} format="hex">
            {({ data, loading }) => {
                if (loading) return <Loader
                    type="Bars"
                    color="#ffffff"
                    height={75}
                    width={75}
                    timeout={300000000000000} //3 secs
                    style={{
                        marginLeft: "40%",
                        marginTop: "20%",
                    }}
                />;
                return (
                    <div style={{
                        paddingBottom: "50px",
                        fontSize: "3rem",
                        height: "auto",
                        backgroundImage: `linear-gradient(to bottom right, ${data}, #000000)`,

                    }}>
                        <div style={{
                            display: "flex",
                            width: "100%",
                            padding: "20px",
                        }}>
                            <div className="detail" style={{
                                backgroundImage: `url("./Songs/${image}")`,
                            }}>
                            </div>
                            <div className="detail_1">
                                <h1 style={{
                                    color: "#ffffff",
                                    fontSize: "60%",
                                    fontWeight: "500"
                                }}>{pic}</h1>
                                <p style={{
                                    fontSize: "30%",
                                    color: "#ffffff"
                                }}>{info.artist}</p>
                            </div>
                        </div>
                        <div className="list">
                            <h3 style={{
                                color: "#aca4a4",
                                paddingLeft: "20px"
                            }}>My Playlist</h3>

                            <div className="flex-container" style={{
                                width: "95%",
                                padding: "20px",
                                paddingBottom: "0px"
                            }}>
                                <div className="flex-container">
                                    <p style={{
                                        color: "#aca4a4",
                                        fontSize: "40%",
                                    }}>#</p>
                                    <p style={{
                                        marginLeft: "20px",
                                        color: "#aca4a4",
                                        fontSize: "40%",
                                    }}>Title</p>
                                </div>
                                <div style={{
                                    width: "40%",
                                    display: "flex",
                                    alignSelf: "flex-end"
                                }}>
                                    <p style={{
                                        color: "#aca4a4",
                                        fontSize: "40%",
                                        display: "flex",
                                        alignSelf: "flex-start"
                                    }}>Artist</p>
                                </div>
                            </div>
                            <div style={{
                                height: "0.1px",
                                backgroundColor: "#ffffff"
                            }}></div>
                            <div>

                                {
                                    list.map((val, index) => {

                                        return (
                                            <Link
                                                to={{
                                                    pathname: "/playlist",
                                                    state: {
                                                        artist: val.artist,
                                                        name: val.name,
                                                    }
                                                }} style={{
                                                    textDecoration: "none",
                                                }}>
                                                <Row id={index} name={val.name} 
                                                artist={val.artist.replace("[", '').replace("]", '').replaceAll("'", '')}
                                                add = {true} 
                                                />
                                            </Link>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                );
            }}
        </Color>
    </div>
}

export default Playlist;