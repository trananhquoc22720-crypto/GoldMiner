import React from 'react';
import { GoldObject } from '../types/game';

interface GoldProps {
  gold: GoldObject;
}

const Gold: React.FC<GoldProps> = ({ gold }) => (
  <div className="gold">
    {/* Gold rendering stub */}
    Gold
  </div>
);

export default Gold;
