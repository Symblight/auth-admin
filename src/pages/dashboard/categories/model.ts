import { createEffect, createEvent, createStore, guard, combine } from 'effector';
import { Request } from 'libs/api';
import { TCategory } from 'features/vehicles';
import { TPagination } from 'features/common';

interface ResponseCategories extends TPagination {
  data: TCategory[];
}

export const pageMounted = createEvent<string | number>();
const $categories = createStore<TCategory[]>([] as TCategory[]);
const $pagination = createStore<TPagination>({} as TPagination);

export const getCategories = createEffect<string | number, ResponseCategories, Error>();
export const createCategories = createEffect<TCategory, TCategory, Error>();
export const editCategories = createEffect<TCategory, TCategory, Error>();
export const removeCategories = createEffect<string, string, Error>();

getCategories.use(
  async (page: string | number) =>
    await Request({
      method: 'GET',
      url: `/categories/?page=${page}`,
    }),
);

createCategories.use(
  async (data: TCategory) =>
    await Request({
      method: 'POST',
      url: `/categories/`,
      data,
    }),
);

editCategories.use(
  async (data: TCategory) =>
    await Request<TCategory>({
      method: 'PUT',
      url: `/categories/${data.id}`,
      data,
    }),
);

removeCategories.use(
  async (id: string) =>
    await Request({
      method: 'DELETE',
      url: `/categories/${id}`,
    }),
);

$categories.on(getCategories.done, (_, { result }) => result.data);
$pagination.on(getCategories.done, (_, { result }) => {
  delete result.data;
  return result;
});

createCategories.done.watch(() => {
  const page = $pagination.getState().page;
  getCategories(page);
});

editCategories.done.watch(() => {
  const page = $pagination.getState().page;
  getCategories(page);
});

removeCategories.done.watch(() => {
  const page = $pagination.getState().page;
  getCategories(page);
});

export const $categoriesWithPagination = combine(
  $categories,
  $pagination,
  (categories, pagination) => ({ categories, pagination }),
);

guard({
  source: pageMounted,
  filter: page => page !== undefined,
  target: getCategories,
});
