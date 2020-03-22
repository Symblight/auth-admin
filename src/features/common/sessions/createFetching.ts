import { createStore, createEvent, Effect, Event } from 'effector';

type TFetching = 'initial' | 'loading' | 'done' | 'failed' | 'attempt';

type ErrorMessage = {
  [key: string]: any;
  message: string;
};

type Params<R, E, Rs> = {
  result?: R;
  error?: E;
  reset?: Event<Rs>;
};

export function createFetching<Pr = unknown, Done = unknown, Fail = ErrorMessage, Reset = string>(
  effect: Effect<Pr, Done, Fail>,
  params?: Params<Done, Fail, Reset>,
) {
  const $fetching = createStore<TFetching>('initial');
  const $error = createStore<Fail | null>(null);
  const $result = createStore<Done | null>(null);
  const customReset = (params && params.reset) || createEvent<Reset>();

  $fetching
    .on(effect, () => 'loading')
    .on(effect.done, () => 'done')
    .on(effect.fail, () => 'failed')
    .reset(customReset);

  $result
    .reset(effect)
    .reset(effect.fail)
    .reset(customReset)
    .on(effect.done, (_, { result }) => result);

  $error
    .reset(effect)
    .reset(effect.done)
    .reset(customReset)
    .on(effect.fail, (_, { error }) => error);

  const isFail = $fetching.map(state => state === 'failed');
  const isDone = $fetching.map(state => state === 'done');
  const isFetching = $fetching.map(state => state === 'loading');

  return { isFail, isDone, isFetching, error: $error, result: $result };
}
