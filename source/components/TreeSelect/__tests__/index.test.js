import TreeSelect from '../index.tsx';
import focusTest from '../../../../tools/tests/focusTest';

describe('TreeSelect', () => {
  focusTest(TreeSelect, () => document.querySelector('.fishd-treeselect'));
});
