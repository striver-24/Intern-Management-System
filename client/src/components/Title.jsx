import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Title = ({ title, className, level = 2, textColor, align }) => {
  const HeadingTag = `h${level}`; // Dynamically set the heading tag

  return (
    <HeadingTag
      className={clsx(
        "font-semibold capitalize",
        textColor && `text-${textColor}`, // Conditional text color
        align && `text-${align}`, // Conditional text alignment
        className
      )}
      aria-level={level} // Accessibility improvement
    >
      {title}
    </HeadingTag>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]), // Allowable heading levels
  textColor: PropTypes.string, // Text color class (e.g., 'red-500')
  align: PropTypes.oneOf(['left', 'center', 'right']), // Text alignment
};

Title.defaultProps = {
  className: '',
  level: 2,
  textColor: undefined,
  align: 'left',
};

export default Title;