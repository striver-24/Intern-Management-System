import React from 'react';
import PropTypes from 'prop-types';
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { useSelector } from 'react-redux';
import { PRIORITYSTYLES, TASK_TYPE, formatDate } from '../utils';
import TaskDialog from './task/TaskDialog';
import clsx from 'clsx';
import { BiMessageAltDetail } from 'react-icons/bi';
import { FaList } from 'react-icons/fa';
import { BGS } from '../utils';
import UserInfo from './User Info';
import { IoMdAdd } from 'react-icons/io';

const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
};

const TaskStats = ({ activities, attachments, subTasks }) => (
    <div className='flex items-center gap-3'>
        <StatItem icon={<BiMessageAltDetail />} count={activities.length} />
        <StatItem icon={<MdAttachFile />} count={attachments.length} />
        <StatItem icon={<FaList />} count={`${0}/${subTasks.length}`} />
    </div>
);

const StatItem = ({ icon, count }) => (
    <div className='flex items-center gap-1 text-sm text-gray-600'>
        {icon}
        <span>{count}</span>
    </div>
);

const SubTaskInfo = ({ subTask }) => (
    <div className='py-4 border-t border-gray-200'>
        {subTask ? (
            <>
                <h5 className='text-base text-black line-clamp-1'>{subTask.title}</h5>
                <div className='p-4 space-x-8'>
                    <span className='text-sm text-gray-600'>{formatDate(new Date(subTask.date))}</span>
                    <span className='px-3 py-1 font-medium text-red-500 rounded-full bg-blue-600/10'>{subTask.tag}</span>
                </div>
            </>
        ) : (
            <span className='text-gray-500'>No Sub Task</span>
        )}
    </div>
);

const TaskCard = ({ task }) => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className='w-full p-4 bg-white rounded shadow-md h-fit'>
            <div className='flex justify-between w-full'>
                <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium", PRIORITYSTYLES[task?.priority])}>
                    <span className='text-lg'>{ICONS[task?.priority]}</span>
                    <span className='uppercase'>{task?.priority} Priority</span>
                </div>
                {user?.isAdmin && <TaskDialog task={task} />}
            </div>

            <div className='flex items-center gap-2'>
                <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
                <h4 className='text-black line-clamp-1'>{task?.title}</h4>
            </div>
            <span className='text-sm text-gray-600'>{formatDate(new Date(task?.date))}</span>

            <div className='w-full my-2 border-t border-gray-200' />
            <div className='flex items-center justify-between mb-2'>
                <TaskStats activities={task.activities} attachments={task.attachments} subTasks={task.subTasks} />
                <div className='flex flex-row-reverse'>
                    {task?.team?.map((member, index) => (
                        <div key={index} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS.length])}>
                            <User Info user={member} />
                        </div>
                    ))}
                </div>
            </div>

            <SubTaskInfo subTask={task?.subTasks?.[0]} />

            <div className='w-full pb-2'>
                <button 
                    disabled={!user.isAdmin} 
                    className='flex items-center w-full gap-4 text-sm font-semibold text-gray-500 disabled:cursor-not-allowed disabled:text-gray-300'
                >
                    <IoMdAdd className='text-lg' />
                    <span>ADD SUBTASK</span>
                </button>
            </div>
        </div>
    );
};

TaskCard.propTypes = {
    task: PropTypes.shape({
        title: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        activities: PropTypes.array,
        attachments: PropTypes.array,
        subTasks: PropTypes.array,
        team: PropTypes.array,
        stage: PropTypes.string,
    }).isRequired,
};

export default TaskCard;