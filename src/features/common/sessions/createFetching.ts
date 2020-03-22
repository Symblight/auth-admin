import { createEvent, createStore, Effect } from 'effector';

type TFetching = 'initial' | 'loading' | 'done' | 'failed' | 'attempt';

export function createFetching<Params = unknown, Done = unknown, Fail = unknown>(
  effect: Effect<Params, Done, Error>,
) {
  const reset = createEvent();
  const $fetching = createStore<TFetching>('initial');
  const $error = createStore<null>(null);

  $fetching
    .on(effect, () => 'loading')
    .on(effect.done, () => 'done')
    .on(effect.fail, () => 'failed');

  $error.on(effect.fail, (_, { error }) => error);

  const isFail = $fetching.map(state => state === 'failed');
  const isDone = $fetching.map(state => state === 'done');
  const isFetching = $fetching.map(state => state === 'loading');
  const isAttempt = $fetching.map(state => state !== 'initial');

  return { isFail, isDone, isFetching, isAttempt, error: $error };
}
