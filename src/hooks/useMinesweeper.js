import { useReducer } from 'react';

export const CELL_GRAPH_ACTIONS = {
  SET: 'set',
  EXPLORE: 'explore',
  EXPLORE_AREA: 'explore-area',
  FLAG: 'flag'
};

const cellGraphReducer = (state, { type, payload }) => {
  switch (type) {
    case CELL_GRAPH_ACTIONS.SET:
      return payload.board;
    case CELL_GRAPH_ACTIONS.EXPLORE:
      return state.map(cell => {
        return cell.id === payload.id ? { ...cell, explored: true } : cell;
      });
    case CELL_GRAPH_ACTIONS.EXPLORE_AREA:
      return state.map(cell => {
        return payload.ids.includes(cell.id) ? { ...cell, explored: true } : cell;
      });
    case CELL_GRAPH_ACTIONS.FLAG:
      return state.map(cell => {
        return cell.id === payload.id ? { ...cell, flagged: !cell.flagged } : cell;
      });
    default:
      return console.warn(`Action type ${type} not supported on cellGraphReducer`);
  }
};

export const useMinesweeper = board => {
  return useReducer(cellGraphReducer, board);
};
