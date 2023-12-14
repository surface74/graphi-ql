import { signInWithEmailAndPassword } from 'firebase/auth';
import { CircularProgress, Box } from '@mui/material';

import AuthForm from '../../Components/AuthForm/AuthForm';
import { useDataContext } from '../../DataContext/useDataContext';
import UIStrings from '../../assets/UIStrings.json';
import { useLogin } from '../../hooks/login';
import { flexColomnCenter } from './styles';
import { auth } from '../../Components/Authority/firebase';

const SignInPage = () => {
  const { language } = useDataContext();

  const [login, isLoading, isError] = useLogin(
    async (emailProp, passwordProp) => {
      await signInWithEmailAndPassword(auth, emailProp, passwordProp);
    }
  );

  const makeLogin = (email: string, password: string) => {
    login(email, password);
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
