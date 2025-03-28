import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AlbumItem = ({ image, name, desc, id, isArtist }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="item min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Album Image */}
      <img
        className={`w-full h-auto object-cover ${isArtist ? "rounded-full" : "rounded"}`}
        src={image}
        alt={name}
      />

      {/* Play Button Wrapper (Relative Parent) */}
      <div className="play-btn relative">
        {/* Play Button (Absolute Child) */}
        <div
          className={`absolute right-2 top-[-55px] bg-[#1DB954] rounded-full w-12 h-12 flex items-center justify-center transition-opacity transform duration-300 ${ isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-0"}`}>
          <i className="fa-solid fa-play text-black text-xl text-center"></i>
        </div>
      </div>

      {/* Album Name */}
      <p className="font-bold mt-2 mb-1 line-clamp-2 hover:underline">{name}</p>

      {/* Artist Names */}
      <p className="text-slate-200 text-sm line-clamp-2">
        {desc.split(", ").map((name, index, arr) => (
          <React.Fragment key={index}>
            <span className="hover:underline cursor-pointer">{name}</span>
            {index !== arr.length - 1 && ", "}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default AlbumItem;