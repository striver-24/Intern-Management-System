import React from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';
import UserAvatar from "../components/UserAvatar";
import NotificationPanel from "../components/NotificationPanel";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <nav className='sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white shadow-md 2xl:py-4'>
            <div className='flex gap-4'>
                <button 
                    onClick={() => dispatch(setOpenSidebar(true))} 
                    className='block text-2xl text-gray-500 md:hidden'
                    aria-label="Open sidebar"
                >
                    ☰
                </button>

                <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6] shadow-sm'>
                    <MdOutlineSearch className='text-xl text-gray-500' />

                    <input 
                        type='text' 
                        placeholder='Search...'
                        className='flex-1 text-gray-800 bg-transparent outline-none placeholder:text-gray-500'
                        aria-label="Search"
                    />
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <NotificationPanel />

                <User Avatar user={user} />
            </div>
        </nav>
    );
}

export default Navbar;