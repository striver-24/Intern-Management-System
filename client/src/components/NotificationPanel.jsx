import React from 'react';
import { Popover, PopoverButton, Transition } from "@headlessui/react";
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
        </Popover>
    </>
  )
}

export default NotificationPanel