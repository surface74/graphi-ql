import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { setUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/store';
import AuthForm from '../../Components/AuthForm/AuthForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const makeLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            user: {
              email: user.email ?? '',
              id: user.uid,
              token: user.refreshToken,
            },
          })
        );
        navigate('/');
      })
      .catch(() => alert('Invalid user!'));
  };

  return <AuthForm title="Sign in" handleClick={makeLogin} />;
};

export default LoginPage;
