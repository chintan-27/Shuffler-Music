import React, { useState, useRef, useEffect } from 'react'
import { BsArrowLeftShort } from "react-icons/bs"
import { BsArrowRightShort } from "react-icons/bs"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"
import { useSongStore } from "./Store"
const AudioPlayer = () => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation

  const songName = useSongStore(state => state.song)

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }
  useEffect(() => {
    play()
  }, [songName])

  const play = () => {
    audioPlayer.current.play();
    setIsPlaying(true)
    animationRef.current = requestAnimationFrame(whilePlaying);

  }
  const pause = () => {
    audioPlayer.current.pause();
    setIsPlaying(false)
    // animationRef.current = requestAnimationFrame(whilePlaying);
    cancelAnimationFrame(animationRef.current);
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) - 30;
    changeRange();
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) + 30;
    console.log(progressBar.current.value)
    changeRange();
  }

  return (
    <div className="audioPlayer" style={{ display: songName === "" ? "none" : "flex" }} >
      <audio ref={audioPlayer} src={`./Songs/${songName}`} preload="metadata"></audio>
      <button className="forwardBackward" onClick={backThirty}><BsArrowLeftShort /> 30</button>
      {
        isPlaying ? <button onClick={pause} className="playPause">
          <FaPause />
        </button> : <button onClick={play} className="playPause">
          <FaPlay className="play" />
        </button>
      }

      <button className="forwardBackward" onClick={forwardThirty}>30 <BsArrowRightShort /></button>

      {/* current time */}
      <div className="currentTime">{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>

        <input  type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />
      </div>
      {/* duration */}
      <div className="duration">{(duration && !isNaN(duration)) ? calculateTime(duration) : "0:00"}</div>
    </div>
  )
}

export default AudioPlayer;