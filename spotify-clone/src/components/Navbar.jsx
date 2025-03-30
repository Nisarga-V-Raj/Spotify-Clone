import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className='w-full h-[10%] bg-[#121212] flex items-center justify-between p-4 text-white'>
            {/* Left Section - Home & Search */}
            <div className='flex items-center gap-6'>
                {/* Home Button */}
                <div onClick={() => navigate('/')} className='flex items-center gap-3 cursor-pointer hover:scale-105'>
                    <img className='w-6' src={assets.home_icon} alt="Home Icon" />
                    <p className='font-bold'>Home</p>
                </div>

                {/* Search Bar */}
                <div className='flex items-center gap-3 cursor-pointer hover:scale-105' onClick={() => setIsSearching(true)}>
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
                <p className='hidden md:flex text-gray-400 text-[15px] font-bold cursor-pointer transition-colors duration-200 hover:text-white hover:scale-105'>
                    Premium
                </p>
                <p className='hidden md:flex text-gray-400 text-[15px] font-bold cursor-pointer transition-colors duration-200 hover:text-white hover:scale-105'>
                    Support
                </p>
                <p className='hidden md:flex text-gray-400 text-[15px] font-bold cursor-pointer transition-colors duration-200 hover:text-white hover:scale-105'>
                    Download
                </p>
                <p className='hidden md:flex text-white text-[15px] font-bold'>|</p>
                <p className='text-gray-400 text-[15px] font-bold cursor-pointer transition-colors duration-200 hover:text-white hover:scale-105'>Install App</p>
                <p className='text-gray-400 text-[15px] font-bold cursor-pointer transition-colors duration-200 hover:text-white hover:scale-105'>Sign up</p>
                <p className='bg-white text-black text-[15px] font-bold px-4 py-1 rounded-2xl cursor-pointer transition-transform duration-200 hover:bg-gray-200 hover:scale-105'>Log in</p>
            </div>
        </div>
    );
};

export default Navbar;