import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { PlayerContext } from "./PlayerContext";

const PlayerContextProvider = ({ children }) => {
    const audioRef = useRef(null);
    const seekBg = useRef(null);
    const seekBar = useRef(null);

    const url = "http://localhost:4000";

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 },
    });

    // Fetch Songs & Albums
    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
            if (!track) {
                setTrack(response.data.songs[0]);
            }
        } catch (error) {
            console.error("Failed to fetch songs", error);
        }
    };

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);
        } catch (error) {
            console.error("Failed to fetch albums", error);
        }
    };

    // Play & Pause
    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    // Play a specific track
    const playWithId = (id) => {
        const selectedTrack = songsData.find(song => song._id === id);
        if (selectedTrack) {
            setTrack(selectedTrack);
            setTimeout(() => play(), 100);
        }
    };

    // Play previous song
    const previous = () => {
        const index = songsData.findIndex(song => song._id === track?._id);
        if (index > 0) {
            setTrack(songsData[index - 1]);
            setTimeout(() => play(), 100);
        }
    };

    // Play next song
    const next = () => {
        const index = songsData.findIndex(song => song._id === track?._id);
        if (index < songsData.length - 1) {
            setTrack(songsData[index + 1]);
            setTimeout(() => play(), 100);
        }
    };

    // Seek Song
    const seekSong = (e) => {
        if (audioRef.current && seekBg.current) {
            const seekTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
            audioRef.current.currentTime = seekTime;
        }
    };

    // Update Progress Bar
    useEffect(() => {
        if (!audioRef.current) return;

        const audioElement = audioRef.current;

        const updateTime = () => {
            if (audioElement.duration) {
                seekBar.current.style.width = `${(audioElement.currentTime / audioElement.duration) * 100}%`;
                setTime({
                    currentTime: {
                        second: Math.floor(audioElement.currentTime % 60),
                        minute: Math.floor(audioElement.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioElement.duration % 60),
                        minute: Math.floor(audioElement.duration / 60),
                    },
                });
            }
        };

        audioElement.ontimeupdate = updateTime;
        return () => {
            audioElement.ontimeupdate = null;
        };
    }, [track]);

    // Fetch songs and albums on component mount
    useEffect(() => {
        getSongsData();
        getAlbumsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PlayerContext.Provider
            value={{
                audioRef,
                seekBg,
                seekBar,
                track,
                playStatus,
                time,
                play,
                pause,
                playWithId,
                previous,
                next,
                seekSong,
                songsData,
                albumsData,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;