import './styles/app.css';
import React, { useEffect } from 'react';
import { useSettings } from './hooks/useSettings.js';
import { useGameStatus } from './hooks/useGameStatus';

import { GameBoard } from './components/GameBoard.jsx';
import { SettingsPanel } from './components/SettingsPanel.jsx';
import { useWindowSize } from './hooks/useWindowSize';

function App() {
  const { width, height } = useWindowSize();
  const [settings, dispatchSettings] = useSettings(width, height);
  const [gameStatus, setGame] = useGameStatus();

  useEffect(() => {
    dispatchSettings({ type: 'set-limits', payload: { width, height } });
  }, [width, height]);

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
