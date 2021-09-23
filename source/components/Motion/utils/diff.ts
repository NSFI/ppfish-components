export const STATUS_ADD = 'add' as const;
export const STATUS_KEEP = 'keep' as const;
export const STATUS_REMOVE = 'remove' as const;
export const STATUS_REMOVED = 'removed' as const;
export type DiffStatus =
  | typeof STATUS_ADD
  | typeof STATUS_KEEP
  | typeof STATUS_REMOVE
  | typeof STATUS_REMOVED;

export interface KeyObject {
  key: React.Key;
  status?: DiffStatus;
}

export function wrapKeyToObject(key: React.Key) {
  let keyObj: KeyObject;
  if (key && typeof key === 'object' && 'key' in key) {
    keyObj = key;
  } else {
    keyObj = { key };
  }
  return {
    ...keyObj,
    key: String(keyObj.key),
  };
}

export function parseKeys(keys = []) {
  return keys.map(wrapKeyToObject);
}

export function diffKeys(
  prevKeys: KeyObject[] = [],
  currentKeys: KeyObject[] = [],
) {
  let list: KeyObject[] = [];
  let currentIndex = 0;
  const currentLen = currentKeys.length;

  const prevKeyObjects = parseKeys(prevKeys);
  const currentKeyObjects = parseKeys(currentKeys);

  // Check prev keys to insert or keep
  prevKeyObjects.forEach(keyObj => {
    let hit = false;

    for (let i = currentIndex; i < currentLen; i += 1) {
      const currentKeyObj = currentKeyObjects[i];
      if (currentKeyObj.key === keyObj.key) {
        // New added keys should add before current key
        if (currentIndex < i) {
          list = list.concat(
            currentKeyObjects
              .slice(currentIndex, i)
              .map(obj => ({ ...obj, status: STATUS_ADD })),
          );
          currentIndex = i;
        }
        list.push({
          ...currentKeyObj,
          status: STATUS_KEEP,
        });
        currentIndex += 1;

        hit = true;
        break;
      }
    }

    // If not hit, it means key is removed
    if (!hit) {
      list.push({
        ...keyObj,
        status: STATUS_REMOVE,
      });
    }
  });

  // Add rest to the list
  if (currentIndex < currentLen) {
    list = list.concat(
      currentKeyObjects
        .slice(currentIndex)
        .map(obj => ({ ...obj, status: STATUS_ADD })),
    );
  }

  /**
   * Merge same key when it remove and add again:
   *    [1 - add, 2 - keep, 1 - remove] -> [1 - keep, 2 - keep]
   */
  const keys = {};
  list.forEach(({ key }) => {
    keys[key] = (keys[key] || 0) + 1;
  });
  const duplicatedKeys = Object.keys(keys).filter(key => keys[key] > 1);
  duplicatedKeys.forEach(matchKey => {
    // Remove `STATUS_REMOVE` node.
    list = list.filter(
      ({ key, status }) => key !== matchKey || status !== STATUS_REMOVE,
    );

    // Update `STATUS_ADD` to `STATUS_KEEP`
    list.forEach(node => {
      if (node.key === matchKey) {
        // eslint-disable-next-line no-param-reassign
        node.status = STATUS_KEEP;
      }
    });
  });

  return list;
}