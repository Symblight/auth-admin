import { createEffect, createStore, createEvent, guard } from 'effector';
import { Request } from 'libs/api';
import { history } from 'libs/history';

import { TCar } from 'features/vehicles';

export const pageMounted = createEvent<string>();
export const pageUnMounted = createEvent();
export const $vehicle = createStore<TCar>({} as TCar);
export const $error = createStore<Error>(new Error());
export const getVehicle = createEffect<string, TCar, Error>();
export const fetchDelete = createEffect<number | string, string, Error>();

$vehicle.on(getVehicle.done, (_, { result }) => result).reset(pageUnMounted);
$error.on(getVehicle.fail, (_, { error }) => error).reset(pageUnMounted);

getVehicle.use(
  async (id: string) => await Request<TCar>({ url: `/vehicle/${id}`, method: 'GET' }),
);

fetchDelete.use(
  async (id: number | string) => await Request({ url: `/vehicle/${id}`, method: 'DELETE' }),
);

guard({
  source: pageMounted,
  filter: id => id !== null,
  target: getVehicle,
});

fetchDelete.done.watch(() => history.push('/d'));
