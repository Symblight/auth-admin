import { createStore, Effect } from 'effector';

type TFetching = 'initial' | 'loading' | 'done' | 'failed' | 'attempt';

type ErrorMessage = {
  [key: string]: any;
  message: string;
};

export function createFetching<Params = unknown, Done = unknown, Fail = ErrorMessage>(
  effect: Effect<Params, Done, Fail>,
) {
  const $fetching = createStore<TFetching>('initial');
  const $error = createStore<Fail | null>(null);
  const $result = createStore<Done | null>(null);

  $fetching
    .reset(effect)
    .on(effect, () => 'loading')
    .on(effect.done, () => 'done')
    .on(effect.fail, () => 'failed');

  $result
    .reset(effect)
    .on(effect.done, (_, { result }) => result)
    .on(effect.fail, () => null);

  $error.reset(effect).on(effect.fail, (_, { error }) => error);

  const isFail = $fetching.map(state => state === 'failed');
  const isDone = $fetching.map(state => state === 'done');
  const isFetching = $fetching.map(state => state === 'loading');
  const isAttempt = $fetching.map(state => state !== 'initial');

  return { isFail, isDone, isFetching, isAttempt, error: $error, result: $result };
}
