import React from 'react';
import { FiEdit2 } from 'react-icons/fi';

const EditButton = ({ onClick }) => {
  return (
    <div className='ml-auto'>
      <button className='align-middle' onClick={onClick}>
        <FiEdit2 />
      </button>
    </div>
  );
};

export default EditButton;
