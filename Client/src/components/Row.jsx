import React, { useEffect, useState } from 'react';
import { useSongStore } from './Store';
import { data as val } from './Songs';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import axios from 'axios';

function Row(props) {
    const naam = props.name;
    let artist = props.artist;
    if (artist.length > 15) {
        artist = artist.slice(0, 30) + "...";
    }
    const songName = useSongStore(state => state.song)
    const setSong = useSongStore(state => state.setName)
    const [like, setLike] = useState(props.like);
    const [add, setAdd] = useState(props.add);
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async function liked() {
        axios({
            method: "POST",
            data: {
                like: like,
                name: naam,
                artist: artist,
            },
            withCredentials: true,
            url: "http://localhost:8000/api/likedsongs",
        }).then((res) => {
            console.log(res);
        });
        setLike(like ? false : true);
        await sleep(500)
        setLike(false);

    }
    async function added() {
        axios({
            method: "POST",
            data: {
                add: add,
                name: naam,
                artist: artist,
            },
            withCredentials: true,
            url: "http://localhost:8000/api/playlist",
        }).then((res) => {
            console.log(res);
        });
        setAdd(add ? false : true);
        await sleep(1000)
        setAdd(false);

    }

    return <div className="row"
        onClick={() => { setSong(val[props.name] + '.mp3') }}
        style={{ paddingBottom: "10px" }}>

        <div style={{
            display: "flex",
            flexDirection: "row",
            width: "95%",
            height: "auto",
            marginTop: "10px",
            padding: "0px 30px"
        }}>
            <div className="flex-container">
                <p style={{
                    color: val[naam] + ".mp3" !== songName ? "#aca4a4" : "#fff",
                    fontSize: "40%",
                }}>{props.id + 1}</p>
                <p style={{
                    marginLeft: "20px",
                    color: val[naam] + ".mp3" !== songName ? "#aca4a4" : "#fff",
                    fontSize: "40%",
                }}>{naam}</p>
            </div>
            <div style={{
                width: "40%",
                display: "flex",
                flexDirection: "row",
            }}>
                <p style={{
                    color: val[naam] + ".mp3" !== songName ? "#aca4a4" : "#fff",
                    fontSize: "40%",
                    width: "90%",
                }}>{artist}</p>
                <p style={{
                    color: val[naam] + ".mp3" !== songName ? "#aca4a4" : "#fff",
                    fontSize: "40%",
                }} onClick={liked} >{
                        !like ?
                            <FavoriteBorderOutlinedIcon style={{
                            }} /> :
                            <FavoriteIcon style={{
                                color: "red",
                            }} />
                    }
                </p>
                <p style={{
                    color: val[naam] + ".mp3" !== songName ? "#aca4a4" : "#fff",
                    fontSize: "40%",
                    marginLeft: "10%"
                }} onClick={added} >{
                        !add ?
                            <PlaylistAddIcon style={{
                            }} /> :
                            <PlaylistAddCheckIcon style={{
                            }} />
                    }
                </p>
            </div>
        </div>
    </div>

}

export default Row;