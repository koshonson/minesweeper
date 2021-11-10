import React, { useState } from 'react'
import './styles/app.css'

function App() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);

  const renderCells = ({width, height}) => {
    const cells = [];
    for (let cell = 0; cell < width * height; cell++) {
      cells.push(<div className="cell" key={cell}></div>)
    }
    return cells;
  }

  return (
    <div className="app">
      <div className="control-panel">
        <label for="board-width">Board width:</label>
        <input type="number" name="board-width" value={width} onChange={e => setWidth(e.target.value)} />
        <label for="board-height">Board height:</label>
        <input type="number" name="board-height" value={height} onChange={e => setHeight(e.target.value)} />
      </div>
      <div className="game-board" style={{gridTemplateColumns: `repeat(${width}, auto)`}}>
        {renderCells({width, height})}
      </div>
    </div>
  )
}

export default App
