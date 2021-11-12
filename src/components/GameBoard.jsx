import '../styles/board.css';
import React, { useEffect } from 'react';

import { generateBoard, exploreArea, explodeBombs } from '../lib/minesweeper.js';
import { useMinesweeper, CELL_GRAPH_ACTIONS as actions } from '../hooks/useMinesweeper.js';
import { GAME_STATUSES as status } from '../hooks/useStatus.js';

import { Cell } from './Cell.jsx';

export const GameBoard = ({ settings, gameStatus, controls, explored, setExplored }) => {
  const { width } = settings;
  const cellGraph = generateBoard(settings);

  const [board, dispatch] = useMinesweeper(cellGraph);

  const showBombs = () => {
    const allBombs = explodeBombs(board)();
    dispatch({ type: actions.EXPLORE_AREA, payload: { ids: allBombs } });
  };

  useEffect(() => {
    console.log('re-rendering');
    dispatch({ type: actions.SET, payload: { board: cellGraph } });
  }, [settings, controls.resetWatcher]);

  useEffect(() => {
    setExplored(board.filter(c => c.explored && !c.isBomb).length);
    const explorable = board.length - settings.numMines;
    if (explorable === explored && gameStatus === status.GAME_ON) {
      controls.gameWon();
      setTimeout(showBombs, 750);
    }
  }, [board, explored]);

  const renderCells = (board, dispatch) => {
    if (!board) return;
    const explore = exploreArea(board);
    const explode = explodeBombs(board);

    return board.map(cell => {
      cell.dispatch = dispatch;
      cell.exploreArea = explore;
      cell.explodeBombs = explode;
      cell.gameStatus = gameStatus;
      cell.controls = controls;
      return <Cell key={cell.id} {...cell} />;
    });
  };

  return (
    <main className={`main-content${gameStatus !== status.READY ? ' mc-expanded' : ''}`}>
      <div className='game-board' style={{ gridTemplateColumns: `repeat(${width}, auto)` }}>
        {renderCells(board, dispatch)}
      </div>
    </main>
  );
};
