import React, { useEffect } from 'react';
import { useGameControls } from '../hooks/useGameControls.js';

import { useMinesweeper, CELL_GRAPH_ACTIONS as actions } from '../hooks/useMinesweeper.js';
import { useTimer } from '../hooks/useTimer.js';
import { generateBoard, exploreArea } from '../lib/minesweeper.js';

import { Cell } from './Cell.jsx';
import { ControlPanel } from './ControlPanel.jsx';

export const GameBoard = ({ settings, gameStatus, setGame }) => {
  const { width } = settings;
  const cellGraph = generateBoard(settings);

  const [board, dispatch] = useMinesweeper(cellGraph);
  const { time, toggleTimer, resetTime } = useTimer();
  const controls = useGameControls(setGame, toggleTimer, resetTime);

  useEffect(() => {
    console.log('re-rendering');
    dispatch({ type: actions.SET, payload: { board: cellGraph } });
  }, [settings, controls.resetWatcher]);

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
    <main className='main-content'>
      <div className='game-board' style={{ gridTemplateColumns: `repeat(${width}, auto)` }}>
        {renderCells(board, dispatch)}
      </div>
      <ControlPanel settings={settings} gameStatus={gameStatus} time={time} />
    </main>
  );
};
