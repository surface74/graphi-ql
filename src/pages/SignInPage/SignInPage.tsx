import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { setUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/store';
import AuthForm from '../../Components/AuthForm/AuthForm';
import { pageName } from '../../common-types/common-types';
import ErrorMessages from '../../assets/errorMessages.json';
import { useDataContext } from '../../DataContext/useDataContext';
import UIContent from '../../assets/UIStrings.json';
import { useState } from 'react';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const { language } = useDataContext();

  const makeLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((responce) => {
        const { email, uid } = responce.user;
        if (auth.currentUser) {
          auth.currentUser
            .getIdToken(true)
            .then((idToken) => {
              dispatch(
                setUser({
                  user: {
                    email: email ?? '',
                    id: uid,
                    token: idToken,
                  },
                })
              );
              navigate(`/${pageName.editor.En}`);
              setMessage('');
            })
            .catch(() => setMessage(''));
        } else {
          setMessage(ErrorMessages.ERROR_AUTH_CURRENT_USER[language]);
        }
      })
      .catch(() => setMessage(ErrorMessages.ERROR_AUTH_INVALID_USER[language]));
  };

  return (
    <>
      <AuthForm
        title={UIContent.SignIn[language]}
        handleClick={makeLogin}
        message={message}
      />
    </>
  );
};

export default SignInPage;
