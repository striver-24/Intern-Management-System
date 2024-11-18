import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({
  icon,
  className,
  label,
  type = 'button',
  onClick = () => {},
  isLoading = false,
  variant = 'primary', // New prop for button variants
}) => {
  return (
    <button
      type={type}
      className={clsx(
        'bx-3 py-2 outline-none',
        {
          'bg-blue-500 text-white': variant === 'primary',
          'bg-gray-300 text-black': variant === 'secondary',
          'opacity-50 cursor-not-allowed': isLoading, // Styles for loading state
        },
        className
      )}
      onClick={isLoading ? null : onClick} // Prevent clicking when loading
      aria-label={label || 'Button'} // Accessibility
      disabled={isLoading} // Disable button when loading
    >
      {isLoading ? (
        <span>Loading...</span> // Loading state display
      ) : (
        <>
          <span>{label}</span>
          {icon && <span className="ml-2">{icon}</span>} {/* Add margin for icon */}
        </>
      )}
    </button>
  );
};

// PropTypes for type checking
Button.propTypes = {
  icon: PropTypes.node,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

// Default props
Button.defaultProps = {
  icon: null,
  className: '',
  type: 'button',
  onClick: () => {},
  isLoading: false,
  variant: 'primary',
};

export default Button;