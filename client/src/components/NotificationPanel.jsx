import React from 'react';
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import moment from "moment";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const data = []
const ICONS = {
    alert: (
        <HiBellAlert className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
    ),
    message: (
        <BiSolidMessageRounded className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
    ),
};


const NotificationPanel = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    //const { data, refetch } = useGetNotificationsQuery();
    //const [markAsRead] = useMarkNotiAsReadMutation();
    
    const readHandler = () => {};

    const callsToAction = [
        { name: "Cancel", href: "#", icon: "" },
        {
            name: "Mark All Read",
            href: "#",
            icon: "",
            onClick: () => readHandler("all", ""),
        },
    ];

  return (
    <>
        <Popover className={relative}>
            <PopoverButton className='inline-flex items-center outline-none'>
                <div className='w-8 h-8 flex items-center justify-center text-gray-800 dark:text-white relative'>
                    <IoIosNotificationsOutline className='text-2xl'/>
                    {data?.length > 0 && (
                        <span className='absolute text-center top-0 right-1 text-sm text-white font-semibold w-4 h-4 rounded-full bg-red-600'>
                            {data?.length}
                        </span>
                    )}
                </div>
            </PopoverButton>

            <Transition
                as={Fragment}
                enter='transition ease-out duration-200'
                enterFrom='opacity-0 translate-y-1'
                enterTo='opacity-100 translate-y-0'
                leave='transition ease-in duration-150'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-1'
            >
                <PopoverPanel className='absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max px-4'>
                    {({ close }) => (
                        data?.length > 0 ? (
                            <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-1g ring-1 ring-gray-900/5'>
                                <div className='p-4'>
                                    {data?.slice(0,5).map((item, index) => (
                                        <div
                                            key={item._id + index}
                                            className='group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-[#1c1c1c]'
                                        >
                                            <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                                                {ICONS[item.notiType]}
                                            </div>

                                            <div
                                                className='cursor-pointer'
                                                onClick={() => viewHandler(item)}
                                            >
                                                <div className='flex items-center gap-3 font-semibold text-gray-900 capitalize dark:text-gray-200'>
                                                    <p> {item.notiType} </p>
                                                    <span className='text-xs font-normal lowercase'>
                                                        {moment(item.createdAt).fromNow()}
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </PopoverPanel>
            </Transition>
        </Popover>
    </>
  )
}

export default NotificationPanel