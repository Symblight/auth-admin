import React from 'react';
import { storeContext } from 'components/StoreProvider';

export function useStores<T>(): T {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
}
