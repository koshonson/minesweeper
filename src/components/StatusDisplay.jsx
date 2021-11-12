import React from 'react';

import { GAME_STATUSES as status } from '../hooks/useGameStatus';

export const StatusDisplay = ({ gameStatus }) => {
  const renderStatus = gameStatus => {
    switch (gameStatus) {
      case status.GAME_OVER:
        return 'GAME OVER!';
      case status.GAME_WON:
        return 'You Won!';
      default:
        return '';
    }
  };

  return <div className='status'>{renderStatus(gameStatus)}</div>;
};
