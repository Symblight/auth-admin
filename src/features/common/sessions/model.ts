import { createEffect, createStore } from 'effector';
import { Request } from 'libs/api';

export const $isLoading = createStore(true);
export const $error = createStore<Error | null>(null);

export const $session = createStore<User | null>(null);

type LoginData = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export const createSession = createEffect<LoginData | void, User>('createSession');
export const dropSession = createEffect<void, void>();

export const fetchLogin = createEffect<LoginData, User>('fetchLogin');

createSession.use(
  async () => await Request<User>({ url: '/login', method: 'GET' }),
);

dropSession.use(
  async () => await Request<void | Promise<void>>({ url: '/login', method: 'DELETE' }),
);

fetchLogin.use(
  async (data: LoginData) => await Request<User>({ url: '/login', method: 'POST', data }),
);

$isLoading.on(createSession, () => true).on(createSession.finally, () => false);

$error
  .reset(createSession)
  .reset(createSession.done)
  .on(createSession.fail, (_, { error }) => error);

$session
  .reset(createSession)
  .reset(createSession.fail)
  .on(createSession.fail, () => null)
  .on(fetchLogin.done, (_, { result }) => result)
  .on(createSession.done, (_, { result }) => result)
  .on(dropSession.done, () => null);
