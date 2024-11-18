import React from 'react';
import PropTypes from 'prop-types';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const Chart = ({ data, title, barColor = '#8884d8', height = 500, isLoading = false }) => {
  if (isLoading) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  if (!data || data.length === 0) {
    return <div>No data available.</div>; // Placeholder for no data
  }

  return (
    <div>
      {title && <h3 className="mb-4 text-center">{title}</h3>} {/* Optional title */}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray='3 3' />
          <Bar dataKey="total" fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// PropTypes for type checking
Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
  barColor: PropTypes.string,
  height: PropTypes.number,
  isLoading: PropTypes.bool,
};

// Default props
Chart.defaultProps = {
  title: '',
  barColor: '#8884d8',
  height: 500,
  isLoading: false,
};

export default Chart;