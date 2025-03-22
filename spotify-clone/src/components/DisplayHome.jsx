import React, { useState } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);

  const [showAllSongs, setShowAllSongs] = useState(false); // State to toggle show all

  // Example categories for albums
  const albumSections = [
    { title: "Trending Songs", data: albumsData.slice(6, 20) },
    { title: "Featured Charts", data: albumsData.slice(0, 6) },
    { title: "New Releases", data: albumsData.slice(20, 10) },
    { title: "Trending Now", data: albumsData.slice(10, 15) }
  ];

  return (
    <>
      <Navbar />

      {/* Dynamic Album Sections */}
      {albumSections.map((section, index) => (
        <div key={index} className="mb-4">
          <h1 className="my-5 font-bold text-2xl">{section.title}</h1>
          <div className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {section.data.map((item, index) => (
              <AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />
            ))}
          </div>
        </div>
      ))}

      {/* Songs Section with Show All Toggle */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h1 className="my-5 font-bold text-2xl">Today's Biggest Hits</h1>
          <button
            className="px-4 py-2 text-gray-300 font-bold hover:underline"
            onClick={() => setShowAllSongs(!showAllSongs)}
          >
            {showAllSongs ? "Show Less" : "Show All"}
          </button>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {songsData.slice(0, showAllSongs ? songsData.length : 5).map((item, index) => (
            <SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />
          ))}
        </div>
      </div>
    </>
  );
}

export default DisplayHome;