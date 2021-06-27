import React from "react";
import Sidebar from "../components/Sidebar";
import Playlist from "./Playlist";
import Search from "./Search";
import Home from "./Home";
import AudioPlayer from "../components/AudioPlayer";
import Details from "../components/Details";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./Login";
import LoginButton from "../components/LoginButton";
import Register from "./Register";
import ArtistDetail from '../components/ArtistDetail';
import Liked from "./Liked";

function App() {
  return <div className="flex-container" style={{ height: "100vh" }}>
    <Router>
      <Sidebar />
      <div>
      <div style={{
        borderTop: "0.1px solid #383434",
        paddingLeft:"20px",
        position:"fixed",
        bottom:0,
        zIndex:10,
        left:0,
        background:"#121212"
      }}>
        <AudioPlayer />
      </div>
      <div>
        <LoginButton />
      </div>
      </div>
      <Switch>
        <Route path="/" exact component={Home}>
        </Route>
        <Route path="/login" exact component={Login}>
        </Route>
        <Route path="/register" exact component={Register}>
        </Route>
        <Route path="/playlist" component={Playlist}>
        </Route>
        <Route path="/search" component={Search}>
        </Route>
        <Route path="/details" component={Details}>
        </Route>
        <Route path="/ArtistDetail" component={ArtistDetail}>
        </Route>
        <Route path="/likedsongs" component={Liked}>
        </Route>
      </Switch>
    </Router>
  </div>
}

export default App;
