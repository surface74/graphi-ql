import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { setUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/store';
import AuthForm from '../../Components/AuthForm/AuthForm';
import { pageName } from '../../common-types/common-types';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const makeLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        if (auth.currentUser) {
          auth.currentUser
            .getIdToken(true)
            .then((idToken) => {
              dispatch(
                setUser({
                  user: {
                    email: user.email ?? '',
                    id: user.uid,
                    token: idToken,
                  },
                })
              );
              navigate(`/${pageName.editor.En}`);
            })
            .catch(() => console.error('Error while get token!'));
        } else {
          console.error('Error while get currentUser!');
        }
      })
      .catch(() => console.error('Invalid user!'));
  };

  return <AuthForm title="Sign in" handleClick={makeLogin} />;
};

export default SignInPage;
