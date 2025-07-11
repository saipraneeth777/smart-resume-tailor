import * as React from 'react';

export interface SwitchProps {
  checked: boolean;
  onCheckedChange?: (value: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange?.(e.target.checked)}
  />
);
