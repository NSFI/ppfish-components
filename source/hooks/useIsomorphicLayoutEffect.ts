import * as React from 'react';
import canUseDom from 'rc-util/lib/Dom/canUseDom';

const useIsomorphicLayoutEffect = canUseDom() ? React.useLayoutEffect : React.useEffect;
export default useIsomorphicLayoutEffect;
