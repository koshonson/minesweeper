import React from 'react';

export const ControlPanel = ({ state, dispatch }) => {
  return (
    <div className='control-panel'>
      <label htmlFor='board-width'>Board width:</label>
      <input
        type='number'
        name='board-width'
        value={state.width}
        onChange={e => dispatch({ type: 'set-width', payload: e.target.value })}
      />
      <label htmlFor='board-height'>Board height:</label>
      <input
        type='number'
        name='board-height'
        value={state.height}
        onChange={e => dispatch({ type: 'set-height', payload: e.target.value })}
      />
    </div>
  );
};
