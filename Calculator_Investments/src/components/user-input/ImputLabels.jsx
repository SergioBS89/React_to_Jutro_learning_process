import React from 'react';

function InputLabels({ title, initialValue, onChange }) {
  return (
    <div className='input-group'>
      <label>{title}</label>
      <input type="number" defaultValue={initialValue} onChange={onChange} />
    </div>
  );
}

export default InputLabels;