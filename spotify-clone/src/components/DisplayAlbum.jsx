import React, { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = ({ album }) => {
    const { id } = useParams();
    const [albumData, setAlbumData] = useState(null);
    const { playWithId, albumsData, songsData } = useContext(PlayerContext);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const albumFound = albumsData.find(item => item._id === id);
        if (albumFound) {
            setAlbumData(albumFound);
        }
    }, [albumsData, id]);

    // Filter songs that belong to this album
    const albumSongs = songsData.filter(song => song.album === album?.name);

    // Calculate total duration
    const totalDurationInSeconds = albumSongs.reduce((sum, song) => {
        if (!song.duration) return sum;  // Ensure duration exists
        const parts = song.duration.split(':').map(Number);
        const [minutes, seconds] = parts.length === 2 ? parts : [0, 0]; // Handle invalid formats
        return sum + minutes * 60 + (seconds || 0);
    }, 0);

    const totalHours = Math.floor(totalDurationInSeconds / 3600);
    const remainingMinutes = Math.floor((totalDurationInSeconds % 3600) / 60);
    const remainingSeconds = totalDurationInSeconds % 60;

    const formattedDuration = `${totalHours > 0 ? totalHours + " hr " : ""
        }${remainingMinutes} min ${remainingSeconds > 0 ? remainingSeconds + " sec" : ""
        }`.trim();

    return albumData ? (
        <>
            <Navbar />
            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img className='w-48 rounded' src={albumData.image} alt="" />
                <div className='flex flex-col self-start items-start'>
                    <p>{albumSongs.length === 1 ? "Single" : "Playlist"}</p>
                    <h2
                        className='font-bold mb-2 md:mb-3 max-w-fit leading-tight'
                        style={{
                            fontSize: `clamp(40px, ${90 - albumData.name.length}px, 45px)`,
                            textAlign: 'left',
                            wordBreak: 'break-word',
                            whiteSpace: 'normal'
                        }}
                    >
                        {albumData.name}
                    </h2>
                    <h4>{albumData.desc}</h4>
                    <p className='mt-1'>
                        <img className='inline-block w-5' src={assets.spotify_logo} alt="" />
                        <b className='hover:underline'> Spotify </b>
                        {albumData.isPopular && (
                            <span className='ml-2 text-blue-500 font-semibold'>Verified Artist</span>
                        )}
                        • {albumSongs.length > 0 && albumSongs[0].dateAdded ? new Date(albumSongs[0].dateAdded).getFullYear() : "2024 "}
                        • <b>{albumSongs.length} {albumSongs.length === 1 ? "song" : "songs"}, </b> {formattedDuration}
                    </p>
                </div>
            </div>

            {/* Header Row */}
            <div className='grid grid-cols-[50px_1.5fr_1fr_1fr_50px] mt-10 mb-4 px-2 text-[#a7a7a7] items-center'>
                <p className="text-center">#</p>
                <p className="text-left">Title</p>
                <p className="text-left">Album</p>
                <p className="text-left">Date Added</p>
                <p className="text-center">
                    <img className='w-4 inline' src={assets.clock_icon} alt="Clock Icon" />
                </p>
            </div>
            <hr />

            {/* Song List */}
            {albumSongs.map((item, index) => (
                <div
                    key={index}
                    onClick={() => playWithId(item._id)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className='grid grid-cols-[50px_1.5fr_1fr_1fr_50px] gap-2 px-2 py-3 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                    {/* # or Play Button on Hover */}
                    <div className='flex justify-center w-full'>
                        {hoveredIndex === index ? (
                            <img className='w-4' src={assets.play_icon} alt="Play" />
                        ) : (
                            <b className='text-[#a7a7a7]'>{index + 1}</b>
                        )}
                    </div>

                    {/* Song Title with Image */}
                    <div className="flex items-center">
                        <img className='w-10 mr-4 rounded' src={item.image} alt="Song" />
                        <span className="inline-block w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</span>
                    </div>

                    {/* Album Name */}
                    <p className='text-[15px]'>{albumData.name}</p>

                    {/* Date Added */}
                    <p className='text-[15px]'>{item.dateAdded ? new Date(item.dateAdded).toDateString() : "Unknown"}</p>

                    {/* Song Duration */}
                    <p className='text-[15px] text-center'>{item.duration}</p>
                </div>
            ))}
        </>
    ) : null;
};

export default DisplayAlbum;