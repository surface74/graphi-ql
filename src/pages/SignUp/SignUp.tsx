import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { setUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/store';
import AuthForm from '../../Components/AuthForm/AuthForm';

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const makeLogin = (email: string, password: string) => {
    console.log('password: ', password);
    console.log('email: ', email);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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

  return <AuthForm title="Sign up" handleClick={makeLogin} />;
};

export default SignUpPage;
