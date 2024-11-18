import React, { Fragment } from 'react';
import { getInitials } from '../utils';
import { Popover, Transition } from "@headlessui/react";

const UserInfo = ({ user, loading = false }) => {
    if (loading) {
        return <div className="px-4">Loading...</div>; // Simple loading state
    }

    return (
        <div className='px-4'>
            <Popover className='relative'>
                {({ open }) => (
                    <>
                        <Popover.Button 
                            className='inline-flex items-center outline-none group' 
                            aria-label="User  Information"
                        >
                            <span>
                                {getInitials(user?.name)}
                            </span>
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0 translate-y-1'
                            enterTo='opacity-100 translate-y-0'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100 translate-y-0'
                            leaveTo='opacity-0 translate-y-1'
                        >
                            <Popover.Panel 
                                className='absolute z-10 max-w-sm px-4 mt-3 transform translate-x-1/2 left-1/2 w-90 sm:px-0' 
                                role="tooltip"
                            >
                                <div className='flex items-center gap-4 p-4 bg-white rounded-lg shadow-lg'>
                                    <div className='flex items-center justify-center w-16 h-16 text-2xl text-white bg-blue-600 rounded-full'>
                                        <span>{getInitials(user?.name)}</span>
                                    </div>
                                    <div className='flex flex-col gap-y-1'>
                                        <p className='text-xl font-bold text-black'>{user.name || 'N/A'}</p>
                                        <span className='text-base text-gray-500'>{user.title || 'No title available'}</span>
                                        <span className='text-blue-500'>{user.email || 'No email available'}</span>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default UserInfo;