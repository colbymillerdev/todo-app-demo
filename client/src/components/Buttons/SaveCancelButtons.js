import React from 'react';
import { FiSave } from 'react-icons/fi';
import { TiCancel } from 'react-icons/ti';

const SaveCancelButtons = ({ onCancelClick, onSaveClick }) => {
  return (
    <div className='ml-auto'>
      <button className='mr-2 align-middle'>
        <FiSave onClick={onSaveClick} />
      </button>
      <button className='align-middle' onClick={onCancelClick}>
        <TiCancel />
      </button>
    </div>
  );
};

export default SaveCancelButtons;
