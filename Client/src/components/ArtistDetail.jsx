import React, { useState, useEffect } from 'react';
import Row from './Row';
import Color from "color-thief-react";
import axios from 'axios';
import { data as songData } from './Songs';
import { Link } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Details(props) {
    const [loading, setLoad]  = useState(true);
    const info = props.location.state;
    const [songs, setsong] = useState([{
        artists: "",
        name: "",
    }]);
    useEffect(async () => {
        axios({
            method: "POST",
            data: {
                artist: info.artist,
            },
            withCredentials: true,
            url: "http://localhost:8000/api/artist",
        }).then((res) => {
            console.log(res.data);
            setLoad(false);
            setsong(res.data.songs);
        });
    }, []);
    const Loading = () => <div>Loading...</div>;
    return <div style={{
        overflowY: "scroll",
        overflowX: "hidden",
        width: "100%",
        fontSize: "3rem",
        background: "#1E1E1E",
    }}>
        {loading ? <Loader
            type="Bars"
            color="#fff"
            height={75}
            width={75}
            timeout={10000} //3 secs
            style={{
                marginLeft:"40%",
                marginTop:"20%",
            }}
        /> :
            <Color src={`./Songs/${info.image}`} format="hex">
                {({ data, loading }) => {
                    if (loading) return <Loader
                        type="Bars"
                        color="#ffffff"
                        height={100}
                        width={100}
                        timeout={5000000000} //5 secs

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
                                    backgroundImage: `url("./Songs/${info.image}")`,
                                }}>
                                </div>
                                <div className="detail_1">
                                    <h1 style={{
                                        color: "#ffffff",
                                        fontSize: "60%",
                                        fontWeight: "500"
                                    }}>{info.artist}</h1>
                                    <p style={{
                                        fontSize: "30%",
                                        color: "#ffffff"
                                    }}>{ }</p>
                                </div>
                            </div>
                            <div className="list">
                                <h3 style={{
                                    color: "#aca4a4",
                                    paddingLeft: "20px"
                                }}>Playlist</h3>

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
                                        songs.map((val, index) => {

                                            return (
                                                <Link
                                                    to={{
                                                        pathname: "/ArtistDetail",
                                                        state: {
                                                            artist: val.artists,
                                                            name: val.name,
                                                            image: songData[val.name],
                                                        }
                                                    }} style={{
                                                        textDecoration: "none",
                                                    }}>
                                                    <Row id={index} name={val.name} artist={val.artists.replace("[", '').replace("]", '').replaceAll("'", '')} />
                                                </Link>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    );
                }}
            </Color>}
    </div>
}

export default Details;