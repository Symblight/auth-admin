import { createEffect, createStore, guard, createEvent } from 'effector';
import { Request } from 'libs/api';

export const $isLoading = createStore(true);
export const $error = createStore<Error | null>(null);

/**
 * @summary user data (email, role, username)
 */
export const $session = createStore<User | null>(null);

/**
 * @summary This is a user authentication request.
 */
export const fetchSession = createEvent();

type LoginData = {
  email: string;
  password: string;
};

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

/**
 * @param LoginData - input data
 * @param User - output data
 */

export const getProfile = createEffect<LoginData | void, User>('getProfile'); // any return from Request type
export const logout = createEffect('logout');

getProfile.use(
  async () => await Request<User>({ url: '/login', method: 'GET' }),
);
logout.use(async () => await Request({ url: '/login', method: 'DELETE' }));

$isLoading.on(getProfile, () => true).on(getProfile.finally, () => false);

$error
  .reset(getProfile)
  .reset(getProfile.done)
  .on(getProfile.fail, (_, { error }) => error);

$session.on(getProfile.done, (_, { result }) => result).on(getProfile.fail, () => null);
