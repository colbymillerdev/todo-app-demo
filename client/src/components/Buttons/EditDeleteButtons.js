import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

const EditButton = ({ onEditClick, onDeleteClick }) => {
  return (
    <div className='ml-auto'>
      <button className='align-middle mr-2' onClick={onEditClick}>
        <FiEdit2 />
      </button>
      <button className='align-middle' onClick={onDeleteClick}>
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default EditButton;
