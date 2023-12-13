import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { CircularProgress, Box } from '@mui/material';

import { setUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/store';
import AuthForm from '../../Components/AuthForm/AuthForm';
import { pageName } from '../../common-types/common-types';
import { useDataContext } from '../../DataContext/useDataContext';
import UIStrings from '../../assets/UIStrings.json';
import { useLogin } from '../../hooks/login';
import { flexColomnCenter } from './styles';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { language } = useDataContext();
  const auth = getAuth();

  const [login, isLoading, isError] = useLogin(
    async (authProp, emailProp, passwordProp) => {
      const userCredential = await signInWithEmailAndPassword(
        authProp,
        emailProp,
        passwordProp
      );
      const { email, uid } = userCredential.user;
      const idToken = await userCredential.user.getIdToken();

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
      console.log('email, uid, idToken: ', email, uid, idToken);
    }
  );

  const makeLogin = (email: string, password: string) => {
    login(auth, email, password);
  };

  return (
    <Box sx={flexColomnCenter}>
      <AuthForm
        title={UIStrings.SignInPageTitle[language]}
        handleClick={makeLogin}
        message={isError}
        type="login"
      />
      {isLoading && <CircularProgress color="inherit" />}
    </Box>
  );
};

export default SignInPage;
