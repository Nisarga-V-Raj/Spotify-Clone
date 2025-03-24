import React, { useState } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
  const { albumsData } = useContext(PlayerContext);

  // ✅ State for "Show All" toggles for each section
  const [showAll, setShowAll] = useState({
    trendingSongs: false,
    popularArtists: false,
    popularAlbumsSingles: false,
    popularRadio: false,
    featuredCharts: false,
    indiasBest: false
  });

  // ✅ Assign albums dynamically based on order
  const sections = [
    { key: "trendingSongs", title: "Trending Songs", data: albumsData.slice(0, 20) },
    { key: "popularArtists", title: "Popular Artists", data: albumsData.slice(20, 40) },
    { key: "popularAlbumsSingles", title: "Popular Albums and Singles", data: albumsData.slice(40, 60) },
    { key: "popularRadio", title: "Popular Radio", data: albumsData.slice(60, 80) },
    { key: "featuredCharts", title: "Featured Charts", data: albumsData.slice(80, 86) },
    { key: "indiasBest", title: "India's Best", data: albumsData.slice(86, 98) }
  ];

  return (
    <>
      <Navbar />

      {/* Dynamic Sections */}
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center">
            <h1 className="my-5 font-bold text-2xl">{section.title}</h1>
            <button
              className="px-4 py-2 text-gray-300 font-bold hover:underline"
              onClick={() => setShowAll(prev => ({ ...prev, [section.key]: !prev[section.key] }))}
            >
              {showAll[section.key] ? "Show Less" : "Show All"}
            </button>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {section.data.slice(0, showAll[section.key] ? section.data.length : 5).map((item, idx) => (
              <AlbumItem
                key={idx}
                name={item.name}
                desc={item.desc}
                id={item._id}
                image={item.image}
                isArtist={section.key === "popularArtists"} // ✅ Only make Popular Artists' images circular
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default DisplayHome;