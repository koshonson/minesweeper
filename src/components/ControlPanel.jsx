import React from 'react';

export const ControlPanel = ({ settings, gameStatus, time }) => {
  const { height } = settings;

  return (
    <div className='game-display' style={{ height: `calc(32px * ${height})` }}>
      <div className='timer'>{time}</div>
      <div className='timer'>{gameStatus}</div>
    </div>
  );
};
