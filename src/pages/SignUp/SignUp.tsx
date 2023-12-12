import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

import { setUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/store';
import { useDataContext } from '../../DataContext/useDataContext';
import AuthForm from '../../Components/AuthForm/AuthForm';
import UIStrings from '../../assets/UIStrings.json';
import ErrorMessages from '../../assets/errorMessages.json';
import { pageName } from '../../common-types/common-types';

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const { language } = useDataContext();

  const makeSignUp = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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
    <AuthForm
      title={UIStrings.SignUpPageTitle[language]}
      handleClick={makeSignUp}
      message={message}
    />
  );
};

export default SignUpPage;
