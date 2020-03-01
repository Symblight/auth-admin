export { storeContext } from './Context';
export { useStores } from './useStores';
export { StoreProvider } from './Provider';

export interface TypedUseStoreHook<TState> {
  <TSelected>(selector: (state: TState) => TSelected): TSelected;
}
