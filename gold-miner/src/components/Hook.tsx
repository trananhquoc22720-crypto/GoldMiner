import React from 'react';
import { HookObject } from '../types/game';

interface HookProps {
  hook: HookObject;
}

const Hook: React.FC<HookProps> = ({ hook }) => (
  <div className="hook">
    {/* Hook rendering stub */}
    Hook
  </div>
);

export default Hook;
