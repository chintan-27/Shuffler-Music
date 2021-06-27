import axios from "axios";
import React, { useEffect, useState } from "react";
import Navigation from "./src/navigation";
import useMusicStore from "./src/state/MusicStore";

export default function App() {
  const { music, activeSong, start, setSongs } = useMusicStore((state) => {
    return {
      music: state.music,
      activeSong: state.activeSong,
      start: state.start,
      play: state.play,
      setSongs: state.setSongs,
    };
  });
  const [firstMount, setFirstMount] = useState(false);
  const call = async () => {
    await axios
      .post("http://192.168.43.195:5000/songs", {
        songs: [
          { name: "Come As You Are", year: 1991 },
          { name: "Smells Like Teen Spirit", year: 1991 },
          { name: "Lithium", year: 1992 },
          { name: "All Apologies", year: 1993 },
          { name: "Stay Away", year: 1993 },
          { name: 'Life is a Highway - From "Cars"', year: 2009 },
          { name: "Of Wolf And Man", year: 1991 },
          { name: "Somebody Like You", year: 2002 },
          { name: "Kayleigh", year: 1992 },
        ],
        number: 15,
      })
      .then((msg) => setSongs(msg.data.songs))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    call();
  }, []);
  useEffect(() => {
    return music
      ? () => {
          music.unloadAsync();
        }
      : undefined;
  }, [music]);

  useEffect(() => {
    if (!firstMount) setFirstMount(true);
    start(activeSong);
  }, [activeSong]);

  return <Navigation />;
}
