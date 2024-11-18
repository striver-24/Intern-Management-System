import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IoMdAdd } from 'react-icons/io';

const TaskTitle = ({ label, className, onAddClick }) => {
  return (
    <div className='flex items-center justify-between w-full h-10 px-2 transition-shadow duration-200 bg-white rounded shadow-sm md:h-12 md:px-4 hover:shadow-md'>
      <div className='flex items-center gap-2'>
        <div className={clsx("w-4 h-4 rounded-full", className)} />
        <p className='text-sm text-gray-600 md:text-base'>{label}</p>
      </div>

      <button 
        onClick={onAddClick} 
        className='hidden text-black transition-colors duration-200 md:block hover:text-orange-600'
        aria-label={`Add a subtask to ${label}`}
      >
        <IoMdAdd className='text-lg' />
      </button>
    </div>
  );
};

TaskTitle.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onAddClick: PropTypes.func,
};

TaskTitle.defaultProps = {
  className: '',
  onAddClick: () => {},
};

export default TaskTitle;