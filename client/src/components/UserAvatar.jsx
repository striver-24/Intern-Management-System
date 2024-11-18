import React, { Fragment, useState } from 'react';
import { Menu, Transition } from "@headlessui/react";
import { FaUser , FaUserLock } from 'react-icons/fa';
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getInitials } from '../utils';
import { clsx } from 'clsx';

const UserAvatar = () => {
    const [open, setOpen] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const logoutHandler = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            setLoading(true);
            console.log("Logging out...");
            // Implement the logout logic here, e.g. dispatch(logoutAction())
            setLoading(false);
            // Optionally navigate to login page
            navigate('/login');
        }
    };

    return (
        <div>
            <Menu as="div" className='relative inline-block text-left'>
                <div>
                    <Menu.Button className='items-center justify-center w-10 h-10 bg-orange-600 rounded-full 2xl:w-12 2xl:h-12'>
                        <span className='font-semibold text-white'>
                            {getInitials(user?.name)}
                        </span>
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'    
                >
                    <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-gray-100 rounded-md shadow-2xl ring-1 ring-black/5 focus:outline-none'>
                        <div className='p-4'>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => setOpen(true)}
                                        className={clsx('text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base', { 'bg-gray-100': active })}
                                        aria-label="View Profile"
                                    >
                                        <FaUser  className='mr-2' aria-hidden='true' />
                                        Profile
                                    </button>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => setOpenPassword(true)}
                                        className={clsx('text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base', { 'bg-gray-100': active })}
                                        aria-label="Change Password"
                                    >
                                        <FaUser Lock className='mr-2' aria-hidden='true' />
                                        Change Password
                                    </button>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={logoutHandler}
                                        className={clsx('text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base', { 'bg-red-100': active })}
                                        aria-label="Logout"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span>Loading...</span>
                                        ) : (
                                            <>
                                                <IoLogOutOutline className='mr-2' aria-hidden='true' />
                                                Logout
                                            </>
                                        )}
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export default UserAvatar;