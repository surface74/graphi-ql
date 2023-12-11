import { useAppSelector } from './store';

export function useAuth() {
  const { email, token, id } = useAppSelector((state) => state.user.user);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
}
