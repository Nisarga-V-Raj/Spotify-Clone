import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import AlbumItem from './AlbumItem';

const ShowAllPage = () => {
  const { albumsData } = useContext(PlayerContext);
  const { sectionKey } = useParams(); // Get the sectionKey from the URL
  const navigate = useNavigate();

  // Define section data based on key
  const sections = {
    trendingSongs: albumsData.slice(0, 20),
    popularArtists: albumsData.slice(20, 40),
    popularAlbumsSingles: albumsData.slice(40, 60),
    popularRadio: albumsData.slice(60, 80),
    featuredCharts: albumsData.slice(80, 86),
    indiasBest: albumsData.slice(86, 98),
  };

  const data = sections[sectionKey] || []; // Get data based on the key

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-800 text-white rounded-lg">
        Back
      </button>
      <h1 className="text-2xl font-bold my-4">Showing All {sectionKey.replace(/([A-Z])/g, ' $1')}</h1>

      <div className="grid grid-cols-5 gap-4">
        {data.map((item, idx) => (
          <AlbumItem
            key={idx}
            name={item.name}
            desc={item.desc}
            id={item._id}
            image={item.image}
            isArtist={sectionKey === "popularArtists"} 
          />
        ))}
      </div>
    </div>
  );
};

export default ShowAllPage;