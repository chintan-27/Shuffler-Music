import { Audio } from "expo-av";
import create, { SetState, GetState } from "zustand";

interface MusicStore {
  songs: string[];
  setSongs: (data: any[]) => void;
  music: Audio.Sound | undefined;
  activeSong: number;
  activeDuration: number;
  duration: number;
  isPlaying: boolean;
  start: (start?: number) => void;
  stop: () => void;
  play: () => void;
  pause: () => void;
  replay: () => void;
  previous: () => void;
  next: () => void;
  handleActiveSong: (song: number) => void;
  handleDuration: (millis: number) => void;
}

const useMusicStore = create<MusicStore>(
  (set: SetState<MusicStore>, get: GetState<MusicStore>) => ({
    songs: [],
    setSongs: (data) => {
      const { songs } = get();
      set({ songs: [...songs, ...data] });
    },
    activeSong: 0,
    music: undefined,
    activeDuration: 0,
    duration: 0,
    isPlaying: false,
    start: async (song = 0) => {
      const { songs, start } = get();
      const { sound } = await Audio.Sound.createAsync(
        {
          uri: "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3",
        },
        {},
        (playbackStatus: any) => {
          set({
            activeDuration: playbackStatus?.positionMillis,
            duration: playbackStatus?.durationMillis,
            isPlaying: playbackStatus?.isPlaying,
          });
        }
      );
      set({ music: sound });
      sound?.playAsync();
    },
    stop: () => {
      const { music } = get();
      music?.unloadAsync();
    },
    pause: () => {
      const { music } = get();
      music?.pauseAsync();
    },
    play: () => {
      const { music } = get();
      music?.playAsync();
    },
    replay: () => {
      const { music } = get();
      music?.replayAsync();
    },
    next: () => {
      const { activeSong, songs } = get();
      set({ activeSong: Math.min(activeSong + 1, songs.length - 1) });
    },
    previous: () => {
      const { activeSong } = get();
      set({ activeSong: Math.max(activeSong - 1, 0) });
    },
    handleDuration: (millis) => {
      const { music } = get();

      music?.playFromPositionAsync(millis);
    },
    handleActiveSong: (song) => {
      set({ activeSong: song });
    },
  })
);

export default useMusicStore;
