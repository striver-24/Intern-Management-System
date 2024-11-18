import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Textbox = React.forwardRef(({
    type = 'text',
    placeholder,
    label,
    className,
    register,
    name,
    error,
    size = 'medium', // New prop for size
}, ref) => {
    const sizeClasses = {
        small: 'px-2 py-1 text-sm',
        medium: 'px-3 py-2.5 text-base',
        large: 'px-4 py-3 text-lg',
    };

    return (
        <div className='flex flex-col w-full gap-1'>
            {label && (
                <label htmlFor={name} className='text-slate-800'>
                    {label}
                </label>
            )}

            <div>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    ref={ref}
                    {...register}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${name}-error` : undefined} // Link error message
                    className={clsx(
                        "pg-transparent border border-gray-300 placeholder-gray-400 text-gray-900 outline-none focus:ring-2 ring-orange-500",
                        sizeClasses[size], // Apply size classes
                        className
                    )}
                />
            </div>
            {error && (
                <span id={`${name}-error`} className='text-xs text-[#f64949fe] mt-0.5'>
                    {error}
                </span>
            )}
        </div>
    );
});

Textbox.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    register: PropTypes.object,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']), // New prop type for size
};

export default Textbox;