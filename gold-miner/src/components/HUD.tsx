import React from 'react';
import { GameState } from '../types/game';

interface HUDProps {
  state: GameState;
}

const HUD: React.FC<HUDProps> = ({ state }) => (
  <div className="hud">
    <div>Score: {state.score}</div>
    <div>Time Left: {state.timeLeft}</div>
    <div>Level: {state.level}</div>
  </div>
);

export default HUD;
