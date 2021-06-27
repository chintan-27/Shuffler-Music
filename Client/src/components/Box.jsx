import React from 'react';
import { useSongStore } from './Store';
import {data as val } from './Songs';
import { Link } from 'react-router-dom';

function Box(props) {

    let artists = props.artist;
    let naam = props.name;
    let pic = props.image;
    const setSong = useSongStore(state => state.setName)
    if (props.artist.length > 15) {
        artists = props.artist.slice(0, 15) + "...";
    }
    if (props.name.length > 10) {
        naam = props.name.slice(0, 10) + "...";
    }
    return <div onClick={ () => { setSong(val[props.name] + '.mp3') } }>
        <Link to={{
            pathname: "/details",
            state: props,
        }} style={{ textDecoration: 'none' }}>
            <div className="cards">
                <div className="cards1">
                    <div className="box">

                        <img src={pic} alt="image" width="100%" height="100%"></img>
                    </div>
                    <h2 className="H2">{naam}</h2>
                    <p className="P">{artists}</p>
                </div>
            </div>
        </Link>
    </div>
}

export default Box;