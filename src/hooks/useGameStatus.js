import { useState } from 'react';

export const GAME_STATUSES = {
  READY: 'ready',
  GAME_ON: 'game-on',
  GAME_OVER: 'game-over',
  GAME_WON: 'game-won'
};

export const useGameStatus = () => {
  const [gameStatus, setGameStatus] = useState(GAME_STATUSES.READY);

  const setGame = {
    ready: () => setGameStatus(GAME_STATUSES.READY),
    on: () => setGameStatus(GAME_STATUSES.GAME_ON),
    over: () => setGameStatus(GAME_STATUSES.GAME_OVER),
    won: () => setGameStatus(GAME_STATUSES.GAME_WON)
  };

  return [gameStatus, setGame];
};
