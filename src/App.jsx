import './styles/app.css';
import React from 'react';
import { useSettings } from './hooks/useSettings.js';
import { useGameStatus } from './hooks/useGameStatus';

import { GameBoard } from './components/GameBoard.jsx';
import { SettingsPanel } from './components/SettingsPanel.jsx';

function App() {
  const [settings, dispatchSettings] = useSettings();
  const [gameStatus, setGame] = useGameStatus();

  return (
    <div className='container'>
      <SettingsPanel
        settings={settings}
        dispatchSettings={dispatchSettings}
        gameStatus={gameStatus}
      />
      <GameBoard settings={settings} setGame={setGame} gameStatus={gameStatus} />
    </div>
  );
}

export default App;
