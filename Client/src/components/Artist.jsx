import React from 'react';
import {Link} from 'react-router-dom';


function Artist(props) {


    return <div style={{marginRight: "15px"}}>
    <Link to={{
            pathname: "/ArtistDetail",
            state: props,
        }} style={{ textDecoration: 'none' }}>
        <div className="box-artist">
            <img src={`./Songs/${props.image}`} alt="image" width="150px" height="150px"></img>

        </div>
        <h2 className="H3">{props.artist}</h2>
        </Link>
    </div>
}

export default Artist;