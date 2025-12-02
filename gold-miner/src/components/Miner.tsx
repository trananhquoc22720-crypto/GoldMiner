import React from 'react';
import { MinerObject } from '../types/game';

interface MinerProps {
  miner: MinerObject;
}

const Miner: React.FC<MinerProps> = ({ miner }) => (
  <div className="miner">
    {/* Miner rendering stub */}
    Miner
  </div>
);

export default Miner;
