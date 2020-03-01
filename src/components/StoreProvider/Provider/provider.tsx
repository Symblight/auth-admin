import React from 'react';
import { useLocalStore } from 'mobx-react';
import { enableLogging } from 'mobx-logger';

import { storeContext } from 'components/StoreProvider';

enableLogging({
  predicate: () => true,
  action: true,
  reaction: true,
  transaction: true,
  compute: true,
});

interface ProviderProps {
  context?: any;
  stores?: any;
  children: React.ReactNode;
}

const combineStores = (stores: any) => {
  return Object.keys(stores).reduce((acc, store) => {
    return { ...acc, [store]: useLocalStore(stores[store]) };
  }, {});
};

export const Provider: React.FC<ProviderProps> = ({ context: Context, stores, children }) => {
  const value = combineStores(stores);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

Provider.defaultProps = {
  context: storeContext,
};
