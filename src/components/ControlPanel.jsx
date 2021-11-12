import '../styles/controls.css';
import logo from '../assets/minesweeper.svg';
import React from 'react';

import { SETTINGS_ACTIONS as actions } from '../hooks/useSettings';
import { GAME_STATUSES as status } from '../hooks/useGameStatus';
import { Timer } from './Timer.jsx';
import { ProgressBar } from './ProgressBar';
import { StatusDisplay } from './StatusDisplay';

export const ControlPanel = props => {
  const { settings, dispatchSettings, gameStatus, time, controls, explored } = props;
  const { height, width, numMines } = settings;
  const explorable = height * width - numMines;

  const renderSettings = () => {
    return (
      gameStatus === status.READY && (
        <div className='settings'>
          <button className='start-button' onClick={controls.startGame}>
            START
          </button>
          <div className='settings-inputs'>
            <label htmlFor='board-width'>Board width:</label>
            <input
              className='settings-input'
              type='number'
              name='board-width'
              value={settings.width}
              onChange={e => dispatchSettings({ type: actions.SET_WIDTH, payload: e.target.value })}
            />
            <label htmlFor='board-height'>Board height:</label>
            <input
              className='settings-input'
              type='number'
              name='board-height'
              value={settings.height}
              onChange={e =>
                dispatchSettings({ type: actions.SET_HEIGHT, payload: e.target.value })
              }
            />
            <label htmlFor='board-height'>Number of mines:</label>
            <input
              className='settings-input'
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
      (gameStatus === status.GAME_OVER || gameStatus === status.GAME_WON) && (
        <StatusDisplay gameStatus={gameStatus} />
      )
    );
  };

  const renderControls = () => {
    return (
      gameStatus !== status.READY && (
        <div className='controls'>
          <Timer time={time} />
          <ProgressBar explorable={explorable} explored={explored} gameStatus={gameStatus} />
          {renderStatus(gameStatus)}
          <button
            className='reset-button'
            onClick={controls.resetGame}
            style={gameStatus === status.GAME_ON ? { paddingLeft: '2px' } : {}}
          >
            {gameStatus === status.GAME_WON || gameStatus === status.GAME_OVER
              ? 'NEW GAME'
              : 'RESET'}
          </button>
        </div>
      )
    );
  };

  return (
    <div className={`control-panel${gameStatus !== 'ready' ? ' cp-collapsed' : ''}`}>
      <div className='logo-box'>
        <img src={logo} width='40' height='40' />
        <h1>MineSweeper</h1>
      </div>
      {renderSettings()}
      {renderControls()}
    </div>
  );
};
