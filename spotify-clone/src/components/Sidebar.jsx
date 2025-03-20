import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className='w-[35%] h-[80%] p-2 flex-col gap-2 text-white hidden lg:flex'>
            <div className='bg-[#121212] h-[40%] rounded flex flex-col justify-around'>
                <div onClick={() => navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6' src={assets.home_icon} alt="" />
                    <p className='font-bold'>Home</p>
                </div>
                <div className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6' src={assets.search_icon} alt="" />
                    <p className='font-bold'>Search</p>
                </div>
            </div>

            <div className='bg-[#121212] h-[85%] rounded flex flex-col overflow-y-auto max-h-[85%] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 pr-2'>
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='w-8' src={assets.stack_icon} alt="" />
                        <p className='font-semibold'>Your Library</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img className='w-5' src={assets.plus_icon} alt="" />
                    </div>
                </div>

                <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                    <h1>Create your first playlist</h1>
                    <p>It&apos;s easy, we&apos;ll help you</p>
                    <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>
                        Create Playlist
                    </button>
                </div>

                <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4'>
                    <h1>Let&apos;s find some podcasts to follow</h1>
                    <p>We&apos;ll keep you updated on new episodes</p>
                    <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>
                        Browse Podcasts
                    </button>
                </div>
            </div>

            <div className='mt-2 p-4 text-gray-400 text-xs'>
                <ul className="space-y-2">
                    <li className="flex gap-3">
                        <a href="#" className="cursor-pointer">Legal</a>
                        <a href="#" className="cursor-pointer">Safety & Privacy Center</a>
                        <a href="#" className="cursor-pointer">Privacy Policy</a>
                    </li>
                    <li className="flex gap-3">
                        <a href="#" className="cursor-pointer">Cookies</a>
                        <a href="#" className="cursor-pointer">About Ads</a>
                        <a href="#" className="cursor-pointer">Accessibility</a>
                    </li>
                    <li>
                        <a href="#" className="text-white cursor-pointer hover:underline">Cookies</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;