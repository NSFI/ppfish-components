import * as React from 'react';
import { MenuContext } from '../context/MenuContext';

export default function useDirectionStyle(level: number): React.CSSProperties {
  const { mode, inlineIndent } = React.useContext(MenuContext);

  if (mode !== 'inline') {
    return null;
  }

  const len = level;
  return { paddingLeft: len * inlineIndent };
}
