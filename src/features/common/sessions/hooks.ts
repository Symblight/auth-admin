import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { fetchSession, $session, $isLoading } from './model';

export function useSession() {
  return useStore($session);
}

export function useSessionFetch() {
  useEffect(() => {
    fetchSession();
  }, []);

  return useStore($isLoading);
}
