import Switch from '../index.tsx';
import focusTest from '../../../../tools/tests/focusTest';

describe('Switch', () => {
  focusTest(Switch, () => document.querySelector('.fishd-switch'));
});
