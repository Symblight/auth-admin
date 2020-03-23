import { createEffect, guard, combine, createEvent, createStore } from 'effector';
import { Request } from 'libs/api';
import { createFetching } from 'features/common';

type TCar = {
  id: string | null;
  title: string;
  description?: string;
  price?: string;
  passenger?: string;
  color?: string;
  year?: string;
  category?: string;
  engine?: string;
  fuel?: string;
  bags?: string;
  image_url?: string;
  images_url?: string[];
};

type TPagination = {
  total: string;
  perPage: number;
  page: number;
  lastPage: number;
};

interface TResponseVehicles extends TPagination {
  data: TCar[];
}

const $vehicles = createStore<TResponseVehicles>({} as TResponseVehicles);

export const submitDelete = createEvent<number | string>();
export const getVehiclesByPage = createEvent<string>();

export const pageMounted = createEvent<string>();

const fetchDelete = createEffect<number | string, string, any>();
const deleteEffect = createFetching<number | string, string, any>(fetchDelete);

const getVehicles = createEffect<string, TResponseVehicles, any>();
const fetchingVehicles = createFetching<string, TResponseVehicles, any>(getVehicles);

fetchDelete.use(
  async (id: number | string) => await Request({ url: `/vehicle/${id}`, method: 'DELETE' }),
);

getVehicles.use(
  async (page: string) => await Request({ url: `/vehicles?page=${page || 1}`, method: 'GET' }),
);

$vehicles
  .on(getVehicles.done, (_, { result }) => result)
  .on(fetchDelete.done, (state, { params }) => {
    const updated = state.data.filter(item => item.id !== params);
    return {
      ...state,
      data: updated,
    };
  });

pageMounted.watch((id: string) => {
  getVehiclesByPage(id);
});

export const $status = combine(deleteEffect.isFetching, deleteEffect.error, (loading, error) => ({
  loading,
  error,
}));

const $statusVehicles = combine(
  fetchingVehicles.isFetching,
  fetchingVehicles.error,
  (loading, error) => ({
    loading,
    error,
  }),
);

export const $result = combine($vehicles, $statusVehicles, (vehicles, status) => ({
  vehicles,
  status,
}));

guard({
  source: submitDelete,
  filter: is => is !== null,
  target: fetchDelete,
});

guard({
  source: getVehiclesByPage,
  filter: is => is !== null,
  target: getVehicles,
});
