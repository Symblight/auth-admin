import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { getProfile, $session, $isLoading } from './model';

export function useSession() {
  return useStore($session);
}

export function useSessionFetch() {
  useEffect(() => {
    getProfile();
  }, []);

  return useStore($isLoading);
}
