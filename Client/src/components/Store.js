import Cookies from 'js-cookie';
import create from 'zustand'

const useSongStore = create((set, get) => ({
    song: "",
    setName: (songName) => {
        // const { song } = get();
        set({ song: songName });
    },
    // login: Cookies.get('login') === undefined ? false : Cookies.get("login"),
    login :"false",
    setLogin: (status) => {
        set({ login: status });
    },
}));

export { useSongStore }