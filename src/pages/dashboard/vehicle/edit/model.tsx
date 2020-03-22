import { createStore, createEffect, createEvent, combine, guard } from 'effector';

import { createFetching } from 'features/common';
import { TCar, TCategory } from 'features/vehicles';
import { Request } from 'libs/api';
import { history } from 'libs/history';

export const pageMounted = createEvent<string>();
export const pageUnmounted = createEvent();
const getVehicleById = createEvent<string>();

export const $vehicle = createStore<TCar>({} as TCar);
export const $categories = createStore<TCategory[]>([] as TCategory[]);

const getVehicel = createEffect<string, TCar, Error>();
export const getCategories = createEffect<void, TCategory[], Error>();
export const submitFormVehicle = createEffect<TCar, TCar, Error>();

getVehicel.use(
  async (id: string) =>
    await Request({
      method: 'GET',
      url: `/vehicle/${id}`,
    }),
);

getCategories.use(
  async () =>
    await Request({
      method: 'GET',
      url: `/categories`,
    }),
);

submitFormVehicle.use(
  async (data: TCar) =>
    await Request({
      method: 'PUT',
      url: `/vehicle/${data.id}`,
      data,
    }),
);

const fetchingVehicle = createFetching<string, TCar, Error, void>(getVehicel, {
  reset: pageUnmounted,
});
const fetchingCategories = createFetching<void, TCategory[], Error, void>(getCategories, {
  reset: pageUnmounted,
});
const fetchingSubmitVehicle = createFetching<TCar, TCar, Error, void>(submitFormVehicle, {
  reset: pageUnmounted,
});

$vehicle.on(getVehicel.done, (_, { result }) => result);
$categories.on(getCategories.done, (state, { result }) => {
  if (state.length === 0) {
    return result;
  }
});

guard({
  source: getVehicleById,
  filter: id => id !== null,
  target: getVehicel,
});

pageMounted.watch((id: string) => {
  getVehicleById(id);
  getCategories();
});

submitFormVehicle.done.watch(() => history.push('/d'));

export const $isLoading = combine(fetchingSubmitVehicle.isFetching, submitLoading => ({
  submitLoading,
}));

export const $error = combine(
  fetchingVehicle.error,
  fetchingCategories.error,
  fetchingSubmitVehicle.error,
  (errorVehicle, errorCategories, submitError) => {
    if (errorVehicle) return errorVehicle;
    if (errorCategories) return errorCategories;
    if (submitError) return submitError;
    return null;
  },
);
$vehicle.reset(pageUnmounted);
$categories.reset(pageUnmounted);
