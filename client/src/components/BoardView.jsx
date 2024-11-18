import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import TaskCard from './TaskCard';

const BoardView = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return <div className="w-full py-4 text-center">No tasks available.</div>;
  }

  return (
    <div className='grid w-full grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 2xl:gap-10'>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} /> 
      ))}
    </div>
  );
};

// PropTypes for type checking
BoardView.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Assuming each task has a unique 'id'
      // Add other task properties here as needed
    })
  ).isRequired,
};

export default BoardView;