import { createStore, combine } from 'effector';

import { history } from 'libs/history';
import { fetchLogin } from 'features/common';

export const $isLoading = createStore(false);
export const $isError = createStore({
  message: '',
});

$isLoading
  .reset(fetchLogin)
  .on(fetchLogin, () => true)
  .on(fetchLogin.finally, () => false);

$isError.reset(fetchLogin).on(fetchLogin.fail, (_, { error }) => error);

export const $status = combine($isLoading, $isError, (loading, error) => ({ loading, error }));

fetchLogin.done.watch(() => history.push('/d'));
