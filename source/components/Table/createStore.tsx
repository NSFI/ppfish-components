export interface Store {
  setState: (partial: Record<string, any>) => void;
  getState: () => any;
  subscribe: (listener: () => void) => () => void;
}

export default function createStore(initialState: Record<string, any>): Store {
  let state = initialState;
  const listeners: any[] = [];

  function setState(partial: Record<string, any>) {
    state = {
      ...state,
      ...partial,
    };
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function getState() {
    return state;
  }

  function subscribe(listener: () => any) {
    listeners.push(listener);

    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  return {
    setState,
    getState,
    subscribe,
  };
}
