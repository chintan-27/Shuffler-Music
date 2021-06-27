import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";

export default function useMusicPlayer(links: string[]) {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setPlaying] = useState(false);
  const [songLength, setSongLength] = useState(0);
  const [active, setActive] = useState(0);
  const [error, setError] = useState<any>();
  const [status, setStatus] = useState<any>();
  const [mount, setMount] = useState(false);
  const [activeDuration, setActiveDuration] = useState(0);

  const load = async (link: string) => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      { uri: link },
      {},
      (playbackStatus: any) => {
        setActiveDuration(playbackStatus?.positionMillis);
      }
    );
    setSound(sound);
  };
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  useEffect(() => {
    if (mount) {
      stop();
      load(links[active]);
    } else {
      setMount(true);
    }
  }, [active]);
  useEffect(() => {
    setPlaying(status?.isPlaying);
    setSongLength(status?.durationMillis);
  }, [status]);

  const start = () => load(links[active]);
  const stop = async () =>
    await sound?.stopAsync().catch((err) => setError(err));
  const pause = async () =>
    await sound?.pauseAsync().then(() => {
      sound
        .getStatusAsync()
        .then((status) => setStatus(status))
        .catch((err) => setError(err));
    });
  const play = async () =>
    await sound?.playAsync().then(() => {
      sound
        .getStatusAsync()
        .then((status) => setStatus(status))
        .catch((err) => setError(err));
    });
  const next = () => {
    setActive((previous) => {
      return previous <= links.length ? previous + 1 : previous;
    });
  };
  const previous = () => {
    setActive((previous) => {
      return previous > 0 ? active - 1 : 0;
    });
  };
  const replay = async () =>
    await sound?.replayAsync().then(() => {
      sound
        .getStatusAsync()
        .then((status) => setStatus(status))
        .catch((err) => setError(err));
    });
  const isLoading = () => sound?._loading;
  const setDuration = (millis: number) =>
    sound
      ?.playFromPositionAsync(millis)
      .then((status) => setStatus(status))
      .catch((err) => setError(err));

  const millisToSeconds = (millis: any) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return {
    start,
    play,
    pause,
    replay,
    isLoading,
    status,
    next,
    previous,
    setDuration,
    isPlaying,
    duration: songLength,
    activeDuration,
    error,
  };
}
