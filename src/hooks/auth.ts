import { useAppSelector } from './store';

export function useAuth() {
  const { email, id } = useAppSelector((state) => state.user.user);

  return {
    isLogin: !!email,
    email,
    id,
  };
}
