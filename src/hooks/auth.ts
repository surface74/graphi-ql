import { useAppSelector } from './store';

export function useAuth() {
  const { email, token, id } = useAppSelector((state) => state.user.user);

  return {
    isLogin: !!token,
    email,
    token,
    id,
  };
}
