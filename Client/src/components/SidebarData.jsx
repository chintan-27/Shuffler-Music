import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export const SidebarData = [
    {
        title : "Home",
        icon : <HomeIcon />,
        link : "/"
    },
    {
        title : "Search",
        icon : <SearchIcon />,
        link : "/search"
    },
    {
        title : "Playlist",
        icon : <PlaylistAddIcon />,
        link : "/playlist"
    },
    {
        title : "Liked songs",
        icon : <FavoriteBorderIcon />,
        link : "/likedsongs"
    },
];