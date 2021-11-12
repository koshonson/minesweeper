import '../styles/controls.css';
import React from 'react';

import { SETTINGS_ACTIONS as actions } from '../hooks/useSettings';
import { Timer } from './Timer.jsx';
import { ProgressBar } from './ProgressBar';
import { StatusDisplay } from './StatusDisplay';

export const ControlPanel = props => {
  const { settings, dispatchSettings, gameStatus, time, controls, explored } = props;
  const { height, width, numMines } = settings;
  const explorable = height * width - numMines;

  const renderSettings = () => {
    return (
      gameStatus === 'ready' && (
        <div className='settings'>
          <button className='start-button' onClick={controls.startGame}>
            START
          </button>
          <div className='settings-inputs'>
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
              onChange={e =>
                dispatchSettings({ type: actions.SET_HEIGHT, payload: e.target.value })
              }
            />
            <label htmlFor='board-height'>Number of mines:</label>
            <input
              type='number'
              name='num-mines'
              value={settings.numMines}
              onChange={e => dispatchSettings({ type: actions.SET_MINES, payload: e.target.value })}
            />
          </div>
        </div>
      )
    );
  };

  const renderStatus = () => {
    return (
      (gameStatus === 'game-over' || gameStatus === 'game-won') && (
        <StatusDisplay gameStatus={gameStatus} />
      )
    );
  };

  const renderControls = () => {
    return (
      gameStatus !== 'ready' && (
        <div className='controls'>
          <Timer time={time} />
          <ProgressBar explorable={explorable} explored={explored} gameStatus={gameStatus} />
          {renderStatus(gameStatus)}
          <button className='reset-button' onClick={controls.resetGame}>
            {gameStatus === 'game-won' || gameStatus === 'game-over' ? 'NEW GAME' : 'RESET'}
          </button>
        </div>
      )
    );
  };

  return (
    <div className={`control-panel${gameStatus !== 'ready' ? ' cp-collapsed' : ''}`}>
      <h1>MineSweeper</h1>
      {renderSettings()}
      {renderControls()}
    </div>
  );
};
