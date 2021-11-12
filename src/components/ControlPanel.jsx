import '../styles/settings.css';
import React from 'react';
import { SETTINGS_ACTIONS as actions } from '../hooks/useSettings';

export const ControlPanel = props => {
  const { settings, dispatchSettings, gameStatus, time, controls, explored } = props;
  const { height, width, numMines } = settings;
  const explorable = height * width - numMines;

  return (
    <div className={`control-panel${gameStatus === 'game-on' ? ' cp-collapsed' : ''}`}>
      <h1>MineSweeper</h1>
      {gameStatus !== 'game-on' && (
        <div className='settings-controls'>
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
      )}
      <div className='game-display' style={{ height: `calc(32px * ${height})` }}>
        <div className='timer'>{explored + '/' + explorable}</div>
        <div className='timer'>{time}</div>
        <div className='timer'>{gameStatus}</div>
        <button onClick={controls.resetGame}>RESET GAME</button>
      </div>
    </div>
  );
};
