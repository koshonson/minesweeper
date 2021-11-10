import React, { useEffect, useReducer } from 'react';
import {
  cellGraphReducer,
  generateBoard,
  CELL_GRAPH_ACTIONS as actions
} from '../utils/minesweeper.js';
import { Cell } from './Cell.jsx';

export const GameBoard = ({ settings }) => {
  const { width, height } = settings;
  const cellGraph = generateBoard(settings);

  const [board, dispatch] = useReducer(cellGraphReducer, cellGraph);

  useEffect(() => {
    console.log('re-rendering');
    dispatch({ type: actions.SET, payload: { board: cellGraph } });
  }, [settings]);

  const renderCells = (board, dispatch) => {
    if (!board) return;
    return board.map(cell => {
      cell.dispatch = dispatch;
      return <Cell key={cell.id} {...cell} />;
    });
  };

  return (
    <main className='main-content'>
      <div className='game-board' style={{ gridTemplateColumns: `repeat(${width}, auto)` }}>
        {renderCells(board, dispatch)}
      </div>
      <div className='game-display' style={{ height: `calc(32px * ${height})` }}></div>
    </main>
  );
};
