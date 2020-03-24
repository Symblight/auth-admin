import { createEffect, createStore, createEvent, combine } from 'effector';
import { Request } from 'libs/api';
import { history } from 'libs/history';
import { createFetching } from 'features/common';

import { TCar, TCategory } from 'features/vehicles';

export const pageUnMounted = createEvent();
export const $categories = createStore<TCategory[]>([] as TCategory[]);
export const submitForm = createEffect<TCar, TCar, Error>();
export const getCategories = createEffect<void, TCategory[], Error>();

export const fetchingSubmit = createFetching<TCar, TCar, Error>(submitForm);
export const fetchingCategories = createFetching<void, TCategory[], Error>(getCategories);

$categories
  .on(getCategories.done, (state, { result }) => {
    if (state.length === 0) {
      return result;
    }
  })
  .reset(pageUnMounted);

submitForm.use(
  async (data: TCar) =>
    await Request({
      method: 'POST',
      url: '/vehicle',
      data,
    }),
);

getCategories.use(
  async () =>
    await Request({
      method: 'GET',
      url: `/categories`,
    }),
);

export const $isError = combine(
  fetchingSubmit.error,
  fetchingCategories.error,
  (errorSubmit, errorCategories) => {
    if (errorSubmit) return errorSubmit;
    if (errorCategories) return errorCategories;
    return null;
  },
);

export const $isLoading = combine(
  fetchingSubmit.isFetching,
  fetchingCategories.isFetching,
  (loadingSubmit, loadingCategories) => ({ loadingSubmit, loadingCategories }),
);

submitForm.done.watch(() => history.push('/d'));
