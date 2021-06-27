import React, { useState } from 'react';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

function Sidebar() {
    const [active, setActive] = useState(0);
    return <div className="sidebar">
        <div className="head">
            <MusicNoteIcon style={{ fontSize: "180%" }} />
            <h1>Shuffler</h1>
        </div>
        <ul className="sidebarList">
            {SidebarData.map((val, key) => {
                return (
                    <Link onClick={() => setActive(key)} key={key}
                        to={{
                            pathname: val.link,
                            state: {
                                artist: " ",
                                name: " ",
                            }
                        }}
                        style={{ textDecoration: 'none' }}>
                        <li key={key} className="rows"
                        >
                            <div
                                style={{
                                    color: active === key ? "#fff" : "#aca4a4"

                                }}
                                id="icon">{val.icon}</div>
                            <div style={{
                                color: active === key ? "#fff" : "#aca4a4"
                            }} id="title">{val.title}</div>
                        </li>
                    </Link>
                );
            })}
        </ul>
    </div>
}

export default Sidebar

