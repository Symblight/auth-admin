import { createEffect, createStore, createEvent, combine, guard } from 'effector';
import { Request } from 'libs/api';

import { TCar } from 'features/vehicles';

export const pageMounted = createEvent<string>();
export const pageUnMounted = createEvent();
export const $vehicle = createStore<TCar>({} as TCar);
export const $error = createStore<Error>(new Error());
export const getVehicle = createEffect<string, TCar, Error>();

$vehicle.on(getVehicle.done, (_, { result }) => result).reset(pageUnMounted);
$error.on(getVehicle.fail, (_, { error }) => error).reset(pageUnMounted);

getVehicle.use(
  async (id: string) => await Request<TCar>({ url: `/vehicle/${id}`, method: 'GET' }),
);

guard({
  source: pageMounted,
  filter: id => id !== null,
  target: getVehicle,
});
