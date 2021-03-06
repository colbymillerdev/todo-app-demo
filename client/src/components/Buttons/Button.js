import React from 'react';

const Button = ({ buttonTitle, onClick, disabled }) => {
  return (
    <>
      <button
        className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
        onClick={onClick}
        disabled={disabled}
        style={disabled ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
      >
        {buttonTitle}
      </button>
    </>
  );
};

export default Button;
