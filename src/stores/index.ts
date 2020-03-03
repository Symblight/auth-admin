import { AuthStoreProps } from './auth';
import { CarsStoreProps } from './cars';

export { authStore } from './auth';
export * from './cars';

export interface TStore {
  auth: AuthStoreProps;
  cars: CarsStoreProps;
}
