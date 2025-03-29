import React, { useState } from 'react';
import AlbumItem from './AlbumItem';
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
  const { albumsData } = useContext(PlayerContext);

  const [showAll, setShowAll] = useState({
    trendingSongs: false,
    popularArtists: false,
    popularAlbumsSingles: false,
    popularRadio: false,
    featuredCharts: false,
    indiasBest: false
  });

  const sections = [
    { key: "trendingSongs", title: "Trending Songs", data: albumsData.slice(0, 20) },
    { key: "popularArtists", title: "Popular Artists", data: albumsData.slice(20, 40) },
    { key: "popularAlbumsSingles", title: "Popular Albums and Singles", data: albumsData.slice(40, 60) },
    { key: "popularRadio", title: "Popular Radio", data: albumsData.slice(60, 80) },
    { key: "featuredCharts", title: "Featured Charts", data: albumsData.slice(80, 86) },
    { key: "indiasBest", title: "India's Best", data: albumsData.slice(86, 98) }
  ];

  return (
    <div className="flex flex-col min-h-screen mb-10">
      {/* ✅ Content Sections */}
      <div className="flex-grow">
        {sections.map((section, index) => (
          <div key={index} className="mb-5">
            <div className="flex justify-between items-center">
              <h1 className="mt-1 my-4 font-bold text-2xl cursor-pointer hover:underline">{section.title}</h1>
              <button
                className="px-4 py-2 text-gray-300 font-bold cursor-pointer hover:underline hover:scale-105"
                onClick={() => setShowAll(prev => ({ ...prev, [section.key]: !prev[section.key] }))}>
                {showAll[section.key] ? "Show Less" : "Show All"}
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4 ml-[-10px]">
              {section.data.slice(0, showAll[section.key] ? section.data.length : 5).map((item, idx) => (
                <AlbumItem
                  key={idx}
                  name={item.name}
                  desc={item.desc}
                  id={item._id}
                  image={item.image}
                  isArtist={section.key === "popularArtists"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Footer */}
      <div className='mt-7 flex justify-content: space-between'>
        <ul>
          <li className='text-lg font-bold'><a href="#">Company</a></li>
          <li className='text-gray-400 text-base font-semibold py-1 font-14px hover:underline'><a href="#">About</a></li>
          <li className='text-gray-400 text-base font-semibold py-1 font-14px hover:underline'><a href="#">Jobs</a></li>
          <li className='text-gray-400 text-base font-semibold py-1 font-14px hover:underline'><a href="#">For the Record</a></li>
        </ul>
        <ul>
          <li className='text-lg font-bold px-10'><a href="#">Communities</a></li>
          <li className='px-10 text-gray-400 text-base font-semibold py-1 font-14px hover:underline'><a href="#">For Artists</a></li>
          <li className='px-10 text-gray-400 text-base font-semibold py-1 font-14px hover:underline'><a href="#">Developers</a></li>
          <li className='px-10 text-gray-400 text-base font-semibold py-1 font-14px hover:underline'><a href="#">Advertising</a></li>
          <li className='px-10 text-gray-400 text-base font-semibold py-1 font-14px hover:underline'><a href="#">Inventors</a></li>
          <li className='px-10 text-gray-400 text-base font-semibold py-1 font-14px hover:underline'><a href="#">Vendors</a></li>
        </ul>
        <ul>
          <li className='text-lg font-bold px-6'><a href="#">Useful links</a></li>
          <li className='px-6 text-gray-400 text-base font-semibold py-1 font-14px'><a href="#">Support</a></li>
          <li className='px-6 text-gray-400 text-base font-semibold py-1 font-14px'><a href="#">Free Mobile App</a></li>
        </ul>
        <ul>
          <li className='text-lg font-bold px-6'><a href="#">Spotify Plans</a></li>
          <li className='px-6 text-gray-400 text-base font-semibold py-1 font-14px'><a href="#">Premium Individual</a></li>
          <li className='px-6 text-gray-400 text-base font-semibold py-1 font-14px'><a href="#">Premium Duo</a></li>
          <li className='px-6 text-gray-400 text-base font-semibold py-1 font-14px'><a href="#">Premium Family</a></li>
          <li className='px-6 text-gray-400 text-base font-semibold py-1 font-14px'><a href="#">Premium Student</a></li>
          <li className='px-6 text-gray-400 text-base font-semibold py-1 font-14px'><a href="#">Spotify Free</a></li>
        </ul>
        <div>
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-twitter"></i>
          <i class="fa-brands fa-facebook"></i>
        </div>
      </div>
      <br /> <br />
      <hr /> <br /> <br />
      <p className='text-gray-400 text-sm font-semibold'>&copy; 2025 Spotify AB</p> <br />
    </div>
  );
};

export default DisplayHome;
