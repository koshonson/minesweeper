import React from 'react';

export const ControlPanel = ({ settings, gameStatus, time, controls, explored }) => {
  const { height, width, numMines } = settings;
  const explorable = height * width - numMines;

  return (
    <div className='game-display' style={{ height: `calc(32px * ${height})` }}>
      <div className='timer'>{explored + '/' + explorable}</div>
      <div className='timer'>{time}</div>
      <div className='timer'>{gameStatus}</div>
      <button onClick={controls.resetGame}>RESET GAME</button>
    </div>
  );
};
