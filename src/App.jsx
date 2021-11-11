import './styles/app.css';
import React from 'react';
import { useSettings } from './hooks/useSettings.js';

import { GameBoard } from './components/GameBoard.jsx';
import { ControlPanel } from './components/ControlPanel.jsx';

function App() {
  const [settings, dispatch] = useSettings();

  return (
    <div className='container'>
      <ControlPanel settings={settings} dispatchSettings={dispatch} />
      <GameBoard settings={settings} />
    </div>
  );
}

export default App;
