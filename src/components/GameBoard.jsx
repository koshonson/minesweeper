import React, { useEffect } from 'react';

import { generateBoard, exploreArea } from '../lib/minesweeper.js';
import { useMinesweeper, CELL_GRAPH_ACTIONS as actions } from '../hooks/useMinesweeper.js';

import { Cell } from './Cell.jsx';

export const GameBoard = ({ settings, gameStatus, controls, explored, setExplored }) => {
  const { width } = settings;
  const cellGraph = generateBoard(settings);

  const [board, dispatch] = useMinesweeper(cellGraph);

  useEffect(() => {
    console.log('re-rendering');
    dispatch({ type: actions.SET, payload: { board: cellGraph } });
  }, [settings, controls.resetWatcher]);

  useEffect(() => {
    setExplored(board.filter(c => c.explored).length);
    const explorable = board.length - settings.numMines;
    if (explorable === explored && gameStatus === 'game-on') {
      controls.gameWon();
    }
  }, [board, explored]);

  const renderCells = (board, dispatch) => {
    if (!board) return;
    const explore = exploreArea(board);

    return board.map(cell => {
      cell.dispatch = dispatch;
      cell.exploreArea = explore;
      cell.gameStatus = gameStatus;
      cell.controls = controls;
      return <Cell key={cell.id} {...cell} />;
    });
  };

  return (
    <main className={`main-content${gameStatus !== 'ready' ? ' mc-expanded' : ''}`}>
      <div className='game-board' style={{ gridTemplateColumns: `repeat(${width}, auto)` }}>
        {renderCells(board, dispatch)}
      </div>
    </main>
  );
};
