import React from 'react';

export const ControlPanel = ({ settings, dispatchSettings }) => {
  return (
    <div className='control-panel'>
      <label htmlFor='board-width'>Board width:</label>
      <input
        type='number'
        name='board-width'
        value={settings.width}
        onChange={e => dispatchSettings({ type: 'set-width', payload: e.target.value })}
      />
      <label htmlFor='board-height'>Board height:</label>
      <input
        type='number'
        name='board-height'
        value={settings.height}
        onChange={e => dispatchSettings({ type: 'set-height', payload: e.target.value })}
      />
      <label htmlFor='board-height'>Number of mines:</label>
      <input
        type='number'
        name='num-mines'
        value={settings.numMines}
        onChange={e => dispatchSettings({ type: 'set-mines', payload: e.target.value })}
      />
    </div>
  );
};
