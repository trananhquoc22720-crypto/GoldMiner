import React from 'react';
import { GameState } from '../types/game';

interface HUDProps {
  state: GameState;
}

const HUD: React.FC<HUDProps> = ({ state }) => (
  <div className="hud" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 8 }}>
    <div>Score: {state.score}</div>
    <div>Target: {state.targetScore}</div>
    <div>Time Left: {state.timeLeft.toFixed(1)}s</div>
    <div>Level: {state.level}</div>
    {!state.isRunning && <div>(Paused)</div>}
  </div>
);

export default HUD;
