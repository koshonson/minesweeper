import React from 'react';

import { GAME_STATUSES as game } from '../hooks/useGameStatus';

export const Cell = props => {
  const {
    id,
    explored,
    flagged,
    dispatch,
    isBomb,
    neighborBombs,
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

  const cellStyle = ({ explored, flagged, isBomb }) => {
    if (flagged) return { backgroundColor: 'rgba(80, 80, 170, 0.6)' };
    if (explored && !isBomb) return { backgroundColor: 'rgba(0,0,0,0.25)' };
    if (explored && isBomb) return { backgroundColor: 'red' };
    return { backgroundColor: 'dodgerblue' };
  };

  return (
    <div
      className='cell'
      onContextMenu={flagCell}
      onClick={exploreCell}
      style={cellStyle({ explored, flagged, isBomb })}
    >
      {explored && !isBomb && neighborBombs ? neighborBombs : ''}
    </div>
  );
};
