import { createStore, createEffect, combine } from 'effector';

import { Request } from 'libs/api';
import { createFetching } from 'features/common';

type TLogin = {
  email: string;
  password: string;
};

export const fetchLogin = createEffect<TLogin, void, any>();

export const $isLoading = createStore(false);
export const $isError = createStore<Error>(new Error(''));

$isLoading
  .reset(fetchLogin)
  .on(fetchLogin, () => true)
  .on(fetchLogin.finally, () => false);

$isError.reset(fetchLogin).on(fetchLogin.fail, (_, { error }) => error);

export const $status = combine($isLoading, $isError, (loading, error) => ({ loading, error }));

fetchLogin.use(async data => {
  await Request<any>({ method: 'POST', url: '/login', data });
});
