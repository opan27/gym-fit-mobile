import { useAppSelector } from '../store';

export const useAuth = () => {
  const state = useAppSelector((s) => s.auth);
  return {
    ...state,
    isLoggedIn: !!state.token,
    profileLoaded: state.profileLoaded,
  };
};
