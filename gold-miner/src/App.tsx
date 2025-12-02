import React, { useState } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import HUD from './components/HUD';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import { GameState, LevelItemSeed } from './types/game';
import { LEVELS } from './gameConfig';

const initialGameState: GameState = {
  score: 0,
  timeLeft: 60,
  golds: [],
  miner: { x: 100, y: 300, animationFrame: 0 },
  hook: { angle: 0, length: 0, state: 'idle' },
  isRunning: false,
  level: 1,
};

function App() {
  const [screen, setScreen] = useState<'start' | 'game' | 'gameover'>('start');
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const toGoldObjects = (seeds: LevelItemSeed[]) =>
    seeds.map((s, idx) => ({
      id: `${gameState.level}-${idx}`,
      type: s.type,
      x: s.x,
      y: s.y,
      radius: s.radius,
      value: s.value,
      weight: s.weight,
      collected: false,
    }));

  const handleStart = () => {
    const level = LEVELS[gameState.level - 1] ?? LEVELS[0];
    setGameState({
      ...initialGameState,
      timeLeft: level.timeLimit,
      golds: toGoldObjects(level.items),
      isRunning: true,
    });
    setScreen('game');
  };

  const handleGameOver = () => {
    setScreen('gameover');
  };

  const handleRestart = () => {
    setGameState(initialGameState);
    setScreen('start');
  };

  return (
    <div className="App">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'game' && (
        <>
          <HUD state={gameState} />
          <GameCanvas
            state={gameState}
            onAction={(action) => {
              if (action === 'gameover') handleGameOver();
            }}
            onStateChange={(partial) =>
              setGameState((prev) => ({ ...prev, ...partial }))
            }
          />
        </>
      )}
      {screen === 'gameover' && (
        <GameOverScreen score={gameState.score} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
