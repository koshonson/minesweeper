import { useReducer } from 'react';

const randomIndexes = (length, number) => {
  const idxs = [];
  while (idxs.length <= number) {
    const idx = Math.floor(Math.random() * length);
    if (idxs.indexOf(idx) === -1) idxs.push(idx);
  }
  return idxs;
};

const generateMineGrid = ({ width, height, numMines }) => {
  const length = width * height;
  const mineIndexes = randomIndexes(length, numMines);

  let idx = 0;
  let row = 0;
  let column = 0;

  const grid = [];

  while (idx < length) {
    const isBomb = mineIndexes.includes(idx);
    const cell = { id: idx, explored: false, flagged: false, row, column, isBomb };

    grid[row] = grid[row] || [];
    grid[row][column] = cell;

    if (++column === width) {
      column = 0;
      row++;
    }
    idx++;
  }

  return grid;
};

const gridDimensions = grid => {
  const height = grid.length;
  const width = grid[0].length;
  return { width, height };
};

const gridIterator = function* (grid) {
  const { width, height } = gridDimensions(grid);

  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      yield grid[row][column];
    }
  }
};

const cellNeighbors = cell => {
  const { top, left, right, bottom } = neigborIdxs(cell);
  const { row, column } = cell;

  return {
    tl: [top, left],
    t: [top, column],
    tr: [top, right],
    r: [row, right],
    br: [bottom, right],
    b: [bottom, column],
    bl: [bottom, left],
    l: [row, left]
  };
};

const neigborIdxs = ({ row, column }) => {
  const left = column - 1;
  const right = column + 1;
  const top = row - 1;
  const bottom = row + 1;
  return { top, right, bottom, left };
};

const bindNeigborReferences = (cell, grid) => {
  const neighbors = cellNeighbors(cell);
  let neighborBombs = 0;
  for (let [key, value] of Object.entries(neighbors)) {
    const [row, column] = value;
    const neighbor = grid[row] && grid[row][column] ? grid[row][column] : null;
    if (neighbor?.isBomb) neighborBombs++;
    neighbors[key] = neighbor;
  }
  return { ...cell, neighborBombs, neighbors };
};

const buildGraph = grid => {
  const graph = [];
  const iterableGrid = gridIterator(grid);
  for (let cell of iterableGrid) {
    graph.push(bindNeigborReferences(cell, grid));
  }
  return graph;
};

export const generateBoard = config => {
  const grid = generateMineGrid(config);
  return buildGraph(grid);
};

export const CELL_GRAPH_ACTIONS = {
  SET: 'set',
  EXPLORE: 'explore',
  FLAG: 'flag'
};

export const cellGraphReducer = (state, { type, payload }) => {
  switch (type) {
    case CELL_GRAPH_ACTIONS.SET:
      return payload.board;
    case CELL_GRAPH_ACTIONS.EXPLORE:
      return state.map(cell => {
        return cell.id === payload.id ? { ...cell, explored: true } : cell;
      });
    case CELL_GRAPH_ACTIONS.FLAG:
      return state.map(cell => {
        return cell.id === payload.id ? { ...cell, flagged: !cell.flagged } : cell;
      });
    default:
      return console.warn(`Action type ${type} not supported on cellGraphReducer`);
  }
};
