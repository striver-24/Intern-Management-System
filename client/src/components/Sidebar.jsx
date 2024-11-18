import React from 'react';
import {
    MdDashboard,
    MdOutlineAddTask,
    MdOutlinePendingActions,
    MdSettings,
    MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setOpenSidebar } from '../redux/slices/authSlice';
import clsx from 'clsx';

const linkData = [
    { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> }, 
    { label: "Tasks", link: "tasks", icon: <FaTasks /> },
    { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
    { label: "In-Progress", link: "in-progress/in-progress", icon: <MdOutlinePendingActions /> },
    { label: "To Do", link: "todo/todo", icon: <MdOutlinePendingActions /> },
    { label: "Team", link: "team", icon: <FaUsers /> },
    { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
];

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname.split("/")[1];

    const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);
    
    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    };

    const NavLink = ({ el }) => (
        <Link 
            to={el.link} 
            onClick={closeSidebar} 
            className={clsx(
                "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
                path === el.link.split('/')[0] ? "bg-orange-500 text-neutral-100" : ""
            )}
            aria-label={`Navigate to ${el.label}`} // Accessibility improvement
        >
            {el.icon}
            <span className='hover:text-[#FFA500]'>{el.label}</span>
        </Link>
    );

    return (
        <div className='flex flex-col w-full h-full gap-6 p-5'>
            <h1 className='flex items-center gap-1'>
                <div className='p-2 bg-orange-500 rounded-full'>
                    <MdOutlineAddTask className='text-2xl font-black text-white'/>
                </div>
                <span className='text-2xl font-bold text-black'>Tasks@IMS</span>
            </h1>

            <div className='flex flex-col flex-1 py-8 gap-y-5'>
                {sidebarLinks.map((link) => (
                    <NavLink el={link} key={link.label} />
                ))}
            </div>

            <div>
                <button 
                    className='flex items-center w-full gap-2 p-2 text-lg text-gray-800 rounded hover:bg-gray-200'
                    onClick={closeSidebar} // Optional: Close sidebar on settings click
                >
                    <MdSettings />
                    <span>Settings</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;