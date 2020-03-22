import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { createSession, $session, $isLoading } from './model';

export function useSession() {
  return useStore($session);
}

export function useSessionFetch() {
  useEffect(() => {
    createSession();
  }, []);
}

export function useSessionWaiting() {
  return useStore($isLoading);
}
