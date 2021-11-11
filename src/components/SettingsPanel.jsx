import React from 'react';
import { SETTINGS_ACTIONS as actions } from '../hooks/useSettings';

export const SettingsPanel = ({ settings, dispatchSettings }) => {
  return (
    <div className='control-panel'>
      <label htmlFor='board-width'>Board width:</label>
      <input
        type='number'
        name='board-width'
        value={settings.width}
        onChange={e => dispatchSettings({ type: actions.SET_WIDTH, payload: e.target.value })}
      />
      <label htmlFor='board-height'>Board height:</label>
      <input
        type='number'
        name='board-height'
        value={settings.height}
        onChange={e => dispatchSettings({ type: actions.SET_HEIGHT, payload: e.target.value })}
      />
      <label htmlFor='board-height'>Number of mines:</label>
      <input
        type='number'
        name='num-mines'
        value={settings.numMines}
        onChange={e => dispatchSettings({ type: actions.SET_MINES, payload: e.target.value })}
      />
    </div>
  );
};
