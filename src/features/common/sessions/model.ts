import { createEffect, createStore, guard, createEvent, Effect } from 'effector';
import { Request } from 'libs/api';

export const $isLoading = createStore(false);
export const $session = createStore(null);
export const $error = createStore('');
export const fetchSession = createEvent();

export const getProfile = createEffect<Effect<void, void, void>>('get profile');
export const logout = createEffect('logout');

getProfile.use(async data => await Request({ url: '/login', method: 'GET', data }));
logout.use(async () => await Request({ url: '/login', method: 'DELETE' }));

$isLoading
  .on(getProfile, () => true)
  .on(getProfile.done, () => false)
  .on(getProfile.fail, () => false);

$error.on(getProfile.fail, (_, { result }) => result);

$session.on(getProfile.done, (_, { result }) => result).on(getProfile.fail, () => null);

guard({
  source: fetchSession,
  filter: getProfile.pending.map(data => !data),
  target: getProfile,
});

getProfile.fail.watch(() => console.error('fail'));
