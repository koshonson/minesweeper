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

// refactor this shit!!
const walkSafeArea = ({ cell, grid, avoid = [] }) => {
  const walked = [cell.id];
  const toBeExplored = Object.values(cell.neighbors).reduce((cells, neighbor) => {
    if (!neighbor) return cells;
    if (avoid.includes(neighbor.id)) return cells;
    if (cell.neighborBombs) return cells;
    cells.push(neighbor.id);
    return cells;
  }, []);

  while (toBeExplored.length) {
    const _id = toBeExplored.pop();
    const current = grid.find(({ id }) => id === _id);
    const { isBomb, neighborBombs, explored, id } = current;

    if (isBomb || explored) continue;
    if (neighborBombs) walked.push(id);
    if (!neighborBombs)
      walked.push(
        ...walkSafeArea({
          cell: current,
          grid,
          avoid: [...avoid, ...walked, ...toBeExplored]
        })
      );
  }
  return walked;
};

export const exploreArea = grid => cell => {
  return walkSafeArea({ cell, grid });
};
