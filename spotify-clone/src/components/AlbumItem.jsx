import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumItem = ({ image, name, desc, id, isArtist }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      {/* ✅ Apply rounded-full ONLY for artist images */}
      <img
        className={`w-full h-auto object-cover ${isArtist ? "rounded-full" : "rounded"}`}
        src={image}
        alt={name}
      />
      <p className="font-bold mt-2 mb-1 line-clamp-2 hover:underline">{name}</p>
      <p className="text-slate-200 text-sm line-clamp-2">
        {desc.split(", ").map((name, index, arr) => (
          <React.Fragment key={index}>
            <span className="hover:underline cursor-pointer">{name}</span>
            {index !== arr.length - 1 && ", "} {/* Comma remains outside */}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default AlbumItem;