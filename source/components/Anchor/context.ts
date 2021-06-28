import * as React from 'react';
import { FishdAnchor } from './Anchor';

const AnchorContext = React.createContext<FishdAnchor>(null as any);

export default AnchorContext;
