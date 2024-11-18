import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import { FaBug, FaTasks, FaThumbsUp, FaUser  } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { tasks } from "../assets/data";
import Tabs from "../components/Tabs";
import { PRIORITYSTYLES, TASK_TYPE, getInitials } from "../utils";
import Loading from "../components/Loader";
import Button from "../components/Button";

const assets = [
  "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

const TASKTYPEICON = {
  commented: (
    <div className='flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-full'>
      <MdOutlineMessage />
    </div>
  ),
  started: (
    <div className='flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full'>
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className='flex items-center justify-center w-6 h-6 text-white bg-gray-500 rounded-full'>
      <FaUser  size={14} />
    </div>
  ),
  bug: (
    <div className='text-red-600'>
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className='flex items-center justify-center w-10 h-10 text-white bg-green-600 rounded-full'>
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className='flex items-center justify-center w-8 h-8 text-white rounded-full bg-violet-600'>
      <GrInProgress size={16} />
    </div>
  ),
};

const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

const TaskDetails = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState(0);
  const task = tasks[3]; // This should ideally come from a data fetch based on the id

  return (
    <div className='flex flex-col w-full gap-3 overflow-y-hidden mb- 4'>
      <h1 className='text-2xl font-bold text-gray-600'>{task?.title}</h1>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <>
            <div className='flex flex-col w-full gap-5 p-8 overflow-y-auto bg-white shadow-md md:flex-row 2xl:gap-8'>
              {/* LEFT */}
              <div className='w-full space-y-8 md:w-1/2'>
                <div className='flex items-center gap-5'>
                  <div
                    className={clsx(
                      "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                      PRIORITYSTYLES[task?.priority],
                      bgColor[task?.priority]
                    )}
                  >
                    <span className='text-lg'>{ICONS[task?.priority]}</span>
                    <span className='uppercase'>{task?.priority} Priority</span>
                  </div>

                  <div className={clsx("flex items-center gap-2")}>
                    <div
                      className={clsx(
                        "w-4 h-4 rounded-full",
                        TASK_TYPE[task.stage]
                      )}
                    />
                    <span className='text-black uppercase'>{task?.stage}</span>
                  </div>
                </div>

                <p className='text-gray-500'>
                  Created At: {new Date(task?.date).toDateString()}
                </p>

                <div className='flex items-center gap-8 p-4 border-gray-200 border-y'>
                  <div className='space-x-2'>
                    <span className='font-semibold'>Assets :</span>
                    <span>{task?.assets?.length}</span>
                  </div>

                  <span className='text-gray-400'>|</span>

                  <div className='space-x-2'>
                    <span className='font-semibold'>Sub-Task :</span>
                    <span>{task?.subTasks?.length}</span>
                  </div>
                </div>

                <div className='py-6 space-y-4'>
                  <p className='font-semibold text-gray-600 test-sm'>
                    TASK TEAM
                  </p>
                  <div className='space-y-3'>
                    {task?.team?.map((m, index) => (
                      <div
                        key={index}
                        className='flex items-center gap-4 py-2 border-t border-gray-200'
                      >
                        <div
                          className={
                            "w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600"
                          }
                        >
                          <span className='text-center'>
                            {getInitials(m?.name)}
                          </span>
                        </div>

                        <div>
                          <p className='text-lg font-semibold'>{m?.name}</p>
                          <span className='text-gray-500'>{m?.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='py-6 space-y-4'>
                  <p className='text-sm font-semibold text-gray-500'>
                    SUB-TASKS
                  </p>
                  <div className='space-y-8'>
                    {task?.subTasks?.map((el, index) => (
                      <div key={index} className='flex gap-3'>
                        <div className='flex items-center justify-center w-10 h-10 rounded-full bg-violet-50-200'>
                          <MdTaskAlt className='text-violet-600' size={26} />
                        </div>

                        <div className='space-y-1'>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm text-gray-500'>
                              {new Date(el?.date).toDateString()}
                            </span>

                            <span className='px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold'>
                              {el?.tag}
                            </span>
                          </div>

                          <p className='text-gray-700'>{el?.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* RIGHT */}
              <div className='w-full space-y-8 md:w-1/2'>
                <p className='text-lg font-semibold'>ASSETS</p>

                <div className='grid w-full grid-cols-2 gap-4'>
                  {task?.assets?.map((el, index) => (
 <img
                      key={index}
                      src={el}
                      alt={task?.title}
                      className='w-full transition-all duration-700 rounded cursor-pointer h-28 md:h-36 2xl:h-52 hover:scale-125 hover:z-50'
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Activities activity={task?.activities} id={id} />
          </>
        )}
      </Tabs>
    </div>
  );
};

const Activities = ({ activity, id }) => {
  const [selected, setSelected] = useState(act_types[0]);
  const [text, setText] = useState("");
  const isLoading = false;

  const handleSubmit = async () => {
    // Implement the submit logic for adding an activity
  };

  const Card = ({ item }) => {
    return (
      <div className='flex space-x-4'>
        <div className='flex flex-col items-center flex-shrink-0'>
          <div className='flex items-center justify-center w-10 h-10'>
            {TASKTYPEICON[item?.type]}
          </div>
          <div className='flex items-center w-full'>
            <div className='w-0.5 bg-gray-300 h-full'></div>
          </div>
        </div>

        <div className='flex flex-col mb-8 gap-y-1'>
          <p className='font-semibold'>{item?.by?.name}</p>
          <div className='space-y-2 text-gray-500'>
            <span className='capitalize'>{item?.type}</span>
            <span className='text-sm'>{moment(item?.date).fromNow()}</span>
          </div>
          <div className='text-gray-700'>{item?.activity}</div>
        </div>
      </div>
    );
  };

  return (
    <div className='flex justify-between w-full min-h-screen gap-10 px-10 py-8 overflow-y-auto bg-white rounded-md shadow 2xl:gap-20'>
      <div className='w-full md:w-1/2'>
        <h4 className='mb-5 text-lg font-semibold text-gray-600'>Activities</h4>

        <div className='w-full'>
          {activity?.map((el, index) => (
            <Card
              key={index}
              item={el}
              isConnected={index < activity.length - 1}
            />
          ))}
        </div>
      </div>

      <div className='w-full md:w-1/3'>
        <h4 className='mb-5 text-lg font-semibold text-gray-600'>
          Add Activity
        </h4>
        <div className='flex flex-wrap w-full gap-5'>
          {act_types.map((item) => (
            <div key={item} className='flex items-center gap-2'>
              <input
                type='checkbox'
                className='w-4 h-4'
                checked={selected === item}
                onChange={() => setSelected(item)}
              />
              <p>{item}</p>
            </div>
          ))}
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Type your activity here...'
            className='w-full p-4 mt-10 bg-white border border-gray-300 rounded-md outline-none focus:ring-2 ring-blue-500'
          ></textarea>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              type='button'
              label='Submit'
              onClick={handleSubmit}
              className='text-white bg-blue-600 rounded'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;