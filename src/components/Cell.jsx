import React from 'react';

import { GAME_STATUSES as game } from '../hooks/useGameStatus';
import { CELL_GRAPH_ACTIONS as actions } from '../hooks/useMinesweeper';

export const Cell = props => {
  const {
    id,
    explored,
    flagged,
    dispatch,
    isBomb,
    neighborBombs,
    exploreArea,
    explodeBombs,
    gameStatus,
    controls
  } = props;

  const flagCell = e => {
    e.preventDefault();
    if (gameStatus === game.GAME_OVER || gameStatus === game.GAME_WON) return;
    if (explored) return;
    dispatch({ type: actions.FLAG, payload: { id } });
  };

  const explodeCell = (id, delay = 750) => {
    dispatch({ type: actions.EXPLORE, payload: { id } });
    const explodeRest = () => {
      const allBombs = explodeBombs(id);
      dispatch({ type: actions.EXPLORE_AREA, payload: { ids: allBombs } });
    };
    setTimeout(explodeRest, delay);
    return controls.gameOver();
  };

  const exploreCell = e => {
    e.preventDefault();
    if (gameStatus === game.GAME_OVER || gameStatus === game.GAME_WON) return;
    if (gameStatus === game.READY) controls.startGame();
    if (explored || flagged) return;
    if (isBomb) return explodeCell(id);
    const toBeExplored = exploreArea(props);
    dispatch({ type: actions.EXPLORE_AREA, payload: { ids: toBeExplored } });
  };

  const cellStyle = ({ explored, flagged, isBomb }) => {
    if (flagged && !explored) return { backgroundColor: 'rgba(80, 80, 170, 0.6)' };
    if (explored && !isBomb) return { backgroundColor: 'rgba(0,0,0,0.25)' };
    if (gameStatus === game.GAME_OVER) {
      if ((explored && isBomb) || (flagged && isBomb)) return { backgroundColor: 'red' };
    } else {
      if ((explored && isBomb) || (flagged && isBomb)) return { backgroundColor: '' };
    }
    return { backgroundColor: 'dodgerblue' };
  };

  const animateCellsOnWin = () => {
    return gameStatus === game.GAME_WON && isBomb ? ' bomb-won' : '';
  };

  return (
    <div
      className={`cell${animateCellsOnWin()}`}
      onContextMenu={flagCell}
      onClick={exploreCell}
      style={cellStyle({ explored, flagged, isBomb })}
    >
      {explored && !isBomb && neighborBombs ? neighborBombs : ''}
    </div>
  );
};
