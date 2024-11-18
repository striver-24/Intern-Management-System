import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const data = [
  // Sample notification data
  {
    _id: "65c5bbf3787832cf99f28e6d",
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c27a0e18c0a1b750ad5cad",
      "65c30b96e639681a13def0b5",
    ],
    text: "New task has been assigned to you and 2 others. The task priority is set to normal priority, so check and act accordingly. The task date is Thu Feb 29 2024. Thank you!!!",
    task: null,
    notiType: "alert",
    isRead: [],
    createdAt: "2024-02-09T05:45:23.353Z",
    updatedAt: "2024-02-09T05:45:23.353Z",
    __v: 0,
  },
  {
    _id: "65c5f12ab5204a81bde866ab",
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    text: "New task has been assigned to you and 2 others. The task priority is set to high priority, so check and act accordingly. The task date is Fri Feb 09 2024. Thank you!!!",
    task: {
      _id: "65c5f12ab5204a81bde866a9",
      title: "Test task",
    },
    notiType: "alert",
    isRead: [],
    createdAt: "2024-02-09T09:32:26.810Z",
    updatedAt: "2024-02-09T09:32:26.810Z",
    __v: 0,
  },
];

const ICONS = {
  alert: <HiBellAlert className='w-5 h-5 text-gray-600 group-hover:text-indigo-600' />,
  message: <BiSolidMessageRounded className='w-5 h-5 text-gray-600 group-hover:text-indigo-600' />,
};

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const readHandler = () => {
    // Logic to mark notifications as read
  };

  const viewHandler = (item) => {
    setSelected(item);
    // Logic to handle viewing the notification
  };

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
    <Popover className='relative'>
      <Popover.Button className='inline-flex items-center outline-none'>
        <div className='relative flex items-center justify-center w-8 h-8 text-gray-800'>
          <IoIosNotificationsOutline className='text-2xl' />
          {data.length > 0 && (
            <span className='absolute top-0 w-4 h-4 text-sm font-semibold text-center text-white bg-red-600 rounded-full right-1'>
              {data.length}
            </span>
          )}
        </div>
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
        <Popover.Panel className='absolute z-10 flex w-screen px-4 mt-5 -right-16 md:-right-2 max-w-max'>
          {({ close }) => (
            data.length > 0 && (
              <div className='flex-auto w-screen max-w-md overflow-hidden text-sm leading-6 bg-white shadow-lg rounded-3xl ring -1 ring-gray-900/5'>
                <div className='p-4'>
                  {data.slice(0, 5).map((item, index) => (
                    <div
                      key={item._id}
                      className='relative flex p-4 rounded-lg group gap-x-4 hover:bg-gray-50'
                    >
                      <div className='flex items-center justify-center w-8 h-8 mt-1 bg-gray-200 rounded-lg group-hover:bg-white'>
                        {ICONS[item.notiType]}
                      </div>

                      <div
                        className='cursor-pointer'
                        onClick={() => viewHandler(item)}
                      >
                        <div className='flex items-center gap-3 font-semibold text-gray-900 capitalize'>
                          <p>{item.notiType}</p>
                          <span className='text-xs font-normal lowercase'>
                            {moment(item.createdAt).fromNow()}
                          </span>
                        </div>
                        <p className='mt-1 text-gray-600 line-clamp-1'>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='grid grid-cols-2 divide-x bg-gray-50'>
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      onClick={item.onClick ? () => item.onClick() : close}
                      className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100'
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default NotificationPanel;