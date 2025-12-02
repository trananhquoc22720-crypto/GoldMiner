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
  targetScore: 0,
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
      targetScore: level.targetScore,
      level: gameState.level,
    });
    setScreen('game');
  };

  const [lastResult, setLastResult] = useState<{ success: boolean } | null>(null);
  const handleGameOver = (success?: boolean) => {
    setLastResult(success == null ? null : { success });
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
              if (action === 'pause-toggle') {
                setGameState((prev) => ({ ...prev, isRunning: !prev.isRunning }));
              } else if (action === 'level-success') {
                // advance to next level if exists; else show success screen
                const nextLevelIndex = gameState.level; // current is 1-based
                if (LEVELS[nextLevelIndex]) {
                  setGameState((prev) => ({ ...prev, level: prev.level + 1 }));
                  handleStart();
                } else {
                  handleGameOver(true);
                }
              } else if (action === 'level-failure') {
                handleGameOver(false);
              } else if (action === 'gameover') {
                handleGameOver();
              }
            }}
            onStateChange={(partial) =>
              setGameState((prev) => ({ ...prev, ...partial }))
            }
          />
        </>
      )}
      {screen === 'gameover' && (
        <GameOverScreen
          score={gameState.score}
          targetScore={gameState.targetScore}
          success={lastResult?.success}
          onRestart={handleRestart}
          onNext={() => {
            setGameState((prev) => ({ ...prev, level: prev.level + 1 }));
            handleStart();
          }}
        />
      )}
    </div>
  );
}

export default App;
