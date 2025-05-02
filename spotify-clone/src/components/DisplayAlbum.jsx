import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
    const { id } = useParams();
    const [albumData, setAlbumData] = useState(null);
    const { playWithId, albumsData, songsData } = useContext(PlayerContext);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [showAllSongs, setShowAllSongs] = useState(false);

    useEffect(() => {
        const albumFound = albumsData.find(item => item._id === id);
        if (albumFound) {
            setAlbumData(albumFound);
        }
    }, [albumsData, id]);

    // Use albumData.name dynamically
    const albumSongs = songsData.filter(song => song.album === albumData?.name);

    const totalDurationInSeconds = albumSongs.reduce((sum, song) => {
        if (!song.duration) return sum;
        const parts = song.duration.split(':').map(Number);
        const [minutes, seconds] = parts.length === 2 ? parts : [0, 0];
        return sum + minutes * 60 + (seconds || 0);
    }, 0);

    const totalHours = Math.floor(totalDurationInSeconds / 3600);
    const remainingMinutes = Math.floor((totalDurationInSeconds % 3600) / 60);
    const remainingSeconds = totalDurationInSeconds % 60;

    const formattedDuration = `${totalHours > 0 ? totalHours + " hr " : ""}${remainingMinutes} min ${remainingSeconds > 0 ? remainingSeconds.toString().padStart(2, '0') + " sec" : ""}`.trim();

    if (!albumData) {
        return <div className='text-white text-lg mt-10'>Loading Album...</div>;
    }

    return (
        <>
            {/* Album Header */}
            <div className='mt-2 flex gap-8 flex-col md:flex-row md:items-end'>
                <img className='w-48 rounded cursor-pointer transition-transform duration-200 hover:scale-105' src={albumData.image} alt="" />

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
                    <h4>
                        {albumData.desc.split(',').map((name, index) => (
                            <span key={index} className="hover:underline cursor-pointer">
                                {name.trim()}
                            </span>
                        )).reduce((prev, curr) => [prev, ', ', curr])}
                    </h4>
                    <p className='mt-1'>
                        {albumData.isPopular && (
                            <span className='ml-2 text-blue-500 font-semibold'>Verified Artist</span>
                        )}
                        • {albumSongs.length > 0 && albumSongs[0].dateAdded
                            ? new Date(albumSongs[0].dateAdded).getFullYear() + " "
                            : "2024 "}
                        • {albumSongs.length} {albumSongs.length === 1 ? "song" : "songs"}, {formattedDuration}
                    </p>
                </div>
            </div>

            {/* Play & Control Buttons */}
            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            if (albumSongs.length > 0) playWithId(albumSongs[0]._id);
                        }}
                        className="bg-green-500 hover:bg-green-600 font-bold py-4 px-5 rounded-full transition duration-200 shadow-md transform hover:scale-105"
                    >
                        <i className="fa-solid fa-play text-black text-[30px] text-center"></i>
                    </button>
                    <button className="group w-9 h-9 flex items-center justify-center bg-[#121212] hover:bg-[#2a2a2a] border-2 border-gray-300 rounded-full transition-transform duration-200 transform hover:scale-110">
                        <i className="fa-solid fa-plus text-gray-300 text-base group-hover:text-white transition-colors duration-200"></i>
                    </button>
                    <button className="group w-9 h-9 flex items-center justify-center transition-transform duration-200 transform hover:scale-110">
                        <i className="fa-solid fa-ellipsis text-gray-300 text-lg group-hover:text-white transition-colors duration-200"></i>
                    </button>
                </div>

                {/* List button */}
                <button className="group flex items-center gap-2">
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-200 text-base font-semibold">
                        List
                    </span>
                    <i className="fa-solid fa-list-ul text-gray-300 group-hover:text-white text-lg transition-colors duration-200"></i>
                </button>
            </div>

            {/* Table Header */}
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
            {(showAllSongs ? albumSongs : albumSongs.slice(0, 5)).map((item, index) => (
                <div
                    key={index}
                    onClick={() => playWithId(item._id)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className='grid grid-cols-[50px_1.5fr_1fr_1fr_50px] gap-2 px-2 py-3 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'
                >
                    <div className='flex justify-center w-full'>
                        {hoveredIndex === index ? (
                            <img className='w-4' src={assets.play_icon} alt="Play" />
                        ) : (
                            <b className='text-[#a7a7a7]'>{index + 1}</b>
                        )}
                    </div>

                    <div className="flex items-center">
                        <img className='w-10 mr-4 rounded' src={item.image} alt="Song" />
                        <span className="inline-block w-[150px] overflow-hidden text-ellipsis whitespace-nowrap hover:underline">{item.name}</span>
                    </div>

                    <p className='text-[15px] hover:underline'>{albumData.name}</p>
                    <p className='text-[15px]'>{item.dateAdded ? new Date(item.dateAdded).toDateString() : "Unknown"}</p>
                    <p className='text-[15px] text-center'>
                        {(() => {
                            const [minutes, seconds] = item.duration.split(':');
                            return `${minutes}:${seconds.padStart(2, '0')}`;
                        })()}
                    </p>
                </div>
            ))}
            {albumSongs.length > 5 && (
                <div className="text-sm flex mt-6">
                    <button
                        className="px-4 text-gray-300 font-bold cursor-pointer hover:underline hover:scale-105 transition-transform duration-200"
                        onClick={() => setShowAllSongs(prev => !prev)}
                    >
                        {showAllSongs ? "Show Less" : "See More"}
                    </button>
                </div>
            )}

            {/* Footer */}
            {/* <div className='text-sm text-gray-400 font-semibold mt-8'>
                <p className='text-lg'>January 15, 2025</p>
                <p>© 2025 Tuffan Music</p>
                <p>℗ 2025 Tuffan Music</p>
            </div> */}

            {/* Footer Links */}
            <div className='mt-16 flex justify-between'>
                {/* Company Info */}
                <ul>
                    <li className='text-lg font-bold'>Company</li>
                    <li className='text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">About</a></li>
                    <li className='text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">Jobs</a></li>
                    <li className='text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">For the Record</a></li>
                </ul>
                {/* Communities */}
                <ul>
                    <li className='text-lg font-bold px-8'>Communities</li>
                    <li className='px-8 text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">For Artists</a></li>
                    <li className='px-8 text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">Developers</a></li>
                    <li className='px-8 text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">Advertising</a></li>
                    <li className='px-8 text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">Inventors</a></li>
                    <li className='px-8 text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">Vendors</a></li>
                </ul>
                {/* Useful Links */}
                <ul>
                    <li className='text-lg font-bold px-4'>Useful links</li>
                    <li className='px-4 text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">Support</a></li>
                    <li className='px-4 text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">Free Mobile App</a></li>
                </ul>
                {/* Spotify Plans */}
                <ul>
                    <li className='text-lg font-bold px-4'>Spotify Plans</li>
                    <li className='px-4 text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">Premium Individual</a></li>
                    <li className='px-4 text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">Premium Duo</a></li>
                    <li className='px-4 text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">Premium Family</a></li>
                    <li className='px-4 text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">Premium Student</a></li>
                    <li className='px-4 text-gray-400 text-base font-semibold py-1 hover:text-white hover:underline'><a href="#">Spotify Free</a></li>
                </ul>
                {/* Social Icons */}
                <div className='text-xl flex px-4 py-0 gap-3'>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-gray-400 cursor-pointer transition duration-200">
                        <i className="fa-brands fa-instagram text-white"></i>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-gray-400 cursor-pointer transition duration-200">
                        <i className="fa-brands fa-twitter text-white"></i>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-gray-400 cursor-pointer transition duration-200">
                        <i className="fa-brands fa-facebook text-white"></i>
                    </div>
                </div>
            </div>
            <br /><hr /><br />
            <p className='text-gray-400 text-sm font-semibold'>&copy; 2025 Spotify AB</p> <br />
        </>
    );
};

export default DisplayAlbum;