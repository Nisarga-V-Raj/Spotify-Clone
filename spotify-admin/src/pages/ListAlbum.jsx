import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { url } from '../App';

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums);
      } else {
        toast.error("Failed to fetch albums");
      }
    } catch (error) {
      console.log("Failed to fetch albums", error);
      toast.error("Failed to fetch albums");
    }
  };

  const removeAlbum = async (id) => {
    console.log("Removing album with ID:", id); // Debugging log

    try {
      const response = await axios.post(`${url}/api/album/delete`, { id });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums(); // Refresh list after deleting
      } else {
        toast.error("Failed to remove album");
      }
    } catch (error) {
      console.log("Failed to remove album", error);
      toast.error("Failed to remove album");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>

        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img className='w-12' src={item.image} alt="Album Cover" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type='color' value={item.bgColour} readOnly />
              <p onClick={() => removeAlbum(item._id)} className='cursor-pointer'>X</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No albums found</p>
        )}
      </div>
    </div>
  );
};

export default ListAlbum;