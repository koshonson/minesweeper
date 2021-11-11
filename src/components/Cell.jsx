import React from 'react';

import { GAME_STATUSES as game } from '../hooks/useGameStatus';

export const Cell = props => {
  const {
    id,
    explored,
    flagged,
    dispatch,
    neighborBombs,
    isBomb,
    exploreArea,
    gameStatus,
    controls
  } = props;

  const flagCell = e => {
    e.preventDefault();
    if (gameStatus === game.GAME_OVER || gameStatus === game.GAME_WON) return;
    if (explored) return;
    dispatch({ type: 'flag', payload: { id } });
  };

  const exploreCell = e => {
    e.preventDefault();
    if (gameStatus === game.GAME_OVER || gameStatus === game.GAME_WON) return;
    if (gameStatus === game.READY) controls.startGame();
    if (explored || flagged) return;
    if (isBomb) {
      dispatch({ type: 'explore', payload: { id } });
      return controls.gameOver();
    }
    const toBeExplored = exploreArea(props);
    dispatch({ type: 'explore-area', payload: { ids: toBeExplored } });
  };

  return (
    <div
      className='cell'
      onContextMenu={flagCell}
      onClick={exploreCell}
      style={{
        backgroundColor: flagged
          ? 'blue'
          : explored
          ? 'rgba(150, 150, 150, 0.5)'
          : isBomb
          ? 'orange'
          : 'dodgerblue'
      }}
    >
      {explored ? (isBomb ? 'X' : neighborBombs ? neighborBombs : '') : ''}
    </div>
  );
};
