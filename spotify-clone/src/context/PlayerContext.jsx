import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = 'http://localhost:4000';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(null); // Start with null to avoid issues
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    // Play Function
    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    // Pause Function
    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    // Play a Specific Song
    const playWithId = (id) => {
        const selectedSong = songsData.find(item => item._id === id);
        if (selectedSong) {
            setTrack(selectedSong);
            setPlayStatus(true);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play();
                }
            }, 100);
        }
    };

    // Previous Song
    const previous = () => {
        const currentIndex = songsData.findIndex(item => item._id === track?._id);
        if (currentIndex > 0) {
            setTrack(songsData[currentIndex - 1]);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play();
                }
            }, 100);
            setPlayStatus(true);
        }
    };

    // Next Song
    const next = () => {
        const currentIndex = songsData.findIndex(item => item._id === track?._id);
        if (currentIndex < songsData.length - 1) {
            setTrack(songsData[currentIndex + 1]);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play();
                }
            }, 100);
            setPlayStatus(true);
        }
    };

    // Seek Song
    const seekSong = (e) => {
        if (audioRef.current && seekBg.current) {
            const seekPosition = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
            audioRef.current.currentTime = seekPosition;
        }
    };

    // Fetch Songs
    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
            if (response.data.songs.length > 0) {
                setTrack(response.data.songs[0]); // Ensure first track is set
            }
        } catch (error) {
            console.log("Failed to fetch songs", error);
        }
    };

    // Fetch Albums
    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);
        } catch (error) {
            console.log("Failed to fetch albums", error);
        }
    };

    // Update Seek Bar & Time
    useEffect(() => {
        const updateProgress = () => {
            if (audioRef.current && seekBar.current) {
                const currentSeconds = Math.floor(audioRef.current.currentTime);
                const totalSeconds = Math.floor(audioRef.current.duration) || 1;
                const progressPercentage = (currentSeconds / totalSeconds) * 100;
                seekBar.current.style.width = `${progressPercentage}%`;

                setTime({
                    currentTime: {
                        second: currentSeconds % 60,
                        minute: Math.floor(currentSeconds / 60),
                    },
                    totalTime: {
                        second: totalSeconds % 60,
                        minute: Math.floor(totalSeconds / 60),
                    }
                });
            }
        };

        if (audioRef.current) {
            audioRef.current.ontimeupdate = updateProgress;
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = null;
            }
        };
    }, [track]);

    // Fetch Data on Load
    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;