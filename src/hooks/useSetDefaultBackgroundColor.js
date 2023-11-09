import { useState } from 'react';
const stc = require('string-to-color');
export const useSetDefaultBackgroundColor = () => {
  const [color, setColor] = useState('transparent');
  const setBackgroundColor = (text) => {
    const color = stc(text?.toUpperCase());
    setColor(color);
  };
  return { color, setBackgroundColor };
};
