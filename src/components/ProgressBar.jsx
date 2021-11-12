import React from 'react';

import { GAME_STATUSES as status } from '../hooks/useGameStatus';

export const ProgressBar = ({ explorable, explored, gameStatus }) => {
  const barColor = gameStatus => {
    switch (gameStatus) {
      case status.READY:
        return 'grey-bar';
      case status.GAME_OVER:
        return 'red-bar';
      case status.GAME_WON:
        return 'green-bar';
      default:
        return 'blue-bar';
    }
  };

  return (
    <div className='progress-bar'>
      <progress className={barColor(gameStatus)} max={explorable} value={explored}>
        {explored}/{explorable}
      </progress>
    </div>
  );
};
