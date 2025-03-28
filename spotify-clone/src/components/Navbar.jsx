import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        console.log("What do you want to play?", e.target.value);
    };

    return (
        <div className='w-full h-[10%] bg-[#121212] flex items-center justify-between p-4 text-white'>
            {/* Left Section - Home & Search */}
            <div className='flex items-center gap-6'>
                {/* Home Button */}
                <div onClick={() => navigate('/')} className='flex items-center gap-3 cursor-pointer'>
                    <img className='w-6' src={assets.home_icon} alt="Home Icon" />
                    <p className='font-bold'>Home</p>
                </div>

                {/* Search Bar */}
                <div className='flex items-center gap-3 cursor-pointer' onClick={() => setIsSearching(true)}>
                    <img className='w-6' src={assets.search_icon} alt="Search Icon" />
                    {isSearching ? (
                        <input
                            type="text"
                            placeholder="What do you want to play?"
                            className="w-full bg-transparent text-white border-b border-gray-400 outline-none"
                            value={searchQuery}
                            onChange={handleSearch}
                            onBlur={() => setIsSearching(false)} // Hide search on blur
                            autoFocus
                        />
                    ) : (
                        <p className='font-bold'>Search</p>
                    )}
                </div>
            </div>

            <div className='flex items-center gap-6'>
                <p className='text-gray-400 text-[15px] font-bold cursor-pointer transition-colors duration-200 hover:text-white'>Premium</p>
                <p className='text-gray-400 text-[15px] font-bold cursor-pointer transition-colors duration-200 hover:text-white'>Support</p>
                <p className='text-gray-400 text-[15px] font-bold cursor-pointer transition-colors duration-200 hover:text-white'>Download</p>
                <p className='text-white text-[15px] font-bold'>|</p>
                <p className='text-gray-400 text-[15px] font-bold cursor-pointer transition-colors duration-200 hover:text-white'>Install App</p>
                <p className='text-gray-400 text-[15px] font-bold cursor-pointer transition-colors duration-200 hover:text-white'>Sign up</p>
                <p className='bg-white text-black text-[15px] font-bold px-4 py-1 rounded-2xl cursor-pointer transition-transform duration-200 hover:bg-gray-600 hover:scale-105'>Log in</p>
            </div>
        </div>
    );
};

export default Navbar;
